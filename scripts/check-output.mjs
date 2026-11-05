import fs from 'node:fs/promises';
import path from 'node:path';
const root = new URL('../dist/', import.meta.url);
let count = 0;
async function walk(directory) {
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) { await walk(file); continue; }
    count++;
    if ((await fs.stat(file)).size > 25 * 1024 * 1024) throw new Error(`静态文件超过 Pages 25 MiB 限制：${item.name}`);
    if (!file.endsWith('.html')) continue;
    const html = await fs.readFile(file, 'utf8');
    if (html.includes('katex-error')) throw new Error(`公式渲染失败：${file}`);
    if (/\/Users\/|iCloud~md~obsidian|publish:\s*false/.test(html)) throw new Error(`页面中出现不应发布的本机信息：${file}`);
  }
}
await walk(root.pathname);
if (count > 20000) throw new Error(`产物有 ${count} 个文件，超过 Pages 免费计划限制。`);
console.log(`已检查 ${count} 个静态文件：体积与公式渲染通过。`);
