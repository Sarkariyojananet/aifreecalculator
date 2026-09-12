/**
 * Central Calculator Translations Registry
 * aifreecalculator.com
 */

import type { Locale } from '../../config';
import type { CalculatorTranslation } from '../../types';
import { BMI_TRANSLATIONS } from './bmi';
import { EMI_TRANSLATIONS } from './emi';
import { AGE_TRANSLATIONS } from './age';
import { SIP_TRANSLATIONS } from './sip';
import { CALORIE_TRANSLATIONS } from './calorie';
import { RCC_SLAB_TRANSLATIONS } from './rcc-slab';

export const EXPLICIT_CALCULATOR_TRANSLATIONS: Record<string, Record<Locale, CalculatorTranslation>> = {
  'bmi-calculator': BMI_TRANSLATIONS,
  'emi-calculator': EMI_TRANSLATIONS,
  'age-calculator': AGE_TRANSLATIONS,
  'sip-calculator': SIP_TRANSLATIONS,
  'calorie-calculator': CALORIE_TRANSLATIONS,
  'rcc-slab-steel-calculator': RCC_SLAB_TRANSLATIONS,
};

/**
 * Returns translation for a calculator if available
 */
export function getCalculatorTranslation(slug: string, locale: Locale): CalculatorTranslation | null {
  const translations = EXPLICIT_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) return null;
  return translations[locale] || null;
}

/**
 * Checks if a calculator has full translation for a specific locale
 */
export function isCalculatorTranslated(slug: string, locale: Locale): boolean {
  if (locale === 'en') return true;
  const translation = getCalculatorTranslation(slug, locale);
  return translation !== null && translation.status === 'translated';
}

/**
 * Gets all translated locales for a given calculator slug
 */
export function getCalculatorAvailableLocales(slug: string): Locale[] {
  const translations = EXPLICIT_CALCULATOR_TRANSLATIONS[slug];
  if (!translations) return ['en'];
  
  const locales: Locale[] = ['en'];
  for (const [lang, trans] of Object.entries(translations)) {
    if (lang !== 'en' && trans.status === 'translated') {
      locales.push(lang as Locale);
    }
  }
  return locales;
}
