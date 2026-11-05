import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const index = process.argv.indexOf('--vault');
const vaultPath = index >= 0 ? path.resolve(process.argv[index + 1]) : path.join(os.homedir(), 'Library/Mobile Documents/iCloud~md~obsidian/Documents/WilsonVault');
try {
  await fs.access(path.join(vaultPath, '.obsidian'));
  await fs.mkdir(path.join(vaultPath, 'Blog/Posts'), { recursive: true });
  await fs.mkdir(path.join(vaultPath, 'Blog/Attachments'), { recursive: true });
  const source = path.join(root, 'examples/vault/Blog');
  for (const folder of ['Posts', 'Attachments']) {
    for (const file of await fs.readdir(path.join(source, folder))) {
      try { await fs.copyFile(path.join(source, folder, file), path.join(vaultPath, 'Blog', folder, file), fs.constants.COPYFILE_EXCL); }
      catch (error) { if (error.code !== 'EEXIST') throw error; }
    }
  }
  await fs.writeFile(path.join(root, 'vault.local.json'), JSON.stringify({ vaultPath, contentRoots: ['Blog/Posts'] }, null, 2) + '\n', { flag: 'wx' }).catch(error => { if (error.code !== 'EEXIST') throw error; });
  console.log('Blog/Posts 与 Blog/Attachments 已准备好。样稿仅在文件不存在时创建。');
  console.log('接下来运行 npm run sync:plan 查看将导入的内容。');
} catch (error) { console.error(`设置失败：${error.message}`); process.exitCode = 1; }
