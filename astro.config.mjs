import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { readFileSync } from 'node:fs';
import { ACTIVE_CITY } from './city.config.mjs';

const data = JSON.parse(readFileSync(`./src/data/cities/${ACTIVE_CITY}.json`, 'utf8'));
const ghPages = process.env.GH_PAGES === 'true';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site: ghPages ? 'https://aintgottaclue.github.io' : `https://${data.site.domain}`,
  ...(ghPages ? { base, output: 'static' } : { output: 'server', adapter: cloudflare() }),
  trailingSlash: 'always',
  build: { format: 'directory' }
});
