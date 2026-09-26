import { defineConfig } from 'astro/config';
import { execSync } from 'child_process';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aifreecalculator.com',

  adapter: cloudflare({
    imageService: 'passthrough',
  }),

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  redirects: {
    '/finance/sukanya-samriddhi-calculator': '/finance/sukanya-samriddhi-yojana-calculator',
    '/brickwork-calculator': '/construction/brickwork-calculator',
    '/finance/loan-calculator': '/finance/emi-calculator/?type=personal',
    '/tools': '/free-online-tools/',
    '/weight-calculator': '/general/weight-calculator/',
    '/age-calculator': '/general/age-calculator/',
  },

  cache: {
    provider: cacheCloudflare(),
  },

  vite: {
    plugins: [
      tailwindcss(),
      // Build-time git-info plugin: injects PUBLIC_GIT_* env vars
      (function gitInfoPlugin() {
        function readGitInfo() {
          try {
            const hash    = execSync('git rev-parse --short HEAD').toString().trim();
            const fullHash = execSync('git rev-parse HEAD').toString().trim();
            const message = execSync('git log -1 --pretty=%s').toString().trim();
            const author  = execSync('git log -1 --pretty=%an').toString().trim();
            const date    = execSync('git log -1 --pretty=%ai').toString().trim();
            return { hash, fullHash, message, author, date };
          } catch {
            return { hash: 'unknown', fullHash: 'unknown', message: 'unknown', author: 'unknown', date: new Date().toISOString() };
          }
        }
        const info = readGitInfo();
        return {
          name: 'vite-plugin-git-info',
          config() {
            return {
              define: {
                'import.meta.env.PUBLIC_GIT_COMMIT_HASH':    JSON.stringify(info.hash),
                'import.meta.env.PUBLIC_GIT_COMMIT_FULL':    JSON.stringify(info.fullHash),
                'import.meta.env.PUBLIC_GIT_COMMIT_MESSAGE': JSON.stringify(info.message),
                'import.meta.env.PUBLIC_GIT_COMMIT_AUTHOR':  JSON.stringify(info.author),
                'import.meta.env.PUBLIC_GIT_COMMIT_DATE':    JSON.stringify(info.date),
              },
            };
          },
        };
      }()),
      // Security shield plugin: blocks direct HTTP access to project root files, configs and secrets in dev server
      {
        name: 'vite-plugin-security-shield',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const rawUrl = req.url || '';
            const urlPath = rawUrl.split('?')[0].toLowerCase();
            if (
              urlPath.startsWith('/.') ||
              urlPath === '/package.json' ||
              urlPath === '/package-lock.json' ||
              urlPath === '/tsconfig.json' ||
              urlPath === '/astro.config.mjs' ||
              urlPath === '/wrangler.toml' ||
              urlPath.startsWith('/scratch/') ||
              urlPath.startsWith('/src/lib/') ||
              urlPath.startsWith('/src/pages/api/admin/') ||
              urlPath.startsWith('/src/data/') ||
              urlPath.endsWith('.env') ||
              urlPath.endsWith('.sql') ||
              urlPath.endsWith('.sqlite') ||
              urlPath.endsWith('.db') ||
              urlPath.endsWith('.bak') ||
              urlPath.endsWith('.backup') ||
              urlPath.endsWith('.log')
            ) {
              res.statusCode = 403;
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.setHeader('X-Content-Type-Options', 'nosniff');
              res.end('403 Forbidden: Direct access to this resource is prohibited.');
              return;
            }
            next();
          });
        },
      },
    ],
    server: {
      fs: {
        deny: [
          '.env',
          '.env.*',
          '.site-settings.json',
          'package.json',
          'package-lock.json',
          'tsconfig.json',
          'astro.config.mjs',
          'wrangler.toml',
          'scratch/**',
        ],
      },
      watch: {
        ignored: ['**/.wrangler/**', '**/.astro/**'],
      },
    },
    optimizeDeps: {
      include: ['astro/assets/services/noop', 'astro/app/manifest'],
      exclude: [
        '@astrojs/cloudflare',
        '@astrojs/cloudflare/cache',
        '@astrojs/cloudflare/cache/provider',
        '@astrojs/cloudflare/entrypoints/server',
        'constants',
        'node:constants',
      ],
    },
    ssr: {
      external: [
        '@astrojs/cloudflare',
        '@astrojs/cloudflare/cache',
        '@astrojs/cloudflare/cache/provider',
        '@astrojs/cloudflare/entrypoints/server',
        'constants',
        'node:constants',
      ],
      optimizeDeps: {
        exclude: [
          '@astrojs/cloudflare',
          '@astrojs/cloudflare/cache',
          '@astrojs/cloudflare/cache/provider',
          '@astrojs/cloudflare/entrypoints/server',
          'constants',
          'node:constants',
        ],
      },
    },
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/api') &&
        !page.includes('/sitemap') &&
        !page.includes('/404') &&
        !page.includes('/500') &&
        !page.includes('/brickwork-calculator'),
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
          item.url.includes('/general/') ||
          item.url.includes('/free-online-tools/')
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