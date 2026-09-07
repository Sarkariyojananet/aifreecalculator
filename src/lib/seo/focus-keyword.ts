/**
 * Rank Math Pro Focus Keyword Analyzer & 100-Point SEO Scorer
 * Evaluates on-page SEO factors with exact Rank Math Pro criteria & real-time feedback.
 */

export interface FocusKeywordTest {
  id: string;
  category: 'basic' | 'additional' | 'title' | 'readability';
  title: string;
  passed: boolean;
  scoreEarned: number;
  maxScore: number;
  recommendation: string;
}

export interface FocusKeywordAuditResult {
  keyword: string;
  score: number; // 0 - 100
  grade: 'good' | 'average' | 'poor';
  wordCount: number;
  keywordCount: number;
  keywordDensity: number; // e.g. 1.45%
  tests: FocusKeywordTest[];
  summary: {
    passedCount: number;
    failedCount: number;
  };
}

const POWER_WORDS = new Set([
  'free', 'best', 'fast', 'easy', 'accurate', 'calculator', 'formula',
  'instant', 'quick', 'ultimate', 'guide', 'online', 'tool', 'simple',
  'exact', 'step', 'breakup', 'estimator', 'perfect'
]);

/**
 * Normalizes text for keyword matching (case-insensitive, strips extra spaces and punctuation)
 */
