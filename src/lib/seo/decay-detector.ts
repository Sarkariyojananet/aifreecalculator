/**
 * Content Decay Detection Engine
 * Transparent, rule-based detection of traffic and ranking drops across comparison periods.
 */

import type { GscPageRow, ContentDecayAlert, DecayPriority } from './gsc-types';

export function detectContentDecay(pages: GscPageRow[]): ContentDecayAlert[] {
  const alerts: ContentDecayAlert[] = [];

  for (const page of pages) {
    // 1. Noise Filter: Ignore pages with negligible historical traffic to prevent false alarms
    if (page.previousClicks < 15 && page.previousImpressions < 200) {
      continue;
    }

    const clickDiff = page.clicks - page.previousClicks;
    const clickPercent = page.previousClicks > 0
      ? ((page.clicks - page.previousClicks) / page.previousClicks) * 100
      : 0;

    const positionDiff = page.previousPosition > 0
      ? page.position - page.previousPosition
      : 0; // Positive number means rank worsened (e.g. 5 -> 8 is +3 drop)

    const impressionPercent = page.previousImpressions > 0
      ? ((page.impressions - page.previousImpressions) / page.previousImpressions) * 100
      : 0;

    // Must show meaningful decline in traffic or rankings
    const isTrafficDecline = clickPercent <= -15 && clickDiff <= -5;
    const isRankDecline = positionDiff >= 1.8;
    const isImpressionDecline = impressionPercent <= -25 && page.previousImpressions >= 500;

    if (!isTrafficDecline && !isRankDecline && !isImpressionDecline) {
      continue;
    }

    // Determine Priority based on severity and traffic volume
    let priority: DecayPriority = 'medium';
    if ((clickPercent <= -40 && page.previousClicks >= 40) || positionDiff >= 5.0) {
      priority = 'critical';
    } else if ((clickPercent <= -25 && page.previousClicks >= 25) || positionDiff >= 3.0 || clickDiff <= -30) {
      priority = 'high';
    } else if (clickPercent <= -15 || positionDiff >= 1.8) {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    // Explainable cause detection
    const possibleCauses: string[] = [];
    const recommendedFixes: string[] = [];

    if (positionDiff >= 2.0) {
      possibleCauses.push(`Average ranking dropped by ${positionDiff.toFixed(1)} positions (${page.previousPosition.toFixed(1)} → ${page.position.toFixed(1)}). Competitors may have published newer or more comprehensive tools.`);
      recommendedFixes.push('Review top-3 ranking competitor pages to identify missing formula variations, FAQs, or visual diagrams.');
    }

    if (impressionPercent <= -20) {
      possibleCauses.push(`Search impressions declined by ${Math.abs(Math.round(impressionPercent))}%. Could reflect seasonal search trends or losing featured snippets / rich results.`);
      recommendedFixes.push('Validate Calculator Schema (SoftwareApplication & HowTo JSON-LD) to regain rich snippet eligibility.');
    }

    if (page.ctr < page.previousCtr * 0.8 && page.position <= 10) {
      possibleCauses.push(`Click-Through Rate dropped from ${page.previousCtr}% to ${page.ctr}% despite maintaining first-page position.`);
      recommendedFixes.push('Rewrite Title Tag and Meta Description with stronger call-to-action, instant calculation promise, and year indicator.');
    }

    recommendedFixes.push('Add internal links from 2–3 related high-authority calculators.');
    recommendedFixes.push('Audit formula explanation, practical examples, and step-by-step calculation breakdown.');

    const name = page.calculatorName || page.path;
    const explanation = `Traffic changed by ${clickPercent.toFixed(1)}% (${page.previousClicks.toLocaleString()} → ${page.clicks.toLocaleString()} clicks), with average position moving from ${page.previousPosition.toFixed(1)} to ${page.position.toFixed(1)}.`;

    alerts.push({
      id: `decay-${page.calculatorSlug || encodeURIComponent(page.path)}`,
      pageUrl: page.url,
      calculatorSlug: page.calculatorSlug,
      calculatorName: name,
      category: page.category,
      icon: page.icon,
      currentClicks: page.clicks,
      previousClicks: page.previousClicks,
      trafficDeclinePercent: Math.round(Math.abs(clickPercent) * 10) / 10,
      currentPosition: page.position,
      previousPosition: page.previousPosition,
      positionDrop: Math.round(positionDiff * 10) / 10,
      currentImpressions: page.impressions,
      previousImpressions: page.previousImpressions,
      priority,
      explanation,
      possibleCauses,
      recommendedFixes,
    });
  }

  // Sort by priority (critical -> high -> medium -> low) and traffic loss
  const priorityWeight: Record<DecayPriority, number> = {
    critical: 4,
    high: 3,
    medium: 2,
    low: 1,
  };

  alerts.sort((a, b) => {
    const pDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
    if (pDiff !== 0) return pDiff;
    return (b.previousClicks - b.currentClicks) - (a.previousClicks - a.currentClicks);
  });

  return alerts;
}
