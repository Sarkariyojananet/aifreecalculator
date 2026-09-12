/**
 * Central Calculator Translations Registry
 * aifreecalculator.com
 */

import type { Locale } from '../../config';
import type { CalculatorTranslation } from '../../types';

// Eagerly import all calculator translation JSON files
const dataModules = import.meta.glob<Record<Locale, CalculatorTranslation>>(
  './data/*.json',
  { eager: true, import: 'default' }
);

export const ALL_CALCULATOR_TRANSLATIONS: Record<string, Record<Locale, CalculatorTranslation>> = {};

for (const [filePath, mod] of Object.entries(dataModules)) {
  const match = filePath.match(/\/([^/]+)\.json$/);
  if (match) {
    const slug = match[1];
    ALL_CALCULATOR_TRANSLATIONS[slug] = mod;
  }
}

export const EXPLICIT_CALCULATOR_TRANSLATIONS = ALL_CALCULATOR_TRANSLATIONS;

/**
 * Returns strictly localized translation for a calculator.
 * Throws an error if translation is missing (no silent English fallback).
 */
export function getCalculatorTranslation(slug: string, locale: Locale): CalculatorTranslation {
  const translations = ALL_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) {
    throw new Error(`[i18n] Calculator not found in translation registry: "${slug}"`);
  }
  const translation = translations[locale];
  if (!translation) {
    throw new Error(`[i18n] Missing required translation for calculator "${slug}" in locale "${locale}"`);
  }
  return translation;
}

/**
 * Checks if a calculator has full translation for a specific locale
 */
export function isCalculatorTranslated(slug: string, locale: Locale): boolean {
  const translations = ALL_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) return false;
  const translation = translations[locale];
  return Boolean(translation && translation.status === 'translated');
}

/**
 * Gets all translated locales for a given calculator slug
 */
export function getCalculatorAvailableLocales(slug: string): Locale[] {
  const translations = ALL_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) return ['en'];
  return Object.keys(translations) as Locale[];
}

