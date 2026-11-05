import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { syncVault } from '../scripts/sync-vault.mjs';

async function fixture(t) {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'dobby-test-'));
  const vaultPath = path.join(base, 'vault');
  const root = path.join(base, 'site');
  await fs.mkdir(path.join(vaultPath, 'Blog/Posts'), { recursive: true });
  await fs.mkdir(root);
  t.after(() => fs.rm(base, { recursive: true, force: true }));
  const write = async (file, text) => { await fs.mkdir(path.dirname(path.join(vaultPath, file)), { recursive: true }); await fs.writeFile(path.join(vaultPath, file), text); };
  return { vaultPath, root, write, sync: (options = {}) => syncVault({ vaultPath, root, ...options }) };
}
function note({ slug = 'first', title = '公开文章', publish = true, body = '正文。', extra = '' } = {}) {
  return `---\ntitle: ${title}\nslug: ${slug}\ndescription: 公开简介\ndate: 2026-11-05\npublish: ${publish}\ndraft: false\n${extra}---\n\n${body}\n`;
}
test('only approved notes and allowlisted frontmatter are exported', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ extra: 'secret: INTERNAL_TOKEN\n' }));
  await f.write('Blog/Posts/private.md', note({ slug: 'private', publish: false, body: 'PRIVATE_CONTENT' }));
  await f.write('Daily/secret.md', note({ slug: 'outside', body: 'PRIVATE_OUTSIDE' }));
  assert.equal((await f.sync()).total, 1);
  assert.deepEqual(await fs.readdir(path.join(f.root, 'src/content/posts')), ['first.md']);
  const output = await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8');
  assert.doesNotMatch(output, /INTERNAL_TOKEN|PRIVATE_CONTENT|PRIVATE_OUTSIDE|secret:/);
});
test('private wikilinks fail and keep the previous snapshot unchanged', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note());
  await f.sync();
  const before = await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8');
  await f.write('Blog/Posts/a.md', note({ body: '不应公开 [[private]] 的标题与内容。' }));
  await f.write('Blog/Posts/private.md', note({ slug: 'private', publish: false }));
  await assert.rejects(f.sync(), /未发布/);
  assert.equal(await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8'), before);
});
test('wikilinks, aliases, standard links and approved heading embeds resolve', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '[[第二篇|阅读]] 与 [链接](b.md)。\n\n![[b#一个标题]]' }));
  await f.write('Blog/Posts/b.md', note({ slug: 'second', title: '第二篇', extra: 'aliases: [别名]\n', body: '## 一个标题\n\n嵌入内容。\n\n## 其他标题\n\n不嵌入。' }));
  await f.sync();
  const output = await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8');
  assert.match(output, /\/posts\/second\//);
  assert.match(output, /嵌入内容/);
  assert.doesNotMatch(output, /不嵌入/);
});
test('code and math remain literal and comments are removed', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '正文 %%隐私内容%%。\n\n`[[private]]`\n\n```python\nprint("[[private]]")\n```\n\n$$\nx^2 + y^2 = 1\n$$' }));
  await f.sync();
  const output = await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8');
  assert.doesNotMatch(output, /隐私内容/);
  assert.match(output, /print\("\[\[private\]\]"\)/);
  assert.match(output, /x\^2 \+ y\^2 = 1/);
});
test('missing attachments and symlink escapes are rejected', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '![[missing.png]]' }));
  await assert.rejects(f.sync(), /不存在/);
  await fs.writeFile(path.join(f.root, 'outside.png'), 'outside');
  await fs.symlink(path.join(f.root, 'outside.png'), path.join(f.vaultPath, 'Blog/Posts/escape.png'));
  await f.write('Blog/Posts/a.md', note({ body: '![[escape.png]]' }));
  await assert.rejects(f.sync(), /符号链接/);
});
test('image derivatives have responsive metadata and contain no source paths', async t => {
  const f = await fixture(t);
  const image = await sharp({ create: { width: 1500, height: 900, channels: 3, background: '#b5cbb2' } }).png().toBuffer();
  await f.write('Blog/Attachments/图.png', image);
  await f.write('Blog/Posts/a.md', note({ body: '![[Blog/Attachments/图.png|中文图片说明]]' }));
  await f.sync();
  const manifest = await fs.readFile(path.join(f.root, 'src/content/media.json'), 'utf8');
  assert.match(manifest, /640w/);
  assert.match(manifest, /1280w/);
  assert.doesNotMatch(manifest, /vault|Attachments|\/Users\//);
  assert.equal((await fs.readdir(path.join(f.root, 'public/media'))).length, 4);
});
test('removal requires explicit opt-in and plan does not change files', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note());
  await f.sync();
  await f.write('Blog/Posts/a.md', note({ publish: false }));
  assert.deepEqual((await f.sync({ plan: true })).removed, ['公开文章']);
  assert.equal((await fs.readdir(path.join(f.root, 'src/content/posts'))).length, 1);
  await assert.rejects(f.sync(), /撤下/);
  await f.sync({ allowRemovals: true });
  assert.deepEqual(await fs.readdir(path.join(f.root, 'src/content/posts')), []);
});
test('duplicate slugs and recursive note embeds fail', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '![[b]]' }));
  await f.write('Blog/Posts/b.md', note());
  await assert.rejects(f.sync(), /重复/);
  await f.write('Blog/Posts/b.md', note({ slug: 'second', body: '![[a]]' }));
  await assert.rejects(f.sync(), /循环/);
});
test('ambiguous attachment filenames and hidden path traversal fail', async t => {
  const f = await fixture(t);
  await f.write('One/test.png', 'not image');
  await f.write('Two/test.png', 'not image');
  await f.write('Blog/Posts/a.md', note({ body: '![[test.png]]' }));
  await assert.rejects(f.sync(), /不唯一/);
  await f.write('.obsidian/secret.png', 'secret');
  await f.write('Blog/Posts/a.md', note({ body: '![[../../.obsidian/secret.png]]' }));
  await assert.rejects(f.sync(), /不允许/);
});
test('multiline comments hide paragraphs, links and code; malformed comments stop publication', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '公开。\n\n%%\n\n## PRIVATE_HEADING\n\n[[private]]\n\n```text\nPRIVATE_CODE\n```\n\n%%\n\n仍然公开。' }));
  await f.sync();
  const output = await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8');
  assert.doesNotMatch(output, /PRIVATE|private/);
  assert.match(output, /仍然公开/);
  await f.write('Blog/Posts/a.md', note({ body: '公开 %%未闭合的私密内容' }));
  await assert.rejects(f.sync(), /未闭合/);
});
test('removal guard survives a fresh checkout without local sync history', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note());
  await f.sync();
  await fs.unlink(path.join(f.root, '.publish/last-sync.json'));
  await f.write('Blog/Posts/a.md', note({ publish: false }));
  await assert.rejects(f.sync(), /撤下/);
});
test('translations may share a slug and links stay within their language', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/zh/a.md', note({ slug: 'shared', body: '[[b]]' }));
  await f.write('Blog/Posts/zh/b.md', note({ slug: 'linked', title: '中文链接' }));
  await f.write('Blog/Posts/en/a.md', note({ slug: 'shared', title: 'English article', extra: 'lang: en\ntranslationKey: shared\n', body: '[[b]]' }));
  await f.write('Blog/Posts/en/b.md', note({ slug: 'linked', title: 'English linked article', extra: 'lang: en\n' }));
  assert.equal((await f.sync()).total, 4);
  const chinese = await fs.readFile(path.join(f.root, 'src/content/posts/shared.md'), 'utf8');
  const english = await fs.readFile(path.join(f.root, 'src/content/posts/en/shared.md'), 'utf8');
  assert.match(chinese, /\]\(\/posts\/linked\/\)/);
  assert.match(english, /\]\(\/en\/posts\/linked\/\)/);
  assert.match(english, /lang: en/);
  assert.match(english, /translationKey: shared/);
});
test('removal protection tracks each translation independently, even without local history', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note());
  await f.write('Blog/Posts/en.md', note({ title: 'English', extra: 'lang: en\n' }));
  await f.sync();
  await fs.unlink(path.join(f.root, '.publish/last-sync.json'));
  await f.write('Blog/Posts/en.md', note({ publish: false, extra: 'lang: en\n' }));
  assert.deepEqual((await f.sync({ plan: true })).removed, ['English']);
  await assert.rejects(f.sync(), /撤下/);
  await f.sync({ allowRemovals: true });
  assert.deepEqual(await fs.readdir(path.join(f.root, 'src/content/posts')), ['first.md']);
});
test('invalid languages and duplicate translation pairs cannot be published', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ extra: 'lang: fr\n' }));
  await assert.rejects(f.sync(), /lang/);
  await f.write('Blog/Posts/a.md', note({ extra: 'lang: en\ntranslationKey: same\n' }));
  await f.write('Blog/Posts/b.md', note({ slug: 'second', extra: 'lang: en\ntranslationKey: same\n' }));
  await assert.rejects(f.sync(), /译文关联重复/);
});
test('explicit vault scope imports flagged notes outside Blog and fills empty properties', async t => {
  const f = await fixture(t);
  await f.write('Research/心脏的AutoPilot.md', '---\npublish: true\ndraft: false\nslug:\ndescription:\ntags:\ndate: 2026-11-05\n---\n# 心脏的AutoPilot\n\n用高密度传感器理解心血管状态。\n');
  assert.equal((await f.sync()).total, 0);
  assert.equal((await f.sync({ scanVault: true })).total, 1);
  const output = await fs.readFile(path.join(f.root, 'src/content/posts/心脏的autopilot.md'), 'utf8');
  assert.match(output, /title: 心脏的AutoPilot/);
  assert.match(output, /description: 用高密度传感器理解心血管状态/);
  assert.match(output, /tags: \[\]/);
});
test('missing-image opt-in renders a marker but never permits ambiguous or unsafe files', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note({ body: '![[missing.png]]' }));
  await assert.rejects(f.sync(), /不存在/);
  const summary = await f.sync({ allowMissingImages: true });
  assert.deepEqual(summary.missingImages, ['missing.png']);
  assert.match(await fs.readFile(path.join(f.root, 'src/content/posts/first.md'), 'utf8'), /配图暂缺/);
  await f.write('One/missing.png', 'one');
  await f.write('Two/missing.png', 'two');
  await assert.rejects(f.sync({ allowMissingImages: true }), /不唯一/);
});
test('translation publication follows the original publication flag', async t => {
  const f = await fixture(t);
  await f.write('Blog/Posts/a.md', note());
  await f.write('Blog/Posts/english.md', note({ extra: 'lang: en\ntranslationOf: Blog/Posts/a.md\n' }));
  assert.equal((await f.sync()).total, 2);
  await f.write('Blog/Posts/a.md', note({ publish: false }));
  assert.equal((await f.sync({ plan: true })).total, 0);
  await assert.rejects(f.sync(), /撤下/);
});
