import { getReviewerForCategory } from '../../data/editorial-team';

/**
 * Advanced Multi-Schema Graph Generator (Rank Math Pro Standard)
 * Generates valid, interconnected JSON-LD @graph schemas for Google Rich Snippets:
 * WebApplication + BreadcrumbList + FAQPage + HowTo + MathSolver
 */

export interface SchemaFAQ {
  question: string;
  answer: string;
}

export interface SchemaStep {
  name: string;
  text: string;
}

export interface CalculatorSchemaParams {
  name: string;
  description: string;
  url: string;
  category: string;
  siteUrl?: string;
  siteName?: string;
  faqs?: SchemaFAQ[];
  steps?: SchemaStep[];
  lang?: string;
  homeName?: string;
  categoryName?: string;
  categoryUrl?: string;
}

const DEFAULT_SITE_URL = 'https://aifreecalculator.com';
const DEFAULT_SITE_NAME = 'AI Free Calculator';

/**
 * Builds a complete Schema.org @graph JSON-LD structure
 */
export function buildCalculatorGraphSchema(params: CalculatorSchemaParams): Record<string, any> {
  const {
    name,
    description,
    url,
    category,
    siteUrl = DEFAULT_SITE_URL,
    siteName = DEFAULT_SITE_NAME,
    faqs = [],
    steps = [],
    lang = 'en-US',
    homeName = 'Home',
    categoryName,
    categoryUrl: customCategoryUrl,
  } = params;

  const cleanCategory = (category || 'General').trim();
  const categorySlug = cleanCategory.toLowerCase().replace(/\s+/g, '-');
  const categoryUrl = customCategoryUrl || `${siteUrl}/${categorySlug}/`;
  const reviewer = getReviewerForCategory(cleanCategory);

  // 1. WebApplication Schema
  const webAppSchema: Record<string, any> = {
    '@type': 'WebApplication',
    '@id': `${url}#webapp`,
    name,
    url,
    description,
    applicationCategory: `${cleanCategory}Application`,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    inLanguage: lang,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: 'Instant Calculation, Formula Breakdown, Free Online Tool, Responsive UI',
    creator: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    author: {
      '@type': 'Person',
      name: reviewer.name,
      jobTitle: reviewer.title,
    },
    reviewedBy: {
      '@type': 'Person',
      name: reviewer.name,
      jobTitle: reviewer.title,
    },
  };

  // 2. BreadcrumbList Schema
  const homeUrl = lang && !lang.startsWith('en') ? `${siteUrl}/${lang.split('-')[0]}/` : siteUrl;
  const breadcrumbSchema: Record<string, any> = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName || `${cleanCategory} Calculators`,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: url,
      },
    ],
  };

  // 3. Expert Reviewer Person Schema (E-E-A-T)
  const reviewerSchema: Record<string, any> = {
    '@type': 'Person',
    '@id': `${siteUrl}/about/#${reviewer.id}`,
    name: reviewer.name,
    jobTitle: reviewer.title,
    description: reviewer.role,
    knowsAbout: reviewer.verifiedStandards,
  };

  const graph: any[] = [webAppSchema, breadcrumbSchema, reviewerSchema];

  // 3. HowTo Schema (How to use this calculator)
  // The generic fallback steps describe a numeric-calculator workflow
  // ("enter parameters -> calculate -> download PDF"). That workflow does not
  // apply to interactive tool categories (timetable, image, PDF, compiler,
  // and browser utilities), so HowTo is emitted only when real steps are
  // supplied, or when the category is an actual calculator category.
  const HOWTO_EXCLUDED_CATEGORIES = new Set([
    'time-table-tools',
    'image-tools',
    'pdf-tools',
    'compiler-tools',
    'free-online-tools',
  ]);
  const shouldEmitHowTo =
    steps.length > 0 || !HOWTO_EXCLUDED_CATEGORIES.has(categorySlug);

  if (shouldEmitHowTo) {
    const defaultSteps: SchemaStep[] = steps.length > 0 ? steps : [
      {
        name: 'Enter Parameters',
        text: `Enter the required inputs and select your preferred units in the ${name}.`,
      },
      {
        name: 'Calculate & Review Formula',
        text: 'View the instant accurate calculation breakdown, formulas, and visual summary.',
      },
      {
        name: 'Export or Copy Results',
        text: 'Review the calculated result and copy or export it using the options shown on the page.',
      },
    ];

    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to use the ${name}`,
      description: `Step-by-step instructions on calculating ${name} values online.`,
      totalTime: 'PT1M',
      step: defaultSteps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.name,
        itemListElement: {
          '@type': 'HowToDirection',
          text: s.text,
        },
      })),
    });
  }

  // 4. FAQPage Schema (if FAQs are available)
  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
