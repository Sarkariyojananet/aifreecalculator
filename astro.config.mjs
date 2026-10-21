import { defineConfig } from 'astro/config';
import { execSync } from 'child_process';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { cacheCloudflare } from '@astrojs/cloudflare/cache';

import sitemap from '@astrojs/sitemap';

// Redirect stubs are emitted as noindex meta-refresh pages, but @astrojs/sitemap
// still lists them. Every entry below is a verified redirect SOURCE, matched by
// its trailing `category/slug` pair so that all locale variants are covered with
// a single rule. The canonical DESTINATION of each redirect has a different
// category/slug pair (e.g. /math/percentage-calculator/ vs /general/percentage-
// calculator/), so it is never matched here and stays in the sitemap.
//
//   /general/percentage-calculator/       -> /math/percentage-calculator/
//   /general/date-difference-calculator/  -> /general/time-calculator/
//   /math/standard-deviation-calculator/  -> /math/scientific-calculator/
//   /free-online-tools/pdf-*|image-to-pdf -> /pdf-tools/...
//   /image-tools/image-*|jpg-*|png-*      -> /free-online-tools/...
const REDIRECT_SOURCE_KEYS = new Set([
  'general/percentage-calculator',
  'general/date-difference-calculator',
  'math/standard-deviation-calculator',
  'free-online-tools/pdf-merge',
  'free-online-tools/pdf-split',
  'free-online-tools/pdf-compress',
  'free-online-tools/pdf-to-image',
  'free-online-tools/image-to-pdf',
  'image-tools/image-compressor',
  'image-tools/image-resizer',
  'image-tools/jpg-to-png',
  'image-tools/png-to-jpg',
]);

