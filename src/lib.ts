import { getCollection } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date).replaceAll("/", ".");
}

export function readingTime(body = "") {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, "").match(/\b\w+\b/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 350 + words / 220));
}
