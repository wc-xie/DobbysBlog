import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts", generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u),
    lang: z.enum(['zh', 'en']).default('zh'),
    translationKey: z.string().regex(/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u).optional(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    publish: z.literal(true),
    draft: z.literal(false),
  }),
});
export const collections = { posts };
