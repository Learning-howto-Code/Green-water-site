// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://waterwz.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/team') && page !== 'https://waterwz.com/home/',
    }),
  ],
});
