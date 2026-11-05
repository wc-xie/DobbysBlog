import rss from '@astrojs/rss';
import { getPosts } from './lib';
import { postPath, type Lang } from './i18n';
import { blog } from '../blog.config.mjs';
export async function feed(lang: Lang) {
  return rss({ title: `${blog.title} · ${lang === 'en' ? 'English' : '中文'}`, description: lang === 'en' ? blog.descriptionEn : blog.description, site: blog.site,
    items: (await getPosts(lang)).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: postPath(post) })),
    customData: `<language>${lang === 'en' ? 'en' : 'zh-CN'}</language>`,
  });
}
