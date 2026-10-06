import type { APIRoute } from 'astro';
import { domain } from '../data/city';

export const GET: APIRoute = () =>
  new Response(`User-agent: *
Allow: /
Sitemap: https://${domain}/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
