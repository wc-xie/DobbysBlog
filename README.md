# Dobby’s Blog

以文字为主的个人博客。Obsidian 写作，iCloud 同步到 Mac，本地单向导出公开内容，Astro 构建，Cloudflare Pages 托管。

## 本地运行

需要 Node 24（项目的开发依赖也带有独立 Node 24，不修改系统版本）。

```sh
npm ci
npm run dev
```

完整搜索需要构建后的索引：

```sh
npm run build
npm run preview
```

## 连接 Obsidian

```sh
npm run setup:vault
# 其他 Vault：npm run setup:vault -- --vault "/absolute/path/to/Vault"
npm run sync:plan
npm run sync
```

设置命令在 Vault 中创建 `Blog/Posts` 和 `Blog/Attachments`，复制三篇显式标记为示例的样稿；不会覆盖已存在的文件。个人路径写进忽略提交的 `vault.local.json`。Mac 上请为 Vault 开启“保留下载”，并等待 iCloud 完成同步。

文章顶部属性：

```yaml
---
title: 文章标题
slug: a-stable-url
description: 简短介绍
date: 2026-11-05
tags: [写作]
publish: true
draft: false
featured: false
---
```

只有 `Blog/Posts` 中明确标记 `publish: true` 且不是草稿的笔记被导出。元信息采用允许列表，个人自定义属性不进入博客。`slug` 必须唯一，只包含小写英文、数字和连字符；改标题不改网址。

支持 Markdown、脚注、GFM 表格、`[[双链|别名]]`、标题链接、独占一行的公开笔记嵌入、`![[图片.png|说明]]`、Callout（含折叠）、代码、KaTeX 和 Mermaid。代码中的双链不会被转换。引用的笔记也必须已发布。当前不转换 Dataview、Canvas、块 ID 引用和原始 HTML；错误会在导入时给出。图片支持 PNG/JPEG/WebP/AVIF/GIF/TIFF，本地 SVG 暂不导入；图表使用 Mermaid，或导出 PNG。

数学使用 KaTeX 支持的命令。Mermaid 版本固定在 12.3.0，支持 ELK 布局；与 Obsidian 内置版本可能不同。图表只在含图文章中加载，并在浏览器渲染，渲染失败会保留源码。Mermaid 12 面向支持 ES2024 的现代浏览器，包括 Safari 17.4 及以后版本。

图片在导入时生成响应式 WebP 和高质量全尺寸版本（去除 EXIF，原始文件仍在 Vault）。这不是字节完全相同的原图下载。大于 Pages 25 MiB 单文件限制的产物会阻止发布；大量超高清原图建议后续接入 R2。

## 预览与发布

```sh
npm run sync
npm run build
npm run preview
# 确认预览后：
npm run publish
```

Mac 上也可以双击项目中的 `预览博客.command` 或 `发布博客.command`。预览命令会先导入和构建，再打开本机网址。

发布命令会重新导入、类型检查、运行测试和构建，然后只提交导出的文章与图片，推送到 `main`。不要并行运行多个导入或发布命令。网站代码修改需要单独提交。若存在其他已暂存的文件，发布会停止。

撤下文章：把 `publish` 改成 `false`，先用 `npm run sync:plan` 查看，再运行 `npm run publish -- --allow-removals`。撤下不会清除 Git 历史、旧部署、搜索引擎或读者保存的副本。

缺失图片、未公开双链、重复 slug、循环嵌入和导入过程中源文件变化都会阻止更新，保留上一次导出。无法证明 iCloud 服务端已同步完毕；发布前仍需检查本地预览。Git 记录只备份公开内容，完整 Vault 请另行备份。

## Cloudflare Pages

在 Cloudflare 控制台创建 Pages 项目，连接 `wc-xie/DobbysBlog`：

| 设置 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| 环境变量 | `NODE_VERSION=24` |
| 环境变量 | `SITE_URL=https://你的实际域名` |

推荐项目名 `dobbysblog`。代码默认 canonical/RSS 地址为 `https://dobbysblog.pages.dev`；若项目域名不同，部署前设置 `SITE_URL`。域名变更后需重新构建。浏览器侧无 Apple 或 GitHub 凭据，不需要数据库、Pages Functions 或 Cloudflare adapter。

连接后每次推送自动部署。GitHub Actions 同时做检查并保存构建产物，它本身不会创建 Pages 项目。预览部署不作为草稿托管；只有公开快照进入仓库。`_headers` 中的安全与缓存配置由 Pages 生效。

Cloudflare 当前建议新项目使用 Workers；本项目保留纯静态输出，今后可迁移到 Workers Static Assets。

## 修改外观与内容

- `blog.config.mjs`：站名、简介、作者、默认域名。
- `src/pages/about.astro`：关于页，目前为待你个性化的初始文案。
- `src/styles/global.css`：排版、配色、手机布局。
- `src/content/posts` 与 `public/media`：自动导出的公开快照，下一次导入会重建，不在这里长期编辑文章。
- `examples/vault`：可复用样稿，与真实文章相互独立。

中文搜索使用 Pagefind extended；正文预渲染为 HTML，搜索按需加载，代码和公式在构建时渲染。图表、图片查看器、目录定位、阅读进度和深浅模式在浏览器提供交互。

## 验证

```sh
npm run check
npm test
npm run build
```

测试覆盖公开内容筛选、隐私属性过滤、未公开引用、循环嵌入、代码保留、图片转换、路径越界、符号链接和撤下保护。
