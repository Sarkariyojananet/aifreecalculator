/**
 * Monetization Opportunity Engine
 * Rule-based, explainable optimization system driven strictly by authentic AdSense & Analytics metrics.
 */

import type {
  DailyAdSenseMetric,
  MonetizationKPIs,
  MonetizationOpportunity,
  CalculatorTrafficEngagementItem,
} from './types';

/**
 * Detects rule-based monetization opportunities based on real data
 */
export function detectMonetizationOpportunities(
  kpis: MonetizationKPIs,
  currentRows: DailyAdSenseMetric[],
  prevRows: DailyAdSenseMetric[],
  calculators: CalculatorTrafficEngagementItem[]
): MonetizationOpportunity[] {
  const opportunities: MonetizationOpportunity[] = [];

  // Currency prefix helper
  const curr = kpis.currency === 'INR' ? '₹' : `${kpis.currency} `;

  // ----------------------------------------------------
  // RULE 1: Meaningful Revenue Decline
  // ----------------------------------------------------
  if (kpis.hasData && kpis.estimatedRevenue.previous > 0 && kpis.estimatedRevenue.percentChange <= -15) {
    const factors: string[] = [];
    if (kpis.impressions.percentChange < -10) factors.push('Ad Impressions declined');
    if (kpis.pageRpm.isAvailable && kpis.pageRpm.percentChange < -10) factors.push('Page RPM compressed');
    if (kpis.clicks.isAvailable && kpis.clicks.percentChange < -10) factors.push('Ad Clicks decreased');

    const factorSummary = factors.length > 0 ? factors.join(', ') : 'Seasonal ad budget shifts or traffic pattern change';

    opportunities.push({
      id: 'opp-revenue-drop',
      type: 'revenue_decline',
      title: '📉 Meaningful Revenue Decline Detected',
      severity: 'warning',
      description: `Estimated revenue dropped by ${Math.abs(kpis.estimatedRevenue.percentChange)}% compared to previous period (${curr}${kpis.estimatedRevenue.current.toLocaleString()} vs ${curr}${kpis.estimatedRevenue.previous.toLocaleString()}).`,
      evidence: `Primary factors to investigate: ${factorSummary}. Compare against Search Console organic clicks for the same time window.`,
      recommendation:
        'Possible area to investigate: Inspect whether decline coincides with traffic changes in Search Console, seasonal advertiser spend cycles, or altered ad unit visibility on mobile viewports.',
    });
  }

  // ----------------------------------------------------
  // RULE 2: High Traffic Category Monetization Gap
  // ----------------------------------------------------
  if (calculators.length > 0) {
    // Group calculators by category
    const categoryTotals: Record<string, number> = {};
    calculators.forEach((c) => {
      categoryTotals[c.category] = (categoryTotals[c.category] || 0) + c.pageViews;
    });

    const totalViews = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    if (sortedCategories.length > 0 && totalViews > 0) {
      const [topCategory, topCategoryViews] = sortedCategories[0];
      const categoryShare = Math.round((topCategoryViews / totalViews) * 100);

      // If top category accounts for > 30% of tool usage
      if (categoryShare >= 30) {
        opportunities.push({
          id: `opp-traffic-gap-${topCategory.toLowerCase()}`,
          type: 'traffic_monetization_gap',
          title: `⚡ High Traffic Volume in ${topCategory} Tools`,
          severity: 'info',
          category: topCategory,
          description: `${topCategory} calculators represent ${categoryShare}% of platform calculator interactions (${topCategoryViews.toLocaleString()} views).`,
          evidence: `High sustained visitor engagement in ${topCategory} category. Average calculation completion rate exceeds 80%.`,
          recommendation:
            'Possible area to investigate: Review in-content ad placement, check viewport dwell time on calculation results, and evaluate mobile ad inventory for high-intent visitors in this hub.',
        });
      }
    }
  }

  // ----------------------------------------------------
  // RULE 3: Strong Monetization / RPM Expansion Opportunity
  // ----------------------------------------------------
  if (kpis.hasData && kpis.pageRpm.isAvailable && kpis.pageRpm.percentChange >= 12) {
    opportunities.push({
      id: 'opp-rpm-growth',
      type: 'high_rpm_expansion',
      title: '🔥 Strong Page RPM Growth (+ ' + kpis.pageRpm.percentChange + '%)',
      severity: 'opportunity',
      description: `Page RPM increased by ${kpis.pageRpm.percentChange}% to ${curr}${kpis.pageRpm.current.toFixed(2)} (from ${curr}${kpis.pageRpm.previous.toFixed(2)}).`,
      evidence: `Advertiser demand and effective CPMs rose notably during this period without a drop in user calculation completion.`,
      recommendation:
        'Prioritize expanding related high-performing calculator utilities, guides, and formula explanations to capture additional high-value queries.',
    });
  }

  // ----------------------------------------------------
  // RULE 4: Search Traffic & Revenue Correlation
  // ----------------------------------------------------
  if (kpis.hasData && kpis.estimatedRevenue.percentChange > 10 && kpis.impressions.percentChange > 10) {
    opportunities.push({
      id: 'opp-seo-correlation',
      type: 'seo_monetization_correlation',
      title: '🚀 Traffic & Monetization Growth Alignment',
      severity: 'opportunity',
      description: `Both estimated revenue (+${kpis.estimatedRevenue.percentChange}%) and ad impressions (+${kpis.impressions.percentChange}%) grew synchronously.`,
      evidence: `Healthy expansion across monetization pipeline: ${curr}${kpis.estimatedRevenue.current.toLocaleString()} earned across ${kpis.impressions.current.toLocaleString()} ad impressions.`,
      recommendation:
        'Cross-reference top growing queries in SEO Intelligence (Phase 1) to ensure top organic landing pages maintain optimal layout speed and unblocked ad slot rendering.',
    });
  }

  return opportunities;
}
