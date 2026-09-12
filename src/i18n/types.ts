/**
 * Type Definitions for Scalable Internationalization (i18n)
 * aifreecalculator.com
 */

import type { Locale } from './config';

export type TranslationStatus = 'translated' | 'draft' | 'untranslated';

export interface CalculatorFaq {
  question: string;
  answer: string;
}

export interface FormulaVariable {
  symbol: string;
  label: string;
  description: string;
  unit?: string;
}

export interface StepByStepInstruction {
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  calculation: string;
  result: string;
}

export interface CalculatorUiStrings {
  calculate?: string;
  reset?: string;
  result?: string;
  results?: string;
  inputs?: string;
  summary?: string;
  share?: string;
  copied?: string;
  print?: string;
  loading?: string;
  downloadPdf?: string;
  disclaimerNote?: string;
  [key: string]: any;
}

export interface CalculatorTranslation {
  locale: Locale;
  status: TranslationStatus;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  description?: string;
  title?: string;
  categoryLabel: string;
  formulaTitle: string;
  formulaDescription: string;
  formulaEquation: string;
  variables: FormulaVariable[];
  stepByStep: StepByStepInstruction[];
  workedExample: WorkedExample;
  faqs: CalculatorFaq[];
  ui: CalculatorUiStrings;
  additionalContentHtml?: string;
}

export interface CategoryTranslation {
  locale: Locale;
  status: TranslationStatus;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
  heroBadge: string;
}

export interface StaticPageTranslation {
  locale: Locale;
  status: TranslationStatus;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro?: string;
  sections?: Array<{ title: string; content: string }>;
  [key: string]: any;
}

export interface HreflangItem {
  lang: string;
  url: string;
}
