import { getCollection } from "astro:content";
import { postPath, type Lang } from './i18n';

export async function getPosts(lang: Lang = 'zh') {
  const posts = await getCollection("posts");
  return posts.filter(post => post.data.lang === lang).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function postAlternates(key: string) {
  const posts = await getCollection('posts');
  return Object.fromEntries(posts.filter(post => (post.data.translationKey || post.data.slug) === key).map(post => [post.data.lang, postPath(post)]));
}

export function formatDate(date: Date, lang: Lang = 'zh') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'zh-CN', {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date).replaceAll("/", lang === 'en' ? '/' : '.');
}

export function readingTime(body = "") {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, "").match(/\b\w+\b/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 350 + words / 220));
}
