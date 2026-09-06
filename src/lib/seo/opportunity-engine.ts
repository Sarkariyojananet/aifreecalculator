/**
 * SEO Opportunity Engine
 * Automatically mines Google Search Console data for Position, CTR, and Page-1 Opportunities.
 */

import type {
  GscPageRow,
  GscQueryRow,
  SeoOpportunity,
} from './gsc-types';
import { mapUrlToCalculator } from './gsc-client';

/**
 * Expected average organic CTR by SERP position (industry standard benchmark)
 */
function getExpectedCtr(position: number): number {
  if (position <= 1.5) return 28.0;
  if (position <= 2.5) return 15.0;
  if (position <= 3.5) return 10.0;
  if (position <= 4.5) return 7.0;
  if (position <= 5.5) return 5.5;
  if (position <= 6.5) return 4.5;
  if (position <= 7.5) return 3.5;
  if (position <= 8.5) return 2.8;
  if (position <= 10.0) return 2.2;
  if (position <= 15.0) return 1.4;
  return 0.8;
}

export function detectSeoOpportunities(
  pages: GscPageRow[],
  queries: GscQueryRow[],
  pageQueryData: Array<{ page: string; query: string; clicks: number; impressions: number; ctr: number; position: number }>
): SeoOpportunity[] {
  const opportunities: SeoOpportunity[] = [];
  const seenKeys = new Set<string>();

  // 1. POSITION OPPORTUNITIES (Striking Distance: Positions 4.0 - 15.0 with strong impressions)
  for (const item of pageQueryData) {
    if (item.impressions < 50) continue;

    if (item.position >= 4.0 && item.position <= 15.0) {
      const key = `pos-${item.page}-${item.query}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const calc = mapUrlToCalculator(item.page);
      const calcName = calc?.name || item.page;

      // Score formula: Higher impressions + closer to Top 3 = higher score
      const proximityFactor = (16 - item.position) / 12; // 0 to 1
      const impressionFactor = Math.min(1, Math.log10(item.impressions) / 4); // 0 to 1
      const opportunityScore = Math.min(98, Math.round(50 + proximityFactor * 30 + impressionFactor * 20));

      const potentialImpact = item.impressions > 1000 || item.position <= 8 ? 'High' : 'Medium';

      opportunities.push({
        id: key,
        type: 'position',
        title: `Striking Distance: Rank #${Math.round(item.position)} for "${item.query}"`,
        pageUrl: item.page,
        calculatorSlug: calc?.slug,
        calculatorName: calcName,
        category: calc?.category,
        icon: calc?.icon,
        query: item.query,
        currentPosition: item.position,
        impressions: item.impressions,
        clicks: item.clicks,
        ctr: item.ctr,
        opportunityScore,
        potentialImpact,
        reason: `Ranking on position ${item.position.toFixed(1)} with ${item.impressions.toLocaleString()} impressions. Moving into the top 3 will multiply clicks by 3x–5x.`,
        recommendedAction: 'Add targeted FAQ answering this specific query, expand step-by-step calculation section, and add contextual internal links using this exact keyword.',
      });
    }
  }

  // 2. HIGH IMPRESSIONS + LOW CTR (Position <= 10.0, Impressions >= 100, CTR significantly below benchmark)
  for (const page of pages) {
    if (page.impressions < 100 || page.position > 10.0) continue;

    const expectedCtr = getExpectedCtr(page.position);
    // If actual CTR is less than 60% of expected benchmark
    if (page.ctr < expectedCtr * 0.65) {
      const key = `ctr-${page.url}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);

      const calcName = page.calculatorName || page.path;
      const ctrDeficit = Math.round((expectedCtr - page.ctr) * 10) / 10;

      const impressionFactor = Math.min(1, Math.log10(page.impressions) / 4);
      const opportunityScore = Math.min(95, Math.round(55 + impressionFactor * 25 + Math.min(20, ctrDeficit * 3)));

      opportunities.push({
        id: key,
        type: 'ctr',
        title: `Low Click-Through Rate on Page 1 (${page.ctr}% vs ${expectedCtr}% benchmark)`,
        pageUrl: page.url,
        calculatorSlug: page.calculatorSlug,
        calculatorName: calcName,
        category: page.category,
        icon: page.icon,
        currentPosition: page.position,
        impressions: page.impressions,
        clicks: page.clicks,
        ctr: page.ctr,
        expectedCtr,
        opportunityScore,
        potentialImpact: page.impressions > 1000 ? 'High' : 'Medium',
        reason: `Page ranks in position ${page.position.toFixed(1)} with ${page.impressions.toLocaleString()} impressions, but receives only ${page.ctr}% CTR (expected ~${expectedCtr}% for this rank).`,
        recommendedAction: 'Rewrite Title Tag with high-CTR power words ("Instant", "Free", current year "2026"), add benefits in Meta Description, and ensure FAQ / HowTo Schema is fully validated for rich snippet badges.',
      });
    }
  }

  // 3. NEAR PAGE 1 POTENTIAL (Positions 8.0 - 20.0 with substantial impressions)
  for (const item of pageQueryData) {
    if (item.impressions < 150 || item.position < 8.0 || item.position > 20.0) continue;

    const key = `page1-${item.page}-${item.query}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);

    const calc = mapUrlToCalculator(item.page);
    const calcName = calc?.name || item.page;

    const opportunityScore = Math.min(90, Math.round(40 + Math.min(30, (20 - item.position) * 2.5) + Math.min(30, Math.log10(item.impressions) * 10)));

    opportunities.push({
      id: key,
      type: 'page1_potential',
      title: `Page 1 Candidate: "${item.query}" at Position #${Math.round(item.position)}`,
      pageUrl: item.page,
      calculatorSlug: calc?.slug,
      calculatorName: calcName,
      category: calc?.category,
      icon: calc?.icon,
      query: item.query,
      currentPosition: item.position,
      impressions: item.impressions,
      clicks: item.clicks,
      ctr: item.ctr,
      opportunityScore,
      potentialImpact: item.impressions > 1000 ? 'High' : 'Medium',
      reason: `Query receives ${item.impressions.toLocaleString()} impressions on positions 8–20. Pushing onto Page 1 will unlock direct organic search traffic.`,
      recommendedAction: 'Strengthen page authority by adding internal links from 2–3 top related category pages with descriptive anchor text, and ensure the query is featured in an H2/H3 header.',
    });
  }

  // Sort by Opportunity Score descending
  opportunities.sort((a, b) => b.opportunityScore - a.opportunityScore);

  return opportunities;
}
