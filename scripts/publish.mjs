import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { syncVault } from './sync-vault.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, stdio: capture ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`${command} ${args[0]} 未完成。${capture ? result.stderr : ''}`);
  return result.stdout?.trim() || '';
}
try {
  const config = JSON.parse(await fs.readFile(path.join(root, 'vault.local.json'), 'utf8'));
  console.log('检查并导入公开文章…');
  const summary = await syncVault({ ...config, allowRemovals: process.argv.includes('--allow-removals') });
  console.log(JSON.stringify(summary, null, 2));
  run(npm, ['run', 'check']);
  run(npm, ['test']);
  run(npm, ['run', 'build']);
  // Explicit paths keep local configuration, original Vault files and unrelated work out of commits.
  run('git', ['add', '--', 'src/content/posts', 'src/content/media.json', 'public/media']);
  const staged = run('git', ['diff', '--cached', '--name-only'], true);
  const safe = staged.split('\n').filter(Boolean).every(file => file.startsWith('src/content/posts/') || file === 'src/content/media.json' || file.startsWith('public/media/'));
  if (!safe) throw new Error('暂存区中还有网站内容之外的改动，请先单独提交后再发布。');
  if (staged) run('git', ['commit', '-m', `content: publish ${summary.total} approved posts`]);
  run('git', ['push', 'origin', 'HEAD:main']);
  console.log('公开内容已推送。若仓库已连接 Cloudflare Pages，部署将自动开始；请在 Pages 中确认最终结果。');
} catch (error) { console.error(`发布停止：${error.message}`); process.exitCode = 1; }
