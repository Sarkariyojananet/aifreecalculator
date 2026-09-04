/**
 * SEO Intelligence & Site Audit Engine
 * 100% Rule-Based, Transparent, Context-Aware SEO Diagnostics for AI Free Calculator.
 */

import { calculators, categories, type Calculator } from '../../data/calculators';
import { getCalculatorOverrides, getInternalLinks, getRedirectRules } from '../admin/content-store';

export type PageType = 'calculator' | 'category' | 'core';
export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type IssueCategory =
  | 'title'
  | 'description'
  | 'canonical'
  | 'heading'
  | 'schema'
  | 'links'
  | 'sitemap'
  | 'duplicate';

export interface SEOIssue {
  id: string;
  pagePath: string;
  pageName: string;
  pageType: PageType;
  category: IssueCategory;
  severity: IssueSeverity;
  issue: string;
  reason: string;
  suggestedAction: string;
  editUrl?: string;
  field?: string;
  value?: string;
}

export interface PageAuditDetail {
  path: string;
  name: string;
  type: PageType;
  category?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  h1: string;
  hasSchema: boolean;
  schemaType?: string;
  inboundLinksCount: number;
  outboundLinksCount: number;
  inSitemap: boolean;
  isOrphan: boolean;
  score: number; // 0 - 100 transparent deduction score
  issues: SEOIssue[];
}

export interface DuplicateGroup {
  type: 'title' | 'description' | 'h1';
  value: string;
  pages: { path: string; name: string; type: PageType }[];
}

export interface SEOAuditReport {
  timestamp: string;
  totalPages: number;
  healthyPages: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  infoCount: number;
  overallScore: number;
  pages: PageAuditDetail[];
  issues: SEOIssue[];
  duplicates: DuplicateGroup[];
  orphanPages: PageAuditDetail[];
  sitemapIssues: SEOIssue[];
  linkIssues: SEOIssue[];
}

// Core static pages on AI Free Calculator
export const CORE_PAGES: { path: string; name: string; title: string; description: string }[] = [
  {
    path: '/',
    name: 'Homepage',
    title: 'AI Free Calculator - 42+ Free Accurate Online Calculators',
    description: 'Free online calculators for civil construction, loan EMI, finance, taxes, health, body mass index, scientific math, and everyday calculations.',
  },
  {
    path: '/about/',
    name: 'About Us',
    title: 'About Us - AI Free Calculator',
    description: 'Learn about AI Free Calculator, our mission to provide precision calculation tools, verified engineering formulas, and private client-side computing.',
  },
  {
    path: '/contact/',
    name: 'Contact & Support',
    title: 'Contact Us - AI Free Calculator',
    description: 'Get in touch with the AI Free Calculator team. Submit feedback, report calculation bugs, request new custom calculators, or discuss partnerships directly.',
  },
  {
    path: '/privacy-policy/',
    name: 'Privacy Policy',
    title: 'Privacy Policy - AI Free Calculator',
    description: 'Our privacy commitments: 100% client-side computation, zero personal data harvesting, and secure transparent calculation tools.',
  },
  {
    path: '/terms/',
    name: 'Terms of Service',
    title: 'Terms of Service - AI Free Calculator',
    description: 'Read the terms of use and service agreement for accessing AI Free Calculator free online calculation tools.',
  },
  {
    path: '/disclaimer/',
    name: 'Disclaimer',
    title: 'Disclaimer - AI Free Calculator',
    description: 'Mathematical and estimation disclaimers for civil construction, tax computation, financial forecasting, and health guidelines.',
  },
];

/**
 * Runs a complete transparent rule-based audit on all pages of the website.
 */
