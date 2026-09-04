/**
 * Centralized Content & Settings Store for Admin CMS
 * Handles Calculator Overrides, FAQs, Redirects, Homepage Sections, Feature Flags, and Search Analytics.
 * Persists to Cloudflare D1 / site_settings with fallback to local development storage.
 */

import { getDb, type D1Database } from '../db';
import { calculators, categories } from '../../data/calculators';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  calculatorSlug?: string;
  category?: string;
  sortOrder: number;
}

export interface CategoryItem {
  name: string;
  icon: string;
  description: string;
  path: string;
  slug?: string;
  custom?: boolean;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  statusCode: 301 | 302;
  active: boolean;
  createdAt: string;
  hits?: number;
}

export interface HomepageSection {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  sortOrder: number;
  featuredSlugs?: string[];
}

export interface FeatureFlags {
  enablePdfDownload: boolean;
  enableShareCalculation: boolean;
  enableRecentlyUsed: boolean;
  enableUserFeedback: boolean;
  enableDarkModeToggle: boolean;
  enableAdSenseAutoAds: boolean;
  enableSearchAnalytics: boolean;
}

export interface SearchQueryLog {
  query: string;
  count: number;
  hasResults: boolean;
  lastSearched: string;
}

const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enablePdfDownload: true,
  enableShareCalculation: true,
  enableRecentlyUsed: true,
  enableUserFeedback: true,
  enableDarkModeToggle: true,
  enableAdSenseAutoAds: false,
  enableSearchAnalytics: true,
};

const DEFAULT_HOMEPAGE_SECTIONS: HomepageSection[] = [
  {
    id: 'hero',
    title: 'Precision Calculation Engines',
    description: 'Instant, private, client-side calculation tools for finance, civil engineering, health, and math.',
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'featured',
    title: 'Popular & Trending Tools',
    description: 'Most frequently utilized calculators with verified mathematical formulas.',
    enabled: true,
    sortOrder: 2,
    featuredSlugs: ['bmi-calculator', 'age-calculator', 'rcc-slab-steel', 'emi-calculator', 'sip-calculator', 'percentage-calculator'],
  },
  {
    id: 'categories',
    title: 'Browse By Specialized Category',
    description: 'Explore 5 core calculation suites curated for engineers, investors, students, and professionals.',
    enabled: true,
    sortOrder: 3,
  },
  {
    id: 'directory',
    title: 'All Calculators Directory',
    description: 'Complete directory of all 42+ verified calculation tools.',
    enabled: true,
    sortOrder: 4,
  },
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are all calculators completely free to use?',
    answer: 'Yes, 100%. Every single calculator on AI Free Calculator is free with unlimited usage, zero subscriptions, and no registration requirements.',
    category: 'General',
    sortOrder: 1,
  },
  {
    id: 'faq-2',
    question: 'Is my personal financial or health data saved on your servers?',
    answer: 'No. All calculations run strictly in your web browser via client-side JavaScript. We do not record, store, or transmit your individual numerical inputs to any server or database.',
    category: 'General',
    sortOrder: 2,
  },
  {
    id: 'faq-3',
    question: 'How accurate are the construction and civil engineering estimates?',
    answer: 'Our construction tools follow standard building codes (IS 456, standard density coefficients like steel 7850 kg/m³, dry volume multiplier 1.54). However, for binding structural work, formal sign-off from a licensed structural engineer is always recommended.',
    category: 'Construction',
    sortOrder: 3,
  },
  {
    id: 'faq-4',
    question: 'How do I download or export my calculation results?',
    answer: 'Supported tools (such as RCC Slab Steel, EMI, and Calorie calculators) include a 1-click "Download PDF Report" button to export formatted calculation sheets.',
    category: 'Finance',
    sortOrder: 4,
  },
];

const DEFAULT_NO_RESULT_SEARCHES: SearchQueryLog[] = [
  { query: 'paint calculator', count: 142, hasResults: true, lastSearched: new Date().toISOString() },
  { query: 'tile calculator', count: 98, hasResults: false, lastSearched: new Date().toISOString() },
  { query: 'road bitumen estimator', count: 71, hasResults: false, lastSearched: new Date().toISOString() },
  { query: 'gst reverse calculator', count: 65, hasResults: true, lastSearched: new Date().toISOString() },
  { query: 'cryptocurrency roi', count: 48, hasResults: false, lastSearched: new Date().toISOString() },
  { query: 'water tank capacity', count: 42, hasResults: false, lastSearched: new Date().toISOString() },
];

async function readSetting<T>(key: string, defaultValue: T, locals?: any): Promise<T> {
  const db = getDb(locals);
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind(key).first<{ value: string }>();
    if (row?.value) {
      return JSON.parse(row.value) as T;
    }
  } catch {}
  return defaultValue;
}

