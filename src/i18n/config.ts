/**
 * Central Internationalization (i18n) Configuration
 * aifreecalculator.com
 */

export const SUPPORTED_LOCALES = [
  'en',
  'hi',
  'es',
  'ja',
  'fr',
  'de',
  'pt',
  'ko',
  'it',
] as const;

export const LOCALES = SUPPORTED_LOCALES;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleConfig {
  code: Locale;
  label: string;
  name: string;
  nativeName: string;
  bcp47: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export const LOCALES_CONFIG: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    label: 'English',
    name: 'English',
    nativeName: 'English',
    bcp47: 'en-US',
    dir: 'ltr',
    flag: '🇺🇸',
  },
  hi: {
    code: 'hi',
    label: 'Hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    bcp47: 'hi-IN',
    dir: 'ltr',
    flag: '🇮🇳',
  },
  es: {
    code: 'es',
    label: 'Spanish',
    name: 'Spanish',
    nativeName: 'Español',
    bcp47: 'es-ES',
    dir: 'ltr',
    flag: '🇪🇸',
  },
  ja: {
    code: 'ja',
    label: 'Japanese',
    name: 'Japanese',
    nativeName: '日本語',
    bcp47: 'ja-JP',
    dir: 'ltr',
    flag: '🇯🇵',
  },
  fr: {
    code: 'fr',
    label: 'French',
    name: 'French',
    nativeName: 'Français',
    bcp47: 'fr-FR',
    dir: 'ltr',
    flag: '🇫🇷',
  },
  de: {
    code: 'de',
    label: 'German',
    name: 'German',
    nativeName: 'Deutsch',
    bcp47: 'de-DE',
    dir: 'ltr',
    flag: '🇩🇪',
  },
  pt: {
    code: 'pt',
    label: 'Portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    bcp47: 'pt-BR',
    dir: 'ltr',
    flag: '🇧🇷',
  },
  ko: {
    code: 'ko',
    label: 'Korean',
    name: 'Korean',
    nativeName: '한국어',
    bcp47: 'ko-KR',
    dir: 'ltr',
    flag: '🇰🇷',
  },
  it: {
    code: 'it',
    label: 'Italian',
    name: 'Italian',
    nativeName: 'Italiano',
    bcp47: 'it-IT',
    dir: 'ltr',
    flag: '🇮🇹',
  },
};

export const LOCALES_MAP = LOCALES_CONFIG;

export function isValidLocale(code: string): code is Locale {
  return SUPPORTED_LOCALES.includes(code as Locale);
}

export function getLocaleConfig(locale: string): LocaleConfig {
  if (isValidLocale(locale)) {
    return LOCALES_CONFIG[locale];
  }
  return LOCALES_CONFIG[DEFAULT_LOCALE];
}
