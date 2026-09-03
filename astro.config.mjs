import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aifreecalculator.com',

  adapter: cloudflare({
    imageService: 'passthrough',
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.wrangler/**', '**/.astro/**'],
      },
    },
    optimizeDeps: {
      include: ['astro/assets/services/noop', 'astro/app/manifest'],
    },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api') &&
        !page.includes('/sitemap') &&
        !page.includes('/404') &&
        !page.includes('/500'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://aifreecalculator.com/' || item.url === 'https://aifreecalculator.com') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (
          item.url.includes('/construction/') ||
          item.url.includes('/finance/') ||
          item.url.includes('/health/') ||
          item.url.includes('/math/') ||
          item.url.includes('/general/')
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});