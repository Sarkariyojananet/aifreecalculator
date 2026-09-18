import type { Locale } from '../../../i18n/config';
import type { UnitConverterContent } from './types';
import { enContent } from './en';
import { hiContent } from './hi';
import { esContent } from './es';
import { jaContent } from './ja';
import { frContent } from './fr';
import { deContent } from './de';
import { ptContent } from './pt';
import { koContent } from './ko';
import { itContent } from './it';

export const UNIT_CONVERTER_CONTENT: Record<Locale, UnitConverterContent> = {
  en: enContent,
  hi: hiContent,
  es: esContent,
  ja: jaContent,
  fr: frContent,
  de: deContent,
  pt: ptContent,
  ko: koContent,
  it: itContent,
};

export function getUnitConverterContent(locale: Locale): UnitConverterContent {
  return UNIT_CONVERTER_CONTENT[locale] || enContent;
}

export * from './types';
