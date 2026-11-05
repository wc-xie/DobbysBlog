import rss from '@astrojs/rss';
import { getPosts } from '../lib';
import { blog } from '../../blog.config.mjs';
export async function GET() {
  return rss({ title: blog.title, description: blog.description, site: blog.site,
    items: (await getPosts()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.date, link: `/posts/${post.data.slug}/` })),
    customData: '<language>zh-CN</language>',
  });
}
