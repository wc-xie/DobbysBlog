import { blog } from '../../blog.config.mjs';
export function GET() { return new Response(`User-agent: *\nAllow: /\nSitemap: ${blog.site.replace(/\/$/, '')}/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