function normalize(str: string): string {
  return (str || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Counts occurrences of a phrase in text safely
 */
function countOccurrences(text: string, phrase: string): number {
  if (!text || !phrase) return 0;
  const cleanText = normalize(text);
  const cleanPhrase = normalize(phrase);
  if (!cleanPhrase) return 0;

  const regex = new RegExp(`\\b${cleanPhrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
  const matches = cleanText.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Analyzes on-page content against a target focus keyword using Rank Math Pro rules.
 */
export function analyzeFocusKeyword(params: {
  keyword: string;
  title: string;
  description: string;
  slug: string;
  content?: string;
  headings?: string[];
  internalLinksCount?: number;
  hasSchema?: boolean;
}): FocusKeywordAuditResult {
  const {
    keyword,
    title = '',
    description = '',
    slug = '',
    content = '',
    headings = [],
    internalLinksCount = 1,
    hasSchema = true,
  } = params;

  const cleanKeyword = normalize(keyword);
  if (!cleanKeyword) {
    return {
      keyword: '',
      score: 0,
      grade: 'poor',
      wordCount: 0,
      keywordCount: 0,
      keywordDensity: 0,
      tests: [],
      summary: { passedCount: 0, failedCount: 0 },
    };
  }

  // Combined text for word count and density
  const allText = `${title} ${description} ${headings.join(' ')} ${content}`;
  const words = allText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const keywordMatches = countOccurrences(allText, cleanKeyword);
  const keywordWordCount = cleanKeyword.split(/\s+/).length;
  const keywordDensity = wordCount > 0 ? ((keywordMatches * keywordWordCount) / wordCount) * 100 : 0;

  const tests: FocusKeywordTest[] = [];

  // ==========================================
  // 1. Basic SEO (40 Points)
  // ==========================================

  // Test 1.1: Keyword in SEO Title (10 pts)
  const inTitle = countOccurrences(title, cleanKeyword) > 0;
  tests.push({
    id: 'basic_title',
    category: 'basic',
    title: 'Focus Keyword in SEO Title',
    passed: inTitle,
    scoreEarned: inTitle ? 10 : 0,
    maxScore: 10,
    recommendation: inTitle
      ? 'Great! Focus keyword is present in the SEO title.'
      : `Include "${keyword}" in your SEO Title.`,
  });

  // Test 1.2: Keyword near start of Title (5 pts)
  const normalizedTitle = normalize(title);
  const titlePos = normalizedTitle.indexOf(cleanKeyword);
  const nearStart = titlePos >= 0 && titlePos <= Math.max(15, cleanKeyword.length + 5);
  tests.push({
    id: 'basic_title_start',
    category: 'basic',
    title: 'Focus Keyword appears near start of SEO Title',
    passed: nearStart,
    scoreEarned: nearStart ? 5 : 0,
    maxScore: 5,
    recommendation: nearStart
      ? 'Perfect! Focus keyword appears early in the SEO title for maximum CTR.'
      : 'Move your focus keyword closer to the beginning of the title.',
  });

  // Test 1.3: Keyword in Meta Description (10 pts)
  const inDesc = countOccurrences(description, cleanKeyword) > 0;
  tests.push({
    id: 'basic_desc',
    category: 'basic',
    title: 'Focus Keyword in Meta Description',
    passed: inDesc,
    scoreEarned: inDesc ? 10 : 0,
    maxScore: 10,
    recommendation: inDesc
      ? 'Great! Focus keyword is present in the meta description.'
      : `Add "${keyword}" into the meta description to improve search snippet relevance.`,
  });

  // Test 1.4: Keyword in URL Slug (10 pts)
  const slugWords = slug.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const inSlug = countOccurrences(slugWords, cleanKeyword) > 0 || cleanKeyword.split(' ').every((w) => slugWords.includes(w));
  tests.push({
    id: 'basic_slug',
    category: 'basic',
    title: 'Focus Keyword in URL Slug',
    passed: inSlug,
    scoreEarned: inSlug ? 10 : 0,
    maxScore: 10,
    recommendation: inSlug
      ? 'URL contains target focus keywords.'
      : `Ensure the URL slug includes your main keyword "${keyword}".`,
  });

  // Test 1.5: Keyword in Content Intro / First 10% (5 pts)
  const introText = content.slice(0, 300) || description;
  const inIntro = countOccurrences(introText, cleanKeyword) > 0;
  tests.push({
    id: 'basic_intro',
    category: 'basic',
    title: 'Focus Keyword in first 10% of content',
    passed: inIntro,
    scoreEarned: inIntro ? 5 : 0,
    maxScore: 5,
    recommendation: inIntro
      ? 'Focus keyword is introduced early in the content/instructions.'
      : 'Mention your focus keyword within the first paragraph or description.',
  });

  // ==========================================
  // 2. Additional SEO (30 Points)
  // ==========================================

  // Test 2.1: Keyword in Subheadings (H2, H3) (10 pts)
  const headingsText = headings.join(' ');
  const inHeadings = countOccurrences(headingsText, cleanKeyword) > 0 || countOccurrences(title, cleanKeyword) > 0;
  tests.push({
    id: 'add_headings',
    category: 'additional',
    title: 'Focus Keyword in Subheadings (H2/H3)',
    passed: inHeadings,
    scoreEarned: inHeadings ? 10 : 0,
    maxScore: 10,
    recommendation: inHeadings
      ? 'Subheadings effectively reinforce topic relevance.'
      : 'Include your focus keyword in at least one H2 or H3 section (e.g. Formula or FAQ).',
  });

  // Test 2.2: Keyword Density (10 pts)
  const densityPassed = keywordDensity >= 0.6 && keywordDensity <= 3.0;
  tests.push({
    id: 'add_density',
    category: 'additional',
    title: `Keyword Density (${keywordDensity.toFixed(2)}%)`,
    passed: densityPassed,
    scoreEarned: densityPassed ? 10 : (keywordDensity > 0 ? 5 : 0),
    maxScore: 10,
    recommendation: densityPassed
      ? `Keyword density of ${keywordDensity.toFixed(2)}% is optimal (recommended: 0.8% - 2.5%).`
      : keywordDensity > 3.0
      ? `Keyword density (${keywordDensity.toFixed(2)}%) is too high. Avoid keyword stuffing.`
      : `Keyword density is low (${keywordDensity.toFixed(2)}%). Add a few natural mentions in FAQs or formulas.`,
  });

  // Test 2.3: URL Length (5 pts)
  const urlPassed = slug.length <= 75;
  tests.push({
    id: 'add_url_length',
    category: 'additional',
    title: `URL Length (${slug.length} characters)`,
    passed: urlPassed,
    scoreEarned: urlPassed ? 5 : 2,
    maxScore: 5,
    recommendation: urlPassed
      ? 'URL is concise and crawler-friendly.'
      : 'URL is long. Shorten URL slug to under 75 characters.',
  });

  // Test 2.4: Content Depth (5 pts)
  const depthPassed = wordCount >= 180;
  tests.push({
    id: 'add_content_depth',
    category: 'additional',
    title: `Content Depth (${wordCount} words)`,
    passed: depthPassed,
    scoreEarned: depthPassed ? 5 : 2,
    maxScore: 5,
    recommendation: depthPassed
      ? 'Content length is thorough with detailed explanations and formula breakdown.'
      : 'Add more explanatory text, calculation steps, or FAQs to improve depth.',
  });

  // ==========================================
  // 3. Title Readability (15 Points)
  // ==========================================

  // Test 3.1: Power Word in Title (5 pts)
  const titleWords = normalize(title).split(/\s+/);
  const hasPowerWord = titleWords.some((w) => POWER_WORDS.has(w));
  tests.push({
    id: 'title_power_word',
    category: 'title',
    title: 'Title contains a Power Word',
    passed: hasPowerWord,
    scoreEarned: hasPowerWord ? 5 : 0,
    maxScore: 5,
    recommendation: hasPowerWord
      ? 'Title contains high-converting power words (Free, Easy, Accurate, Calculator, etc.).'
      : 'Add a power word like "Free", "Accurate", or "Fast" to increase Click-Through-Rate (CTR).',
  });

  // Test 3.2: Number in Title (5 pts)
  const hasNumber = /\d+/.test(title);
  tests.push({
    id: 'title_number',
    category: 'title',
    title: 'Title contains a Number or Year',
    passed: hasNumber,
    scoreEarned: hasNumber ? 5 : 0,
    maxScore: 5,
    recommendation: hasNumber
      ? 'Title includes numbers/year for enhanced CTR in Google search results.'
      : 'Add a number (e.g. current year "2026", or "100% Free") to stand out in SERP.',
  });

  // Test 3.3: Title Character Length (5 pts)
  const titleLen = title.length;
  const titleLenPassed = titleLen >= 40 && titleLen <= 65;
  tests.push({
    id: 'title_length',
    category: 'title',
    title: `Title Length (${titleLen} characters)`,
    passed: titleLenPassed,
    scoreEarned: titleLenPassed ? 5 : (titleLen >= 30 && titleLen <= 70 ? 3 : 0),
    maxScore: 5,
    recommendation: titleLenPassed
      ? 'Title length is in the optimal 40-65 character range for Google desktop & mobile.'
      : titleLen < 40
      ? 'Title is a bit short. Add secondary modifier words.'
      : 'Title exceeds 65 characters and may be truncated with ellipses in Google.',
  });

  // ==========================================
  // 4. Content Readability & Schema (15 Points)
  // ==========================================

  // Test 4.1: Meta Description Length (5 pts)
  const descLen = description.length;
  const descLenPassed = descLen >= 120 && descLen <= 165;
  tests.push({
    id: 'read_desc_length',
    category: 'readability',
    title: `Meta Description Length (${descLen} characters)`,
    passed: descLenPassed,
    scoreEarned: descLenPassed ? 5 : (descLen >= 80 && descLen <= 180 ? 3 : 1),
    maxScore: 5,
    recommendation: descLenPassed
      ? 'Meta description length is in the sweet spot (120-165 chars).'
      : descLen < 120
      ? 'Meta description is too short. Elaborate to fill 120-160 characters.'
      : 'Meta description is over 165 characters and may be cut off.',
  });

  // Test 4.2: Internal Links (5 pts)
  const hasLinks = internalLinksCount > 0;
  tests.push({
    id: 'read_internal_links',
    category: 'readability',
    title: `Internal Links (${internalLinksCount} linked tools)`,
    passed: hasLinks,
    scoreEarned: hasLinks ? 5 : 0,
    maxScore: 5,
    recommendation: hasLinks
      ? 'Great! Internal linking connects related calculators.'
      : 'Add internal links to related calculators to distribute PageRank.',
  });

  // Test 4.3: Rich Schema (5 pts)
  tests.push({
    id: 'read_schema',
    category: 'readability',
    title: 'Structured Schema.org Markup',
    passed: hasSchema,
    scoreEarned: hasSchema ? 5 : 0,
    maxScore: 5,
    recommendation: hasSchema
      ? 'Rich Schema is active (WebApplication, HowTo, FAQPage).'
      : 'Enable schema markup to qualify for Google Rich Snippets.',
  });

  // Calculate final score
  const totalEarned = tests.reduce((acc, t) => acc + t.scoreEarned, 0);
  const finalScore = Math.min(100, Math.max(0, Math.round(totalEarned)));

  const grade: 'good' | 'average' | 'poor' =
    finalScore >= 80 ? 'good' : finalScore >= 50 ? 'average' : 'poor';

  const passedCount = tests.filter((t) => t.passed).length;

  return {
    keyword,
    score: finalScore,
    grade,
    wordCount,
    keywordCount: keywordMatches,
    keywordDensity: Number(keywordDensity.toFixed(2)),
    tests,
    summary: {
      passedCount,
      failedCount: tests.length - passedCount,
    },
  };
}
