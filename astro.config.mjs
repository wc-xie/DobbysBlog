import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unified } from "@astrojs/markdown-remark";
import { blog } from "./blog.config.mjs";
import { remarkObsidian, rehypeEnhancements } from "./scripts/markdown-plugins.mjs";

export default defineConfig({
  site: blog.site,
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkObsidian],
      rehypePlugins: [[rehypeKatex, { strict: "error" }], rehypeEnhancements],
      remarkRehype: { footnoteLabel: "注释", footnoteBackLabel: "返回正文" },
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
  },
});