export default defineConfig({
  site: 'https://aifreecalculator.com',

  adapter: cloudflare({
    imageService: 'passthrough',
  }),

  vite: {
    optimizeDeps: {
      exclude: ['astro:middleware'],
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  redirects: {
    // Date Difference Calculator redirects (consolidated into time-calculator)
    '/general/date-difference-calculator': '/general/time-calculator/',
    '/hi/general/date-difference-calculator': '/hi/general/time-calculator/',
    '/es/general/date-difference-calculator': '/es/general/time-calculator/',
    '/ja/general/date-difference-calculator': '/ja/general/time-calculator/',
    '/fr/general/date-difference-calculator': '/fr/general/time-calculator/',
    '/de/general/date-difference-calculator': '/de/general/time-calculator/',
    '/pt/general/date-difference-calculator': '/pt/general/time-calculator/',
    '/ko/general/date-difference-calculator': '/ko/general/time-calculator/',
    '/it/general/date-difference-calculator': '/it/general/time-calculator/',

    // Standard Deviation Calculator redirects (consolidated into scientific-calculator)
    '/math/standard-deviation-calculator': '/math/scientific-calculator/',
    '/hi/math/standard-deviation-calculator': '/hi/math/scientific-calculator/',
    '/es/math/standard-deviation-calculator': '/es/math/scientific-calculator/',
    '/ja/math/standard-deviation-calculator': '/ja/math/scientific-calculator/',
    '/fr/math/standard-deviation-calculator': '/fr/math/scientific-calculator/',
    '/de/math/standard-deviation-calculator': '/de/math/scientific-calculator/',
    '/pt/math/standard-deviation-calculator': '/pt/math/scientific-calculator/',
    '/ko/math/standard-deviation-calculator': '/ko/math/scientific-calculator/',
    '/it/math/standard-deviation-calculator': '/it/math/scientific-calculator/',

    // Percentage Calculator legacy category redirects
    '/general/percentage-calculator': '/math/percentage-calculator/',
    '/hi/general/percentage-calculator': '/hi/math/percentage-calculator/',
    '/es/general/percentage-calculator': '/es/math/percentage-calculator/',
    '/ja/general/percentage-calculator': '/ja/math/percentage-calculator/',
    '/fr/general/percentage-calculator': '/fr/math/percentage-calculator/',
    '/de/general/percentage-calculator': '/de/math/percentage-calculator/',
    '/pt/general/percentage-calculator': '/pt/math/percentage-calculator/',
    '/ko/general/percentage-calculator': '/ko/math/percentage-calculator/',
    '/it/general/percentage-calculator': '/it/math/percentage-calculator/',
    '/finance/sukanya-samriddhi-calculator': '/finance/sukanya-samriddhi-yojana-calculator',
    '/brickwork-calculator': '/construction/brickwork-calculator',
    '/finance/loan-calculator': '/finance/emi-calculator/?type=personal',
    '/tools': '/free-online-tools/',
    '/weight-calculator': '/general/weight-calculator/',
    '/age-calculator': '/general/age-calculator/',
    '/image-tools/compress-image': '/free-online-tools/image-compressor/',
    '/image-tools/image-compressor': '/free-online-tools/image-compressor/',
    '/image-tools/resize-image': '/free-online-tools/image-resizer/',
    '/image-tools/image-resizer': '/free-online-tools/image-resizer/',
    '/image-tools/jpg-to-png': '/free-online-tools/jpg-to-png/',
    '/image-tools/png-to-jpg': '/free-online-tools/png-to-jpg/',
    '/image-tools/qr-code-generator': '/free-online-tools/qr-code-generator/',
    '/free-online-tools/pdf-merge': '/pdf-tools/pdf-merge/',
    '/free-online-tools/pdf-split': '/pdf-tools/pdf-split/',
    '/free-online-tools/pdf-compress': '/pdf-tools/pdf-compress/',
    '/free-online-tools/pdf-to-image': '/pdf-tools/pdf-to-image/',
    '/free-online-tools/image-to-pdf': '/pdf-tools/image-to-pdf/',
    '/free-online-tools/monthly-time-table-maker': '/time-table-tools/monthly-time-table-maker/',
    // Phase 2A/2B: Consolidate Timetable Doorway Pages to Authoritative Canonical Tools
    '/time-table-tools/exam-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/student-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/school-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/college-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/university-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/class-timetable-generator': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/class-schedule-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/teacher-timetable-maker': '/time-table-tools/study-timetable-maker/',
    '/time-table-tools/kids-timetable-maker': '/time-table-tools/daily-timetable-maker/',
    '/time-table-tools/kids-daily-routine-planner': '/time-table-tools/daily-timetable-maker/',
    '/time-table-tools/boys-daily-routine-planner': '/time-table-tools/daily-timetable-maker/',
    '/time-table-tools/girls-daily-routine-planner': '/time-table-tools/daily-timetable-maker/',
    '/time-table-tools/personal-timetable-maker': '/time-table-tools/daily-timetable-maker/',
    '/time-table-tools/home-routine-planner': '/time-table-tools/weekly-timetable-maker/',
    '/time-table-tools/employee-work-timetable': '/time-table-tools/work-shift-schedule-maker/',
    '/time-table-tools/printable-timetable-maker': '/time-table-tools/timetable-maker/',
    '/time-table-tools/smart-timetable-generator': '/time-table-tools/timetable-maker/',
  },

  cache: {
    provider: cacheCloudflare(),
  },

  vite: {
    build: {
      target: 'es2022',
    },
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
        'astro:middleware',
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
          'astro:middleware',
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
        // Exclude only the top-level redirect source '/brickwork-calculator'
        // (a redirect stub), NOT its canonical destination
        // '/construction/brickwork-calculator/'.
        new URL(page).pathname.replace(/\/$/, '') !== '/brickwork-calculator' &&
        // Exclude every verified redirect-source path (and its locale variants)
        // by matching the trailing category/slug pair. Canonical destinations
        // are not in this set, so they remain in the sitemap.
        !REDIRECT_SOURCE_KEYS.has(
          new URL(page).pathname.replace(/\/$/, '').split('/').slice(-2).join('/')
        ) &&
        ![
          'exam-timetable-maker',
          'student-timetable-maker',
          'school-timetable-maker',
          'college-timetable-maker',
          'university-timetable-maker',
          'class-timetable-generator',
          'class-schedule-maker',
          'teacher-timetable-maker',
          'kids-timetable-maker',
          'kids-daily-routine-planner',
          'boys-daily-routine-planner',
          'girls-daily-routine-planner',
          'personal-timetable-maker',
          'home-routine-planner',
          'employee-work-timetable',
          'printable-timetable-maker',
          'smart-timetable-generator',
        ].some((slug) => page.includes(`/time-table-tools/${slug}`)),
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