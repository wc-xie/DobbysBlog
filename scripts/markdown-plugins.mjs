import { visit } from "unist-util-visit";
import { readFileSync, existsSync } from "node:fs";

export function remarkObsidian() {
  return (tree, file) => {
    const english = file.data.astro?.frontmatter?.lang === 'en';
    const firstHeading = tree.children.find(node => node.type === 'heading');
    if (english && firstHeading?.depth === 1 && /[\u3400-\u9fff]/.test(firstHeading.children.map(node => node.value || '').join('')) && file.data.astro?.frontmatter?.title) {
      firstHeading.children = [{ type: 'text', value: file.data.astro.frontmatter.title }];
    }
    visit(tree, "code", (node) => {
      if (node.lang !== "mermaid") return;
      node.type = "paragraph";
      node.data = { hName: "pre", hProperties: { className: ["mermaid-source"], "data-mermaid": "" } };
      node.children = [{ type: "text", value: node.value }];
      delete node.value;
      delete node.lang;
    });
    visit(tree, "blockquote", (node) => {
      const paragraph = node.children[0];
      const first = paragraph?.children?.[0];
      if (first?.type !== "text") return;
      const match = first.value.match(/^\[!([a-zA-Z-]+)\]([+-])?\s*([^\n]*)(?:\n|$)/);
      if (!match) return;
      const type = match[1].toLowerCase();
      const labels = { note: "笔记", tip: "提示", info: "说明", warning: "注意", important: "重要", quote: "摘录", abstract: "摘要", example: "示例", question: "问题", success: "完成" };
      const title = match[3] || (english ? type.charAt(0).toUpperCase() + type.slice(1) : labels[type]) || type;
      first.value = first.value.slice(match[0].length);
      node.data = { hName: match[2] ? "details" : "aside", hProperties: { className: ["callout", `callout-${type}`], ...(match[2] === "+" ? { open: true } : {}) } };
      node.children.unshift({ type: "paragraph", data: { hName: match[2] ? "summary" : "p", hProperties: { className: ["callout-title"] } }, children: [{ type: "text", value: title }] });
    });
  };
}

export function rehypeEnhancements() {
  return (tree, file) => {
    const english = file.data.astro?.frontmatter?.lang === 'en';
    const manifestPath = new URL("../src/content/media.json", import.meta.url);
    const media = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && !node.properties?.className?.includes("mermaid-source")) {
        const code = node.children.find((child) => child.tagName === "code");
        if (code) {
          const language = code.properties?.dataLanguage || node.properties?.dataLanguage || "code";
          node.children.push({ type: "element", tagName: "button", properties: { className: ["copy-code"], type: "button", "aria-label": english ? 'Copy code' : '复制代码', "data-copy-code": "" }, children: [{ type: "text", value: english ? 'Copy' : '复制' }] });
          node.properties["data-label"] = language;
        }
      }
      if (node.tagName === "img") {
        const info = media[node.properties.src];
        node.properties.loading = "lazy";
        node.properties.decoding = "async";
        node.properties.tabIndex = 0;
        node.properties.role = "button";
        node.properties["aria-label"] = english ? `Enlarge image: ${node.properties.alt || 'Article illustration'}` : `放大图片：${node.properties.alt || "文章配图"}`;
        node.properties["data-lightbox"] = "";
        if (info) Object.assign(node.properties, { width: info.width, height: info.height, srcSet: info.srcset, sizes: "(max-width: 800px) calc(100vw - 40px), 760px", "data-full": info.full });
      }
      if (node.tagName === "a" && /^https?:\/\//.test(String(node.properties.href))) {
        node.properties.rel = "noopener noreferrer";
      }
      if (english && node.properties.id === 'footnote-label') node.children = [{ type: 'text', value: 'Notes' }];
      if (english && node.properties.dataFootnoteBackref !== undefined) node.properties.ariaLabel = 'Back to content';
    });
  };
}
