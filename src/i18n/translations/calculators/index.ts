/**
 * Central Calculator Translations Registry
 * aifreecalculator.com
 */

import type { Locale } from '../../config';
import type { CalculatorTranslation } from '../../types';

import rawCalculators from '../../../data/calculators.json';

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
 * Gracefully falls back to raw calculator metadata if not yet translated.
 */
export function getCalculatorTranslation(slug: string, locale: Locale): CalculatorTranslation {
  const translations = ALL_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) {
    const rawCalc = (rawCalculators as any[]).find((c) => c.slug === slug);
    if (rawCalc) {
      return {
        locale,
        status: 'untranslated',
        name: rawCalc.name,
        metaTitle: `${rawCalc.name} - Free Online Tools`,
        metaDescription: rawCalc.description,
        h1: rawCalc.name,
        shortDescription: rawCalc.description,
        description: rawCalc.description,
        title: rawCalc.name,
        categoryLabel: rawCalc.category,
        formulaTitle: `${rawCalc.name} Overview`,
        formulaDescription: rawCalc.description,
        formulaEquation: '',
        variables: [],
        stepByStep: [],
        workedExample: {
          title: '',
          scenario: '',
          calculation: '',
          result: '',
        },
        faqs: [],
        ui: {
          calculate: 'Calculate',
          reset: 'Reset',
          result: 'Result',
          results: 'Results',
        },
      };
    }
    const fallbackTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      locale,
      status: 'untranslated',
      name: fallbackTitle,
      metaTitle: `${fallbackTitle} - Free Online Tools`,
      metaDescription: `Free online ${fallbackTitle} calculator tool.`,
      h1: fallbackTitle,
      shortDescription: `Free online ${fallbackTitle} calculator tool.`,
      description: `Free online ${fallbackTitle} calculator tool.`,
      title: fallbackTitle,
      categoryLabel: 'Calculators',
      formulaTitle: `${fallbackTitle} Overview`,
      formulaDescription: '',
      formulaEquation: '',
      variables: [],
      stepByStep: [],
      workedExample: {
        title: '',
        scenario: '',
        calculation: '',
        result: '',
      },
      faqs: [],
      ui: {
        calculate: 'Calculate',
        reset: 'Reset',
        result: 'Result',
        results: 'Results',
      },
    };
  }
  const translation = translations[locale];
  if (!translation) {
    if (translations['en']) return translations['en'];
    const anyLang = (Object.keys(translations) as Locale[])[0];
    if (anyLang && translations[anyLang]) return translations[anyLang];
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

