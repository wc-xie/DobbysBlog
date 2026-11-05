import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import matter from 'gray-matter';
import { blog } from '../blog.config.mjs';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4321';
const posts = [];
async function readPosts(directory) {
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, item.name);
    if (item.isDirectory()) await readPosts(filename);
    else if (filename.endsWith('.md')) { const post = matter(await fs.readFile(filename, 'utf8')); posts.push(post); }
  }
}
await readPosts('src/content/posts');
const postPath = post => `${post.data.lang === 'en' ? '/en' : ''}/posts/${encodeURIComponent(post.data.slug)}/`;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, colorScheme: 'light', reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await fs.mkdir('test-results', { recursive: true });
try {
  for (const lang of ['zh', 'en']) {
    const english = lang === 'en';
    const prefix = english ? '/en' : '';
    const localized = posts.filter(post => (post.data.lang || 'zh') === lang);
    assert.ok(localized.length > 0, `Expected ${lang} articles`);
    assert.equal((await page.goto(`${base}${prefix}/`)).status(), 200);
    assert.match(await page.title(), /Dobby's Home/);
    assert.equal(await page.locator('html').getAttribute('lang'), english ? 'en' : 'zh-CN');
    assert.equal(await page.locator('.post-card').count(), localized.length);
    assert.equal(await page.locator('#language-switch').getAttribute('href'), english ? '/' : '/en/');
    for (const width of [390, 850, 1440]) {
      await page.setViewportSize({ width, height: width < 760 ? 844 : 1100 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang} homepage overflow at ${width}`);
      if (width !== 850) await page.screenshot({ path: `test-results/home-${lang}-${width}.png`, fullPage: true });
    }
    const dark = english ? 'Switch to dark mode' : '切换深色模式';
    const light = english ? 'Switch to light mode' : '切换浅色模式';
    await page.getByRole('button', { name: dark }).click();
    await page.locator('#language-switch').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    await page.locator('#language-switch').click();
    await page.getByRole('button', { name: light }).click();
    await page.getByRole('button', { name: english ? 'Search articles' : '搜索文章' }).click();
    await page.locator('#search input').waitFor();
    await page.locator('#search input').fill(english ? 'observability' : '可观测性');
    await page.locator('.pagefind-ui__result-link').first().waitFor();
    const results = await page.locator('.pagefind-ui__result-link').evaluateAll(elements => elements.map(element => element.getAttribute('href')));
    assert.ok(results.every(href => new URL(href, base).pathname.startsWith('/en/') === english), `${lang} search leaked the other language`);
    await page.keyboard.press('Escape');
    for (const post of localized) {
      const route = postPath(post);
      assert.equal((await page.goto(`${base}${route}`)).status(), 200, route);
      assert.equal(await page.locator('.article-header h1').innerText(), post.data.title);
      const counterpart = posts.find(other => other.data.lang !== post.data.lang && other.data.translationKey === post.data.translationKey);
      if (counterpart) assert.equal(await page.locator('#language-switch').getAttribute('href'), postPath(counterpart));
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), new URL(route, blog.site).href);
      if (english) assert.doesNotMatch(await page.locator('.prose').innerText(), /[\u3400-\u9fff]/, `${post.data.slug} has untranslated text`);
      if (post.content.includes('```mermaid')) {
        await page.waitForFunction(() => document.querySelectorAll('.diagram-canvas svg').length > 0);
        assert.equal(await page.locator('.diagram-error').count(), 0);
        const svg = page.locator('.diagram-canvas svg').first();
        const width = await svg.evaluate(element => element.getBoundingClientRect().width);
        await page.getByRole('button', { name: english ? 'Zoom diagram in' : '放大流程图' }).first().click();
        assert.ok(await svg.evaluate(element => element.getBoundingClientRect().width) > width);
        const download = page.waitForEvent('download');
        await page.getByRole('button', { name: 'SVG ↓' }).first().click();
        assert.match((await download).suggestedFilename(), /\.svg$/);
        await page.setViewportSize({ width: 390, height: 844 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang} article overflow`);
        await page.screenshot({ path: `test-results/article-${lang}-mobile.png`, fullPage: true });
        await page.setViewportSize({ width: 1440, height: 1100 });
      }
      if (post.data.translationKey === 'translates-of-wolfram-s-great-work') {
        const text = await page.locator('.prose').innerText();
        assert.equal(await page.locator('.prose img').count(), 75);
        assert.equal((text.match(english ? /Image unavailable/g : /配图暂缺/g) || []).length, 70);
        if (english) { assert.ok(text.split(/\s+/).length > 9000); assert.match(text, /Personal notes/); }
        assert.equal(await page.locator('.katex-error').count(), 0);
        await page.locator('.prose img').first().click();
        await page.locator('#full-image').evaluate(async image => image.decode());
        assert.ok(await page.locator('#full-image').evaluate(image => image.naturalWidth > 0));
        await page.keyboard.press('Escape');
      }
    }
    for (const route of ['/archive/', '/tags/', '/about/', '/rss.xml']) assert.equal((await page.goto(`${base}${prefix}${route}`)).status(), 200);
    const feed = await (await page.request.get(`${base}${prefix}/rss.xml`)).text();
    assert.match(feed, new RegExp(`<language>${english ? 'en' : 'zh-CN'}</language>`));
    assert.equal((feed.match(/<item>/g) || []).length, localized.length);
  }
  assert.equal((await page.goto(`${base}/not-a-real-post/`)).status(), 404);
  assert.deepEqual(errors, []);
  console.log(`Browser checks passed: ${posts.length} articles, both languages, linked translations, separate search/RSS, responsive layout, themes, Mermaid, images and 70 missing-image markers in each long-form version.`);
} finally { await browser.close(); }
