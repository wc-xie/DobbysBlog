import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash, randomUUID } from "node:crypto";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { toString } from "mdast-util-to-string";
import { slug as headingSlug } from "github-slugger";
import sharp from "sharp";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkStringify, { bullet: "-", fences: true });
const hash = (data) => createHash("sha256").update(data).digest("hex");
const slash = (value) => value.split(path.sep).join("/");
const isInside = (root, target) => target === root || (!path.relative(root, target).startsWith("..") && !path.isAbsolute(path.relative(root, target)));
const isExternal = (url) => /^(https?:|mailto:)/i.test(url);

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return fallback; throw error; }
}

async function listFiles(root, base = root) {
  const output = [];
  for (const entry of await fs.readdir(base, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(base, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) output.push(...await listFiles(root, full));
    else if (entry.isFile()) output.push(slash(path.relative(root, full)));
  }
  return output.sort();
}

export async function syncVault(options = {}) {
  const root = options.root || projectRoot;
  const lockDirectory = path.join(root, '.publish');
  await fs.mkdir(lockDirectory, { recursive: true });
  const lockFile = path.join(lockDirectory, 'sync.lock');
  let lock;
  try { lock = await fs.open(lockFile, 'wx'); }
  catch (error) { if (error.code === 'EEXIST') throw new Error('另一次导入正在进行。若先前进程异常退出，请检查后移除 .publish/sync.lock。'); throw error; }
  try { return await performSyncVault(options); }
  finally { await lock.close(); await fs.unlink(lockFile); }
}

async function performSyncVault({ vaultPath, contentRoots = ["Blog/Posts"], root = projectRoot, plan = false, allowRemovals = false } = {}) {
  if (!vaultPath || !contentRoots.length) throw new Error("请先运行 npm run setup:vault，配置 Vault 路径。");
  const vault = await fs.realpath(vaultPath);
  const checkedRead = async (relative) => {
    const full = path.resolve(vault, relative);
    if (!isInside(vault, full) || relative.split(/[\\/]/).some((part) => part.startsWith("."))) throw new Error(`不允许读取发布范围外的路径：${relative}`);
    const real = await fs.realpath(full);
    if (real !== full || !isInside(vault, real)) throw new Error(`不允许通过符号链接导入：${relative}`);
    return fs.readFile(full);
  };
  const scanRoots = async () => {
    const found = [];
    for (const relative of contentRoots) {
      if (!relative || relative === "." || relative.split(/[\\/]/).some((part) => part === ".." || part.startsWith("."))) throw new Error("发布目录必须是 Vault 内的专用子目录。");
      const directory = path.resolve(vault, relative);
      if (!isInside(vault, directory) || await fs.realpath(directory) !== directory) throw new Error(`发布目录不安全：${relative}`);
      found.push(...(await listFiles(vault, directory)).filter((file) => file.endsWith(".md")));
    }
    return [...new Set(found)].sort();
  };
  const initialFiles = await scanRoots();
  const sourceHashes = new Map();
  const entries = [];
  for (const file of initialFiles) {
    const bytes = await checkedRead(file);
    sourceHashes.set(file, hash(bytes));
    const parsed = matter(bytes.toString("utf8"));
    if (parsed.data.publish !== true || parsed.data.draft === true) continue;
    if (parsed.data.draft !== undefined && parsed.data.draft !== false) throw new Error(`${file} 的 draft 必须使用布尔值 true 或 false。`);
    const { title, slug, description, date, updated, tags = [], featured = false } = parsed.data;
    if (typeof title !== "string" || !title.trim() || typeof description !== "string" || !description.trim()) throw new Error(`${file} 缺少 title 或 description。`);
    if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file} 的 slug 应为小写英文、数字和连字符。`);
    if (!date || Number.isNaN(new Date(date).valueOf()) || (updated && Number.isNaN(new Date(updated).valueOf()))) throw new Error(`${file} 的日期无效。`);
    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string" || !tag.trim()) || typeof featured !== "boolean") throw new Error(`${file} 的标签或 featured 格式无效。`);
    const data = { title, slug, description, date: new Date(date).toISOString(), ...(updated ? { updated: new Date(updated).toISOString() } : {}), tags, featured, publish: true, draft: false };
    entries.push({ file, data, body: parsed.content, aliases: parsed.data.aliases || [] });
  }
  const slugs = new Set();
  for (const entry of entries) {
    if (slugs.has(entry.data.slug)) throw new Error(`文章网址重复：${entry.data.slug}`);
    slugs.add(entry.data.slug);
  }
  let oldManifest = await readJson(path.join(root, ".publish/last-sync.json"), null);
  if (!oldManifest) {
    const previousPosts = [];
    const directory = path.join(root, 'src/content/posts');
    let files = [];
    try { files = await fs.readdir(directory); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    for (const file of files.filter(file => file.endsWith('.md'))) {
      const { data } = matter(await fs.readFile(path.join(directory, file), 'utf8'));
      previousPosts.push({ slug: data.slug, title: data.title, hash: null });
    }
    oldManifest = { posts: previousPosts };
  }
  const posts = entries.map((entry) => ({ source: entry.file, slug: entry.data.slug, title: entry.data.title, hash: sourceHashes.get(entry.file) }));
  const removed = oldManifest.posts.filter((old) => !posts.some((post) => post.slug === old.slug));
  const added = posts.filter((post) => !oldManifest.posts.some((old) => old.slug === post.slug));
  const updated = posts.filter((post) => oldManifest.posts.some((old) => old.slug === post.slug && old.hash !== post.hash));
  const summary = { added: added.map((p) => p.title), updated: updated.map((p) => p.title), removed: removed.map((p) => p.title), total: posts.length };
  if (removed.length && !allowRemovals && !plan) throw new Error(`本次将撤下 ${removed.length} 篇文章。请先运行 npm run sync:plan；确认后使用 npm run sync -- --allow-removals。同步未完成时不要撤下文章。`);

  // Resolve only approved articles; private note metadata never enters this index.
  function findNote(target, from) {
    const withoutExtension = target.replace(/\.md$/i, "");
    const candidates = entries.filter((entry) => {
      const name = entry.file.replace(/\.md$/, "");
      const relative = slash(path.posix.normalize(path.posix.join(path.posix.dirname(from), withoutExtension)));
      return name === relative || name === withoutExtension || name === withoutExtension.replace(/^\//, "");
    });
    if (candidates.length === 1) return candidates[0];
    const byName = entries.filter((entry) => path.posix.basename(entry.file, ".md") === withoutExtension || entry.data.title === target || (Array.isArray(entry.aliases) && entry.aliases.includes(target)));
    if (byName.length === 1) return byName[0];
    throw new Error(`${from} 引用的「${target}」未发布、不存在或名称不唯一。`);
  }

  let allFiles;
  const assets = new Map();
  const assetReads = new Map();
  async function findAsset(target, from) {
    const normalized = decodeURIComponent(target).replaceAll("\\", "/");
    const candidates = [...new Set([path.posix.normalize(path.posix.join(path.posix.dirname(from), normalized)), normalized.replace(/^\//, "")])];
    for (const candidate of candidates) {
      try { await checkedRead(candidate); return candidate; }
      catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    allFiles ??= await listFiles(vault);
    const matches = allFiles.filter((file) => file === normalized || (path.posix.basename(normalized) === normalized && path.posix.basename(file) === normalized));
    if (matches.length !== 1) throw new Error(`${from} 引用的图片「${target}」不存在或名称不唯一。`);
    return matches[0];
  }

  async function image(target, from, alt = "") {
    if (isExternal(target)) {
      if (!/^https:\/\//i.test(target)) throw new Error("外部图片需要 HTTPS 地址。");
      return { type: "image", url: target, alt };
    }
    const file = await findAsset(target, from);
    const extension = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".tif", ".tiff"].includes(extension)) throw new Error(`暂不直接导入 ${extension} 附件；矢量图请导出为 PNG，或使用 Mermaid。`);
    const bytes = await checkedRead(file);
    const digest = hash(bytes);
    assetReads.set(file, digest);
    if (!assets.has(digest)) {
      const metadata = await sharp(bytes, { animated: true }).metadata();
      const oriented = metadata.autoOrient || metadata;
      const width = oriented.width;
      const height = oriented.height;
      if (!width || !height) throw new Error(`无法读取图片尺寸：${file}`);
      assets.set(digest, { bytes, digest, width, height, animated: (metadata.pages || 1) > 1 });
    }
    return { type: "image", url: `/media/${digest.slice(0, 20)}.webp`, alt };
  }

  async function transform(entry, stack = []) {
    if (stack.includes(entry.file) || stack.length >= 8) throw new Error(`笔记嵌入存在循环或超过 8 层：${entry.file}`);
    const tree = processor.parse(entry.body);
    removeComments(tree);
    const ancestors = [...stack, entry.file];
    async function wiki(text) {
      const result = [];
      const regex = /(!?)\[\[([^\]\n]+)\]\]/g;
      let offset = 0;
      for (const match of text.matchAll(regex)) {
        if (match.index > offset) result.push({ type: "text", value: text.slice(offset, match.index) });
        const [reference, label] = match[2].split("|");
        const [target, ...headings] = reference.split("#");
        const heading = headings.join("#");
        if (heading.startsWith("^")) throw new Error("暂不支持 Obsidian 块引用，请改用标题引用。");
        const isImage = /\.(png|jpe?g|webp|avif|gif|tiff?)$/i.test(target);
        if (match[1] && isImage) result.push(await image(target, entry.file, label && !/^\d+(x\d+)?$/.test(label) ? label : path.posix.basename(target)));
        else {
          const note = target ? findNote(target, entry.file) : entry;
          if (match[1]) throw new Error(`笔记嵌入请独占一行：${match[0]}`);
          if (heading) assertHeading(note, heading);
          result.push({ type: "link", url: `/posts/${note.data.slug}/${heading ? `#${headingSlug(heading)}` : ""}`, children: [{ type: "text", value: label || heading || note.data.title }] });
        }
        offset = match.index + match[0].length;
      }
      if (offset < text.length) result.push({ type: "text", value: text.slice(offset) });
      return result;
    }
    async function walk(node) {
      if (node.type === "html") throw new Error(`${entry.file} 包含原始 HTML；请使用 Markdown，以确保发布内容可移植。`);
      if (node.type === "image") Object.assign(node, await image(node.url, entry.file, node.alt || ""));
      if (node.type === "link") {
        if (/^(javascript|data|file|obsidian):/i.test(node.url)) throw new Error("文章中包含不支持的链接协议。");
        if (!isExternal(node.url) && !node.url.startsWith("#")) {
          const [target, anchor] = decodeURIComponent(node.url).split("#");
          const note = findNote(target, entry.file);
          node.url = `/posts/${note.data.slug}/${anchor ? `#${headingSlug(anchor)}` : ""}`;
        }
      }
      if (!node.children) return;
      const output = [];
      for (const child of node.children) {
        if (child.type === "paragraph" && child.children.length === 1 && child.children[0].type === "text") {
          const embed = child.children[0].value.match(/^!\[\[([^\]|]+)\]\]$/);
          if (embed && !/\.(png|jpe?g|webp|avif|gif|tiff?)$/i.test(embed[1])) {
            const [target, heading] = embed[1].split("#");
            const note = target ? findNote(target, entry.file) : entry;
            const embedded = await transform(note, ancestors);
            const selected = heading ? selectHeading(embedded.children, heading) : embedded.children;
            output.push(...selected);
            continue;
          }
        }
        if (child.type === "text") {
          output.push(...await wiki(child.value));
        } else { await walk(child); output.push(child); }
      }
      node.children = output;
    }
    await walk(tree);
    return tree;
  }

  const rendered = [];
  for (const entry of entries) {
    const tree = await transform(entry);
    rendered.push({ slug: entry.data.slug, text: matter.stringify(processor.stringify(tree), entry.data) });
  }
  if (JSON.stringify(initialFiles) !== JSON.stringify(await scanRoots())) throw new Error("导入时 Vault 文件列表发生变化，请等待 iCloud 同步完成后重试。");
  for (const [file, digest] of [...sourceHashes, ...assetReads]) {
    if (hash(await checkedRead(file)) !== digest) throw new Error(`导入时文件发生变化，请重试：${file}`);
  }
  if (plan) return summary;

  const stage = path.join(root, ".publish", `snapshot-${randomUUID()}`);
  const stagePosts = path.join(stage, "posts");
  const stageMedia = path.join(stage, "media");
  await fs.mkdir(stagePosts, { recursive: true });
  await fs.mkdir(stageMedia, { recursive: true });
  const mediaManifest = {};
  try {
    for (const post of rendered) await fs.writeFile(path.join(stagePosts, `${post.slug}.md`), post.text);
    for (const asset of assets.values()) {
      const name = asset.digest.slice(0, 20);
      const variants = [];
      const sizes = [...new Set([640, 1280, 1920, Math.min(asset.width, 3200)].filter((size) => size <= asset.width))].sort((a, b) => a - b);
      if (!sizes.length) sizes.push(asset.width);
      for (const width of sizes) {
        const filename = `${name}-${width}.webp`;
        await sharp(asset.bytes, { animated: asset.animated }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(stageMedia, filename));
        variants.push(`/media/${filename} ${width}w`);
      }
      const fullFilename = `${name}.webp`;
      await sharp(asset.bytes, { animated: asset.animated }).rotate().webp({ quality: 96 }).toFile(path.join(stageMedia, fullFilename));
      if ((await fs.stat(path.join(stageMedia, fullFilename))).size > 25 * 1024 * 1024) throw new Error("高清图片超过 Pages 25 MiB 限制，请缩小图片或配置外部图床。");
      mediaManifest[`/media/${fullFilename}`] = { width: asset.width, height: asset.height, srcset: variants.join(", "), full: `/media/${fullFilename}` };
    }
    await fs.writeFile(path.join(stage, "media.json"), JSON.stringify(mediaManifest, null, 2));
    await fs.writeFile(path.join(stage, "last-sync.json"), JSON.stringify({ posts }, null, 2));
    const targets = [["posts", "src/content/posts"], ["media", "public/media"], ["media.json", "src/content/media.json"], ["last-sync.json", ".publish/last-sync.json"]];
    const completed = [];
    try {
      for (const [source, destination] of targets) {
        const target = path.join(root, destination);
        const backup = path.join(stage, `backup-${source}`);
        await fs.mkdir(path.dirname(target), { recursive: true });
        let backedUp = false;
        try { await fs.rename(target, backup); backedUp = true; } catch (error) { if (error.code !== "ENOENT") throw error; }
        completed.push({ target, backup, backedUp });
        await fs.rename(path.join(stage, source), target);
      }
    } catch (error) {
      for (const { target, backup, backedUp } of completed.reverse()) {
        await fs.rm(target, { recursive: true, force: true });
        if (backedUp) await fs.rename(backup, target);
      }
      throw error;
    }
  } finally { await fs.rm(stage, { recursive: true, force: true }); }
  return summary;
}

function selectHeading(children, heading) {
  const start = children.findIndex((node) => node.type === "heading" && headingSlug(toString(node)) === headingSlug(heading));
  if (start < 0) throw new Error(`找不到标题：${heading}`);
  let end = start + 1;
  while (end < children.length && !(children[end].type === "heading" && children[end].depth <= children[start].depth)) end++;
  return children.slice(start, end);
}
function assertHeading(note, heading) { selectHeading(processor.parse(note.body).children, heading); }

function removeComments(tree) {
  let hidden = false;
  function clean(node) {
    if (node.type === 'text') {
      let value = '';
      let offset = 0;
      for (const token of node.value.matchAll(/%%/g)) {
        if (!hidden) value += node.value.slice(offset, token.index);
        hidden = !hidden;
        offset = token.index + 2;
      }
      if (!hidden) value += node.value.slice(offset);
      node.value = value;
      return Boolean(value);
    }
    if (node.children) {
      node.children = node.children.filter(clean);
      return node.type === 'root' || node.children.length > 0;
    }
    return !hidden;
  }
  clean(tree);
  if (hidden) throw new Error('Obsidian 注释 %% 未闭合，请修正后再发布。');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const config = await readJson(path.join(projectRoot, "vault.local.json"), {});
    const summary = await syncVault({ ...config, plan: process.argv.includes("--plan"), allowRemovals: process.argv.includes("--allow-removals") });
    console.log(JSON.stringify(summary, null, 2));
  } catch (error) { console.error(`导入失败：${error.message}`); process.exitCode = 1; }
}
