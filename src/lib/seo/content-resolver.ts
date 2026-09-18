/**
 * Safe Localized SEO Content Resolver
 * aifreecalculator.com
 *
 * Determines whether genuine, substantive localized educational/SEO content
 * and FAQs exist for a given calculator and locale.
 *
 * If localized content does NOT exist or is only a placeholder/stub,
 * this engine ensures the page safely and reliably falls back to the
 * original, authored English SEO content and FAQs.
 */

import type { CalculatorTranslation } from '../../i18n/types';

export interface MetadataResolutionParams {
  title: string;
  description: string;
  calculatorName: string;
  slug: string;
  lang: string;
  translation?: CalculatorTranslation | null;
  cmsOverride?: {
    metaTitle?: string;
    metaDescription?: string;
    description?: string;
    name?: string;
    h1?: string;
  };
}

export interface EffectiveMetadata {
  name: string;
  title: string;
  description: string;
  h1: string;
}

/**
 * Checks whether a translation object contains genuine, substantive
 * localized educational/SEO content beyond a generic 1-sentence metadata stub.
 */
export function hasLocalizedSeoContent(
  translation: CalculatorTranslation | null | undefined
): boolean {
  if (!translation) return false;
  if (translation.locale === 'en') return true;
  if (translation.status !== 'translated') return false;

  // Check for rich localized contentHtml
  if (typeof translation.contentHtml === 'string' && translation.contentHtml.trim().length > 0) {
    return true;
  }

  // 1. Check for structured step-by-step instructions
  if (Array.isArray(translation.stepByStep) && translation.stepByStep.length > 0) {
    return true;
  }

  // 2. Check for formula variables breakdown
  if (Array.isArray(translation.variables) && translation.variables.length > 0) {
    return true;
  }

  // 3. Check for mathematical formula equation
  if (typeof translation.formulaEquation === 'string' && translation.formulaEquation.trim().length > 0) {
    return true;
  }

  // 4. Check for worked calculation example
  if (
    translation.workedExample &&
    (Boolean(translation.workedExample.calculation?.trim()) ||
      Boolean(translation.workedExample.scenario?.trim()) ||
      Boolean(translation.workedExample.result?.trim()))
  ) {
    return true;
  }

  // 5. Check if formulaDescription is a detailed custom explanation
  // (not just repeating shortDescription or generic overview stub)
  const desc = translation.formulaDescription?.trim();
  const shortDesc = (translation.shortDescription || translation.description || '').trim();
  if (
    desc &&
    desc.length > 80 &&
    desc !== shortDesc &&
    !desc.endsWith('Overview')
  ) {
    return true;
  }

  return false;
}

/**
 * Checks whether a translation object contains genuine, non-empty localized FAQs.
 */
export function hasLocalizedFaqContent(
  translation: CalculatorTranslation | null | undefined
): boolean {
  if (!translation) return false;
  if (translation.locale === 'en') return false; // For English, layout uses slot="faq"
  if (translation.status !== 'translated') return false;

  if (Array.isArray(translation.faqs) && translation.faqs.length > 0) {
    // Ensure at least one FAQ has a non-empty question and answer
    return translation.faqs.some(
      (f) => typeof f.question === 'string' && f.question.trim().length > 0 &&
             typeof f.answer === 'string' && f.answer.trim().length > 0
    );
  }

  return false;
}

/**
 * Resolves safe page metadata (title, description, H1, name) ensuring
 * that translated metadata is used if present and non-empty, and otherwise
 * safely falls back to the original English props.
 *
 * NEVER returns empty string, null, or undefined.
 */
export function resolveEffectiveMetadata(params: MetadataResolutionParams): EffectiveMetadata {
  const { title, description, calculatorName, lang, translation, cmsOverride } = params;

  const isNonEn = lang !== 'en';
  const hasTrans = Boolean(translation && translation.status === 'translated');

  // Name resolution
  const transName = hasTrans ? translation?.name?.trim() : '';
  const effectiveName =
    cmsOverride?.name?.trim() ||
    (isNonEn && transName ? transName : '') ||
    calculatorName.trim() ||
    'Online Calculator';

  // Title resolution
  const transMetaTitle = hasTrans ? translation?.metaTitle?.trim() : '';
  const effectiveTitle =
    cmsOverride?.metaTitle?.trim() ||
    (isNonEn && transMetaTitle ? transMetaTitle : '') ||
    title.trim() ||
    `${effectiveName} - Free Online Tools`;

  // Description resolution
  const transMetaDesc = hasTrans
    ? (translation?.metaDescription?.trim() || translation?.description?.trim() || '')
    : '';
  const fallbackEnglishDesc = cmsOverride?.description?.trim() || description.trim();
  const effectiveDescription =
    cmsOverride?.metaDescription?.trim() ||
    (isNonEn && transMetaDesc ? transMetaDesc : '') ||
    fallbackEnglishDesc ||
    `Use our free ${effectiveName} online. Fast, accurate, and completely free in your browser.`;

  // H1 resolution
  const transH1 = hasTrans ? translation?.h1?.trim() : '';
  const effectiveH1 =
    cmsOverride?.h1?.trim() ||
    (isNonEn && transH1 ? transH1 : '') ||
    effectiveName;

  return {
    name: effectiveName,
    title: effectiveTitle,
    description: effectiveDescription,
    h1: effectiveH1,
  };
}