async function writeSetting<T>(key: string, value: T, locals?: any): Promise<void> {
  const db = getDb(locals);
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(key, JSON.stringify(value))
      .run();
  } catch {}
}

export async function getFeatureFlags(locals?: any): Promise<FeatureFlags> {
  return await readSetting<FeatureFlags>('cms_feature_flags', DEFAULT_FEATURE_FLAGS, locals);
}

export async function saveFeatureFlags(flags: FeatureFlags, locals?: any): Promise<void> {
  await writeSetting('cms_feature_flags', flags, locals);
}

export async function getHomepageSections(locals?: any): Promise<HomepageSection[]> {
  return await readSetting<HomepageSection[]>('cms_homepage_sections', DEFAULT_HOMEPAGE_SECTIONS, locals);
}

export async function saveHomepageSections(sections: HomepageSection[], locals?: any): Promise<void> {
  await writeSetting('cms_homepage_sections', sections, locals);
}

export async function getCMSCategories(locals?: any): Promise<CategoryItem[]> {
  const defaultCats: CategoryItem[] = categories.map((c) => ({
    name: c.name,
    icon: c.icon,
    description: c.description,
    path: c.path,
    slug: c.name.toLowerCase(),
  }));
  return await readSetting<CategoryItem[]>('cms_categories', defaultCats, locals);
}

export async function saveCMSCategories(cats: CategoryItem[], locals?: any): Promise<void> {
  await writeSetting('cms_categories', cats, locals);
}

export async function deleteCMSCategory(categoryName: string, locals?: any): Promise<{ success: boolean; error?: string; categories: CategoryItem[] }> {
  // Safety check: Cannot delete category if calculators are currently assigned
  const attachedCount = calculators.filter((c) => c.category.toLowerCase() === categoryName.toLowerCase()).length;
  if (attachedCount > 0) {
    const current = await getCMSCategories(locals);
    return {
      success: false,
      error: `Safety check failed: Category "${categoryName}" has ${attachedCount} active calculators assigned. Reassign or delete them first before deleting this category.`,
      categories: current,
    };
  }

  const current = await getCMSCategories(locals);
  const filtered = current.filter((c) => c.name.toLowerCase() !== categoryName.toLowerCase());
  await saveCMSCategories(filtered, locals);
  return { success: true, categories: filtered };
}

export async function getFAQs(locals?: any): Promise<FAQItem[]> {
  return await readSetting<FAQItem[]>('cms_faqs', DEFAULT_FAQS, locals);
}

export async function saveFAQs(faqs: FAQItem[], locals?: any): Promise<void> {
  await writeSetting('cms_faqs', faqs, locals);
}

export async function saveSingleFAQ(faq: FAQItem, locals?: any): Promise<FAQItem[]> {
  const current = await getFAQs(locals);
  const idx = current.findIndex((f) => f.id === faq.id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...faq };
  } else {
    current.push(faq);
  }
  // Sort by sortOrder
  current.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  await saveFAQs(current, locals);
  return current;
}

export async function deleteFAQ(id: string, locals?: any): Promise<FAQItem[]> {
  const current = await getFAQs(locals);
  const filtered = current.filter((f) => f.id !== id);
  await saveFAQs(filtered, locals);
  return filtered;
}

export async function getRedirectRules(locals?: any): Promise<RedirectRule[]> {
  return await readSetting<RedirectRule[]>('cms_redirects', [], locals);
}

export async function saveRedirectRules(rules: RedirectRule[], locals?: any): Promise<void> {
  await writeSetting('cms_redirects', rules, locals);
}

export function validateRedirectRule(
  rule: { id?: string; source: string; destination: string; statusCode?: number },
  existingRules: RedirectRule[]
): { valid: boolean; error?: string } {
  let source = (rule.source || '').trim();
  let destination = (rule.destination || '').trim();

  if (!source || !destination) {
    return { valid: false, error: 'Both Source path and Destination path are required.' };
  }

  // Ensure source starts with /
  if (!source.startsWith('/')) {
    source = '/' + source;
  }
  if (!destination.startsWith('/') && !destination.startsWith('http://') && !destination.startsWith('https://')) {
    destination = '/' + destination;
  }

  // Prevent self-redirect
  if (source.toLowerCase() === destination.toLowerCase()) {
    return { valid: false, error: 'Self-redirect loop detected: Source and Destination cannot be identical.' };
  }

  // Check duplicate source rule
  const duplicate = existingRules.find(
    (r) => r.id !== rule.id && r.source.toLowerCase() === source.toLowerCase() && r.active !== false
  );
  if (duplicate) {
    return { valid: false, error: `A redirect rule for source "${source}" already exists.` };
  }

  // Check 2-hop redirect loop (A -> B and B -> A)
  const circular = existingRules.find(
    (r) =>
      r.id !== rule.id &&
      r.active !== false &&
      r.source.toLowerCase() === destination.toLowerCase() &&
      r.destination.toLowerCase() === source.toLowerCase()
  );
  if (circular) {
    return {
      valid: false,
      error: `Circular redirect loop detected: Existing rule already redirects "${destination}" back to "${source}".`,
    };
  }

  return { valid: true };
}

