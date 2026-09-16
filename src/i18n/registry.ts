/**
 * Central Translation Registry & Route Resolution
 * aifreecalculator.com
 */

import { LOCALES, DEFAULT_LOCALE, type Locale } from './config';
import { extractLocaleFromPath, normalizePath } from './utils';
import { CATEGORY_TRANSLATIONS } from './translations/categories';
import { STATIC_PAGES_TRANSLATIONS } from './translations/static-pages';
import {
  isCalculatorTranslated,
  getCalculatorAvailableLocales,
  getCalculatorTranslation,
  EXPLICIT_CALCULATOR_TRANSLATIONS,
} from './translations/calculators';

export {
  isCalculatorTranslated,
  getCalculatorAvailableLocales,
  getCalculatorTranslation,
  EXPLICIT_CALCULATOR_TRANSLATIONS,
};
import { calculators } from '../data/calculators';

const STATIC_SLUGS = [
  'about',
  'contact',
  'privacy-policy',
  'terms',
  'disclaimer',
  'all-calculators',
] as const;

const CATEGORY_SLUGS = [
  'finance',
  'construction',
  'health',
  'math',
  'general',
  'free-online-tools',
] as const;

const STATIC_SLUG_PATHS = new Set(STATIC_SLUGS.map((s) => `/${s}/`));
const CATEGORY_SLUG_PATHS = new Set(CATEGORY_SLUGS.map((s) => `/${s}/`));
const CATEGORY_SLUGS_SET = new Set<string>(CATEGORY_SLUGS);
const ALL_LOCALES_ARRAY: Locale[] = [...LOCALES];
const EN_ONLY_ARRAY: Locale[] = ['en'];

/**
 * Returns list of locales where a given path is officially translated.
 * Guarantees 'en' is always included.
 */
export function getAvailableLocalesForPath(pathname: string): Locale[] {
  const norm = normalizePath(pathname);
  const { cleanPath } = extractLocaleFromPath(norm);

  // 1. Homepage
  if (cleanPath === '/') {
    return ALL_LOCALES_ARRAY;
  }

  // 2. Static Content Pages
  if (STATIC_SLUG_PATHS.has(cleanPath)) {
    return ALL_LOCALES_ARRAY;
  }

  // 3. Category Landing Pages
  if (CATEGORY_SLUG_PATHS.has(cleanPath)) {
    return ALL_LOCALES_ARRAY;
  }

  // 4. Calculator Pages (/category/slug/)
  const slash1 = cleanPath.indexOf('/', 1);
  if (slash1 !== -1) {
    const slash2 = cleanPath.indexOf('/', slash1 + 1);
    if (slash2 !== -1 && slash2 === cleanPath.length - 1) {
      const cat = cleanPath.slice(1, slash1);
      if (CATEGORY_SLUGS_SET.has(cat)) {
        return ALL_LOCALES_ARRAY;
      }
    }
  }

  // Fallback (e.g. dynamic admin, api, or untranslated custom routes)
  return EN_ONLY_ARRAY;
}

/**
 * Checks if a specific route is translated for a given locale
 */
export function isPageTranslated(pathname: string, targetLocale: Locale): boolean {
  if (targetLocale === 'en') return true;
  const available = getAvailableLocalesForPath(pathname);
  return available.includes(targetLocale);
}

/**
 * Returns static paths data for calculator pages in [lang]/[category]/[slug].astro
 */
export function getTranslatedCalculatorStaticPaths() {
  const nonEnLocales = LOCALES.filter((l): l is Exclude<Locale, 'en'> => l !== 'en');
  const paths: Array<{
    params: { lang: string; category: string; slug: string };
    props: {
      lang: Locale;
      category: string;
      slug: string;
      calculator: (typeof calculators)[0];
      translation: NonNullable<ReturnType<typeof getCalculatorTranslation>>;
    };
  }> = [];

  for (const calc of calculators) {
    const catSlug = calc.category.toLowerCase().replace(/\s+/g, '-');
    for (const lang of nonEnLocales) {
      if (isCalculatorTranslated(calc.slug, lang)) {
        const translation = getCalculatorTranslation(calc.slug, lang);
        if (translation) {
          paths.push({
            params: {
              lang,
              category: catSlug,
              slug: calc.slug,
            },
            props: {
              lang,
              category: catSlug,
              slug: calc.slug,
              calculator: calc,
              translation,
            },
          });
        }
      }
    }
  }

  return paths;
}

/**
 * Returns static paths data for category pages in [lang]/[category]/index.astro
 */
export function getTranslatedCategoryStaticPaths() {
  const nonEnLocales = LOCALES.filter((l): l is Exclude<Locale, 'en'> => l !== 'en');
  const paths: Array<{
    params: { lang: string; category: string };
    props: {
      lang: Locale;
      category: string;
      categoryData: (typeof CATEGORY_TRANSLATIONS)['general'][Locale];
    };
  }> = [];

  for (const catSlug of CATEGORY_SLUGS) {
    for (const lang of nonEnLocales) {
      const catData = CATEGORY_TRANSLATIONS[catSlug]?.[lang];
      if (catData && catData.status === 'translated') {
        paths.push({
          params: {
            lang,
            category: catSlug,
          },
          props: {
            lang,
            category: catSlug,
            categoryData: catData,
          },
        });
      }
    }
  }

  return paths;
}

/**
 * Returns static paths data for homepage in [lang]/index.astro
 */
export function getTranslatedHomeStaticPaths() {
  return LOCALES.filter((l) => l !== 'en').map((lang) => ({
    params: { lang },
    props: { lang },
  }));
}

/**
 * Returns static paths data for static content pages in [lang]/[page].astro
 */
export function getTranslatedStaticPagePaths(pageKey: keyof typeof STATIC_PAGES_TRANSLATIONS) {
  return LOCALES.filter((l) => l !== 'en').map((lang) => ({
    params: { lang },
    props: {
      lang,
      pageData: STATIC_PAGES_TRANSLATIONS[pageKey][lang],
    },
  }));
}
