/**
 * i18n URL, Canonical, and Hreflang Utilities
 * aifreecalculator.com
 */

import { DEFAULT_LOCALE, isValidLocale, type Locale, LOCALES_CONFIG } from './config';
import type { HreflangItem } from './types';

export const SITE_ORIGIN = 'https://aifreecalculator.com';

/**
 * Normalizes a URL path ensuring leading slash and trailing slash (unless it's a file with extension).
 */
export function normalizePath(path: string): string {
  let clean = path.trim().replace(/\/+/g, '/');
  if (!clean.startsWith('/')) {
    clean = `/${clean}`;
  }
  if (!clean.endsWith('/') && !clean.includes('.')) {
    clean = `${clean}/`;
  }
  return clean;
}

/**
 * Extracts current locale and clean un-prefixed path from any URL or pathname.
 *
 * Example:
 *   '/hi/general/bmi-calculator/' => { locale: 'hi', cleanPath: '/general/bmi-calculator/' }
 *   '/general/bmi-calculator/'    => { locale: 'en', cleanPath: '/general/bmi-calculator/' }
 */
export function extractLocaleFromPath(pathname: string): { locale: Locale; lang: Locale; cleanPath: string } {
  const normalized = normalizePath(pathname);
  const segments = normalized.split('/').filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    const locale = segments[0] as Locale;
    const remainingSegments = segments.slice(1);
    const cleanPath = remainingSegments.length > 0 ? `/${remainingSegments.join('/')}/` : '/';
    return { locale, lang: locale, cleanPath };
  }

  return { locale: DEFAULT_LOCALE, lang: DEFAULT_LOCALE, cleanPath: normalized };
}

/**
 * Generates a localized path for a given locale.
 * Default locale ('en') NEVER has a language prefix.
 *
 * Examples:
 *   getLocalizedPath('/general/bmi-calculator/', 'en') => '/general/bmi-calculator/'
 *   getLocalizedPath('/general/bmi-calculator/', 'hi') => '/hi/general/bmi-calculator/'
 *   getLocalizedPath('/', 'es')                       => '/es/'
 *   getLocalizedPath('/', 'en')                       => '/'
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const { cleanPath } = extractLocaleFromPath(path);

  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath;
  }

  if (cleanPath === '/') {
    return `/${targetLocale}/`;
  }

  return `/${targetLocale}${cleanPath}`;
}

/**
 * Generates the fully-qualified self-referencing canonical URL.
 */
export function buildCanonicalUrl(pathname: string, origin: string = SITE_ORIGIN): string {
  const cleanOrigin = origin.replace(/\/$/, '');
  const normalizedPath = normalizePath(pathname);
  return `${cleanOrigin}${normalizedPath}`;
}

/**
 * Generates the complete reciprocal hreflang cluster for a given route.
 * IMPORTANT: ONLY includes languages that genuinely exist in availableLocales.
 * Points x-default to the default English URL.
 */
export function buildHreflangCluster(
  cleanPath: string,
  availableLocales: Locale[],
  origin: string = SITE_ORIGIN
): HreflangItem[] {
  const cleanOrigin = origin.replace(/\/$/, '');
  const items: HreflangItem[] = [];

  // 1. Add each genuinely available locale
  for (const loc of availableLocales) {
    const locPath = getLocalizedPath(cleanPath, loc);
    items.push({
      lang: loc,
      url: `${cleanOrigin}${locPath}`,
    });
  }

  // 2. Add x-default pointing to English / default version
  const defaultPath = getLocalizedPath(cleanPath, DEFAULT_LOCALE);
  items.push({
    lang: 'x-default',
    url: `${cleanOrigin}${defaultPath}`,
  });

  return items;
}

/**
 * Returns BCP-47 tag for HTML lang attribute (e.g., 'en-US', 'hi-IN').
 */
export function getBcp47Lang(locale: Locale): string {
  return LOCALES_CONFIG[locale]?.bcp47 || locale;
}