export async function addOrUpdateRedirectRule(
  rule: RedirectRule,
  locals?: any
): Promise<{ success: boolean; error?: string; rules: RedirectRule[] }> {
  const current = await getRedirectRules(locals);
  const validation = validateRedirectRule(rule, current);
  if (!validation.valid) {
    return { success: false, error: validation.error, rules: current };
  }

  const idx = current.findIndex((r) => r.id === rule.id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...rule };
  } else {
    current.unshift(rule);
  }
  await saveRedirectRules(current, locals);
  return { success: true, rules: current };
}

export async function deleteRedirectRule(id: string, locals?: any): Promise<RedirectRule[]> {
  const current = await getRedirectRules(locals);
  const filtered = current.filter((r) => r.id !== id);
  await saveRedirectRules(filtered, locals);
  return filtered;
}

export async function getSearchAnalytics(locals?: any): Promise<SearchQueryLog[]> {
  return await readSetting<SearchQueryLog[]>('cms_search_analytics', DEFAULT_NO_RESULT_SEARCHES, locals);
}

export async function recordSearchQuery(query: string, hasResults: boolean, locals?: any): Promise<void> {
  const normalized = query.trim().toLowerCase();
  if (!normalized || normalized.length < 2) return;
  const current = await getSearchAnalytics(locals);
  const existing = current.find((s) => s.query.toLowerCase() === normalized);
  if (existing) {
    existing.count++;
    existing.lastSearched = new Date().toISOString();
    existing.hasResults = hasResults;
  } else {
    current.unshift({
      query: normalized,
      count: 1,
      hasResults,
      lastSearched: new Date().toISOString(),
    });
  }
  await writeSetting('cms_search_analytics', current.slice(0, 100), locals);
}

export async function getCalculatorOverrides(locals?: any): Promise<Record<string, any>> {
  return await readSetting<Record<string, any>>('cms_calculator_overrides', {}, locals);
}

export async function saveCalculatorOverride(slug: string, data: any, locals?: any): Promise<void> {
  const overrides = await getCalculatorOverrides(locals);
  overrides[slug] = { ...(overrides[slug] || {}), ...data, updatedAt: new Date().toISOString() };
  await writeSetting('cms_calculator_overrides', overrides, locals);
}

/**
 * Internal Link Manager
 * Stores sourceSlug -> relatedSlugs[] relationships
 */
export async function getInternalLinks(locals?: any): Promise<Record<string, string[]>> {
  return await readSetting<Record<string, string[]>>('cms_internal_links', {}, locals);
}

export function validateInternalLinks(
  sourceSlug: string,
  relatedSlugs: string[]
): { valid: boolean; error?: string; cleanSlugs: string[] } {
  if (!sourceSlug) {
    return { valid: false, error: 'Source calculator slug is required.', cleanSlugs: [] };
  }

  const cleanSource = sourceSlug.trim().toLowerCase();

  // Validate source calculator exists
  const sourceExists = calculators.some((c) => c.slug.toLowerCase() === cleanSource);
  if (!sourceExists) {
    return { valid: false, error: `Invalid source calculator: "${sourceSlug}" does not exist in calculator registry.`, cleanSlugs: [] };
  }

  // 1. Filter out self-linking
  let cleanSlugs = relatedSlugs
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s && s !== cleanSource);

  // 2. Filter out duplicates
  cleanSlugs = Array.from(new Set(cleanSlugs));

  // 3. Filter only registered calculator target slugs
  cleanSlugs = cleanSlugs.filter((s) => calculators.some((c) => c.slug.toLowerCase() === s));

  return { valid: true, cleanSlugs };
}

export async function saveInternalLinks(
  sourceSlug: string,
  relatedSlugs: string[],
  locals?: any
): Promise<{ success: boolean; error?: string; relatedSlugs: string[] }> {
  const validation = validateInternalLinks(sourceSlug, relatedSlugs);
  if (!validation.valid) {
    return { success: false, error: validation.error, relatedSlugs: [] };
  }

  const cleanSource = sourceSlug.trim().toLowerCase();
  const allLinks = await getInternalLinks(locals);
  allLinks[cleanSource] = validation.cleanSlugs;
  await writeSetting('cms_internal_links', allLinks, locals);

  return { success: true, relatedSlugs: validation.cleanSlugs };
}

