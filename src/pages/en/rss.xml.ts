import { feed } from '../../rss';
export async function GET() { return feed('en'); }