export async function runFullSEOAudit(locals?: any): Promise<SEOAuditReport> {
  const overrides = await getCalculatorOverrides(locals);
  const customInternalLinks = await getInternalLinks(locals);
  const redirects = await getRedirectRules(locals);

  const activeRedirectSources = new Set(
    redirects.filter((r) => r.active !== false).map((r) => r.source.toLowerCase())
  );

  const pagesMap: Map<string, PageAuditDetail> = new Map();
  const allIssues: SEOIssue[] = [];

  // Track occurrences for duplicate detection
  const titleMap: Map<string, { path: string; name: string; type: PageType }[]> = new Map();
  const descMap: Map<string, { path: string; name: string; type: PageType }[]> = new Map();
  const h1Map: Map<string, { path: string; name: string; type: PageType }[]> = new Map();

  // Inbound link count tracker
  const inboundCountMap: Map<string, number> = new Map();

  // Helper to increment inbound links
  function addInbound(targetPath: string) {
    const norm = targetPath.endsWith('/') ? targetPath : `${targetPath}/`;
    inboundCountMap.set(norm, (inboundCountMap.get(norm) || 0) + 1);
  }

  // 1. Pre-calculate standard inbound links from navigation & footer
  CORE_PAGES.forEach((p) => {
    // Header & Footer link to Home, About, Contact, Privacy, Terms, Disclaimer
    addInbound(p.path);
  });

  categories.forEach((cat) => {
    // Header & Footer link to all 5 category hubs
    addInbound(cat.path);
  });

  // Calculate internal links between calculators
  calculators.forEach((c) => {
    // 1) Category hubs link to all member calculators
    addInbound(c.path);

    // 2) Custom related links
    const customRelated = customInternalLinks[c.slug];
    if (Array.isArray(customRelated) && customRelated.length > 0) {
      customRelated.forEach((relSlug) => {
        const targetCalc = calculators.find((t) => t.slug === relSlug);
        if (targetCalc) {
          addInbound(targetCalc.path);
        }
      });
    } else {
      // 3) Automatic same-category sidebar links (first 6)
      const sameCat = calculators.filter((x) => x.category === c.category && x.slug !== c.slug).slice(0, 6);
      sameCat.forEach((rel) => addInbound(rel.path));
    }

    // 4) Popular cross-category sidebar tools
    if (c.featured) {
      addInbound(c.path);
    }
  });

  // -------------------------------------------------------------
  // A. AUDIT CALCULATOR PAGES (42+ Tools)
  // -------------------------------------------------------------
  /**
   * H1 Analysis Note:
   * CalculatorLayout.astro unconditionally renders exactly one <h1> element
   * with the calculator's name (`calculatorName` prop). This means:
   *   - Missing H1: Cannot occur — hardcoded in layout.
   *   - Multiple H1: Cannot occur — only one h1 exists per page.
   *   - H1 content = calculator name (from override.name || calc.name).
   * This is a structural guarantee, not a runtime HTML analysis.
   * If calculator pages ever use custom layouts, this assumption must be revisited.
   */
  calculators.forEach((calc) => {
    const override = overrides[calc.slug] || {};
    const path = calc.path.endsWith('/') ? calc.path : `${calc.path}/`;
    const name = override.name || calc.name;
    const metaTitle = override.metaTitle || `${name} - AI Free Calculator`;
    const metaDescription = override.metaDescription || override.description || calc.description || '';
    const canonicalUrl = `https://aifreecalculator.com${path}`;
    const h1 = name;
    const isFeatured = override.featured !== undefined ? override.featured : calc.featured;
    const customLinks = customInternalLinks[calc.slug] || [];

    const issues: SEOIssue[] = [];
    let score = 100;

    // Rule 1: Meta Title Check
    if (!metaTitle || metaTitle.trim().length === 0) {
      score -= 25;
      issues.push({
        id: `title_missing_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'title',
        severity: 'critical',
        issue: 'Missing Meta Title',
        reason: 'Calculator page does not have a meta title defined, preventing search engines from displaying an accurate snippet.',
        suggestedAction: `Add a descriptive meta title (e.g. "${name} – Free Online Calculation Tool").`,
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaTitle',
      });
    } else if (metaTitle.length < 30) {
      score -= 10;
      issues.push({
        id: `title_short_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'title',
        severity: 'medium',
        issue: `Meta Title Too Short (${metaTitle.length} chars)`,
        reason: 'Titles under 30 characters underutilize Google SERP real estate and rank lower for long-tail keywords.',
        suggestedAction: `Expand title to 50–60 characters (current: "${metaTitle}").`,
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaTitle',
        value: metaTitle,
      });
    } else if (metaTitle.length > 68) {
      score -= 5;
      issues.push({
        id: `title_long_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'title',
        severity: 'low',
        issue: `Meta Title Truncation Warning (${metaTitle.length} chars)`,
        reason: 'Titles over 68 characters are typically truncated with ellipses (...) in Google search results.',
        suggestedAction: 'Shorten primary title to under 65 characters.',
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaTitle',
        value: metaTitle,
      });
    }

    // Track Title Duplicates
    if (metaTitle) {
      const existing = titleMap.get(metaTitle.toLowerCase()) || [];
      existing.push({ path, name, type: 'calculator' });
      titleMap.set(metaTitle.toLowerCase(), existing);
    }

    // Rule 2: Meta Description Check
    if (!metaDescription || metaDescription.trim().length === 0) {
      score -= 20;
      issues.push({
        id: `desc_missing_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'description',
        severity: 'high',
        issue: 'Missing Meta Description',
        reason: 'Search engines will automatically extract arbitrary page snippets without a curated meta description.',
        suggestedAction: 'Write an actionable 140–160 character description summarizing the formula and output.',
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaDescription',
      });
    } else if (metaDescription.length < 90) {
      score -= 8;
      issues.push({
        id: `desc_short_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'description',
        severity: 'medium',
        issue: `Meta Description Too Short (${metaDescription.length} chars)`,
        reason: 'Descriptions under 90 characters fail to provide enough context and CTR incentive for users in search results.',
        suggestedAction: 'Expand description to 140–160 characters with key formula benefits.',
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaDescription',
        value: metaDescription,
      });
    } else if (metaDescription.length > 175) {
      score -= 5;
      issues.push({
        id: `desc_long_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'description',
        severity: 'low',
        issue: `Meta Description May Truncate (${metaDescription.length} chars)`,
        reason: 'Descriptions over 165–170 characters may be truncated on mobile and desktop search viewports.',
        suggestedAction: 'Trim description to roughly 155 characters for optimal display.',
        editUrl: `/admin/calculators/new/?edit=${calc.slug}`,
        field: 'metaDescription',
        value: metaDescription,
      });
    }

    // Track Description Duplicates
    if (metaDescription) {
      const existing = descMap.get(metaDescription.toLowerCase()) || [];
      existing.push({ path, name, type: 'calculator' });
      descMap.set(metaDescription.toLowerCase(), existing);
    }

    // Track H1
    if (h1) {
      const existing = h1Map.get(h1.toLowerCase()) || [];
      existing.push({ path, name, type: 'calculator' });
      h1Map.set(h1.toLowerCase(), existing);
    }

    // Rule 3: Canonical URL Check
    if (!canonicalUrl.startsWith('https://aifreecalculator.com/')) {
      score -= 25;
      issues.push({
        id: `canonical_invalid_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'canonical',
        severity: 'critical',
        issue: 'Invalid Canonical URL',
        reason: 'Canonical tag must point to the absolute secure https://aifreecalculator.com URL.',
        suggestedAction: `Set canonical URL to ${canonicalUrl}.`,
      });
    }

    // Rule 4: Redirect collision check
    if (activeRedirectSources.has(path.toLowerCase())) {
      score -= 30;
      issues.push({
        id: `redirect_collision_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'links',
        severity: 'critical',
        issue: 'Active Redirect Colliding With Live Calculator',
        reason: `An active 301/302 redirect is configured for "${path}", intercepting traffic to this calculator.`,
        suggestedAction: 'Review and deactivate or delete the conflicting redirect rule in Admin Redirect Manager.',
        editUrl: '/admin/redirects/',
      });
    }

    // Rule 5: Internal Link & Orphan Check
    const inbound = inboundCountMap.get(path) || 0;
    const outbound = customLinks.length > 0 ? customLinks.length : 6;
    const isOrphan = inbound === 0;

    if (isOrphan) {
      score -= 20;
      issues.push({
        id: `orphan_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'links',
        severity: 'high',
        issue: 'Orphan Calculator Page Detected',
        reason: 'This calculator has 0 inbound internal links pointing to it, making it difficult for search engine crawlers to discover.',
        suggestedAction: `Attach this calculator to related tools using the Internal Link Manager or feature it on category hubs.`,
        editUrl: `/admin/internal-links/`,
      });
    } else if (inbound < 2) {
      score -= 5;
      issues.push({
        id: `low_inbound_${calc.slug}`,
        pagePath: path,
        pageName: name,
        pageType: 'calculator',
        category: 'links',
        severity: 'low',
        issue: `Low Internal Link Authority (${inbound} Inbound Link)`,
        reason: 'Pages with fewer than 2 inbound links receive lower internal PageRank flow.',
        suggestedAction: 'Add this tool as a related calculator to 2–3 sibling tools in the Internal Link Manager.',
        editUrl: `/admin/internal-links/`,
      });
    }

    // Rule 6: Schema Verification
    // All calculators in CalculatorLayout generate WebApplication schema
    const hasSchema = true;

    // Rule 7: Sitemap inclusion check
    // Core rule: all calculator pages are static and included in @astrojs/sitemap
    const inSitemap = true;

    const auditDetail: PageAuditDetail = {
      path,
      name,
      type: 'calculator',
      category: calc.category,
      metaTitle,
      metaDescription,
      canonicalUrl,
      robots: 'index, follow',
      h1,
      hasSchema,
      schemaType: 'WebApplication + FAQPage',
      inboundLinksCount: inbound,
      outboundLinksCount: outbound,
      inSitemap,
      isOrphan,
      score: Math.max(0, score),
      issues,
    };

    pagesMap.set(path, auditDetail);
    allIssues.push(...issues);
  });

  // -------------------------------------------------------------
  // B. AUDIT CATEGORY HUB PAGES (5 Hubs)
  // -------------------------------------------------------------
  categories.forEach((cat) => {
    const path = cat.path.endsWith('/') ? cat.path : `${cat.path}/`;
    const name = `${cat.name} Calculators`;
    const metaTitle = `${cat.name} Calculators - Free Online Suite | AI Free Calculator`;
    const metaDescription = cat.description;
    const canonicalUrl = `https://aifreecalculator.com${path}`;
    const h1 = `${cat.name} Calculation Suite`;

    const issues: SEOIssue[] = [];
    let score = 100;

    if (!metaDescription || metaDescription.length < 50) {
      score -= 15;
      issues.push({
        id: `cat_desc_short_${cat.name.toLowerCase()}`,
        pagePath: path,
        pageName: name,
        pageType: 'category',
        category: 'description',
        severity: 'medium',
        issue: 'Brief Category Hub Meta Description',
        reason: 'Category hubs should have detailed 120–160 char descriptions summarizing all tools in the category.',
        suggestedAction: 'Expand category description in Category Manager.',
        editUrl: '/admin/categories/',
      });
    }

    const inbound = inboundCountMap.get(path) || 1;
    const catCalcsCount = calculators.filter((c) => c.category.toLowerCase() === cat.name.toLowerCase()).length;

    const auditDetail: PageAuditDetail = {
      path,
      name,
      type: 'category',
      category: cat.name,
      metaTitle,
      metaDescription,
      canonicalUrl,
      robots: 'index, follow',
      h1,
      hasSchema: true,
      schemaType: 'CollectionPage + BreadcrumbList',
      inboundLinksCount: inbound,
      outboundLinksCount: catCalcsCount,
      inSitemap: true,
      isOrphan: false,
      score: Math.max(0, score),
      issues,
    };

    pagesMap.set(path, auditDetail);
    allIssues.push(...issues);
  });

  // -------------------------------------------------------------
  // C. AUDIT CORE / STATIC PAGES
  // -------------------------------------------------------------
  CORE_PAGES.forEach((core) => {
    const path = core.path;
    const issues: SEOIssue[] = [];
    let score = 100;

    if (!core.title) {
      score -= 20;
      issues.push({
        id: `core_title_${core.name.toLowerCase()}`,
        pagePath: path,
        pageName: core.name,
        pageType: 'core',
        category: 'title',
        severity: 'high',
        issue: 'Missing Meta Title on Core Page',
        reason: 'All public core pages must have an explicit meta title.',
        suggestedAction: 'Define a unique meta title in BaseLayout.',
      });
    }

    const inbound = inboundCountMap.get(path) || 1;

    const auditDetail: PageAuditDetail = {
      path,
      name: core.name,
      type: 'core',
      metaTitle: core.title,
      metaDescription: core.description,
      canonicalUrl: `https://aifreecalculator.com${path === '/' ? '' : path}`,
      robots: 'index, follow',
      h1: core.name,
      hasSchema: core.path === '/',
      schemaType: core.path === '/' ? 'WebSite + Organization' : undefined,
      inboundLinksCount: inbound,
      outboundLinksCount: 15,
      inSitemap: true,
      isOrphan: false,
      score: Math.max(0, score),
      issues,
    };

    pagesMap.set(path, auditDetail);
    allIssues.push(...issues);
  });

  // -------------------------------------------------------------
  // D. DETECT CROSS-PAGE DUPLICATES
  // -------------------------------------------------------------
  const duplicates: DuplicateGroup[] = [];

  // Duplicate Titles
  titleMap.forEach((pages, title) => {
    if (pages.length > 1) {
      duplicates.push({ type: 'title', value: title, pages });
      pages.forEach((p) => {
        const pageAudit = pagesMap.get(p.path);
        const issueObj: SEOIssue = {
          id: `dup_title_${p.path}`,
          pagePath: p.path,
          pageName: p.name,
          pageType: p.type,
          category: 'duplicate',
          severity: 'high',
          issue: `Duplicate Meta Title ("${title.substring(0, 45)}...")`,
          reason: `Shared with ${pages.length - 1} other page(s): ${pages.filter((x) => x.path !== p.path).map((x) => x.name).join(', ')}. Duplicate titles cannibalize keyword rankings.`,
          suggestedAction: 'Differentiate each page title with unique modifiers or audience intents in Bulk Meta Editor.',
          editUrl: '/admin/seo/bulk/',
        };
        pageAudit?.issues.push(issueObj);
        allIssues.push(issueObj);
        if (pageAudit) pageAudit.score = Math.max(0, pageAudit.score - 15);
      });
    }
  });

  // Duplicate Descriptions
  descMap.forEach((pages, desc) => {
    if (pages.length > 1 && desc.length > 20) {
      duplicates.push({ type: 'description', value: desc, pages });
      pages.forEach((p) => {
        const pageAudit = pagesMap.get(p.path);
        const issueObj: SEOIssue = {
          id: `dup_desc_${p.path}`,
          pagePath: p.path,
          pageName: p.name,
          pageType: p.type,
          category: 'duplicate',
          severity: 'medium',
          issue: `Duplicate Meta Description`,
          reason: `Exact same description shared across ${pages.length} pages. Google prefers unique snippet descriptions per URL.`,
          suggestedAction: 'Customize description for this specific tool in Bulk Meta Editor.',
          editUrl: '/admin/seo/bulk/',
        };
        pageAudit?.issues.push(issueObj);
        allIssues.push(issueObj);
        if (pageAudit) pageAudit.score = Math.max(0, pageAudit.score - 10);
      });
    }
  });

  // -------------------------------------------------------------
  // E. AGGREGATE EXECUTIVE METRICS
  // -------------------------------------------------------------
  const allPageList = Array.from(pagesMap.values());
  const criticalCount = allIssues.filter((i) => i.severity === 'critical').length;
  const highCount = allIssues.filter((i) => i.severity === 'high').length;
  const mediumCount = allIssues.filter((i) => i.severity === 'medium').length;
  const lowCount = allIssues.filter((i) => i.severity === 'low').length;
  const infoCount = allIssues.filter((i) => i.severity === 'info').length;

  const healthyPages = allPageList.filter((p) => {
    const hasCritOrHigh = p.issues.some((i) => i.severity === 'critical' || i.severity === 'high');
    return !hasCritOrHigh;
  }).length;

  const totalScore = allPageList.reduce((sum, p) => sum + p.score, 0);
  const overallScore = Math.round(totalScore / (allPageList.length || 1));

  const orphanPages = allPageList.filter((p) => p.isOrphan);
  const sitemapIssues = allIssues.filter((i) => i.category === 'sitemap');
  const linkIssues = allIssues.filter((i) => i.category === 'links');

  return {
    timestamp: new Date().toISOString(),
    totalPages: allPageList.length,
    healthyPages,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    infoCount,
    overallScore,
    pages: allPageList,
    issues: allIssues,
    duplicates,
    orphanPages,
    sitemapIssues,
    linkIssues,
  };
}
