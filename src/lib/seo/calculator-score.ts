/**
 * Calculator SEO Health & Opportunity Score Engine
 * Computes a transparent 0-100 score based on impressions, click trends, CTR efficiency, and metadata quality.
 */

import type { GscPageRow, ContentDecayAlert, CalculatorSeoScore } from './gsc-types';
import { calculators } from '../../data/calculators';

export function computeCalculatorSeoScores(
  pages: GscPageRow[],
  decayAlerts: ContentDecayAlert[]
): Record<string, CalculatorSeoScore> {
  const scores: Record<string, CalculatorSeoScore> = {};

  const decayMap = new Map<string, ContentDecayAlert>();
  for (const d of decayAlerts) {
    if (d.calculatorSlug) decayMap.set(d.calculatorSlug, d);
  }

  const pageMap = new Map<string, GscPageRow>();
  for (const p of pages) {
    if (p.calculatorSlug) pageMap.set(p.calculatorSlug, p);
  }

  for (const calc of calculators) {
    const pageData = pageMap.get(calc.slug);
    const decayAlert = decayMap.get(calc.slug);

    const strengths: string[] = [];
    const needsImprovement: string[] = [];

    // 1. Impression Score (0 to 25 pts)
    let impressionsScore = 12; // baseline for existing calculator
    const impressions = pageData?.impressions || 0;
    if (impressions >= 5000) {
      impressionsScore = 25;
      strengths.push(`High search visibility (${impressions.toLocaleString()} search impressions).`);
    } else if (impressions >= 1000) {
      impressionsScore = 20;
      strengths.push(`Solid search presence (${impressions.toLocaleString()} impressions).`);
    } else if (impressions >= 200) {
      impressionsScore = 15;
    } else if (impressions > 0) {
      impressionsScore = 10;
      needsImprovement.push(`Low search impressions (${impressions}). Needs more keyword targeting.`);
    } else {
      impressionsScore = 5;
      needsImprovement.push('Zero Search Console impressions recorded in this period.');
    }

    // 2. Growth & Trend Score (0 to 25 pts)
    let growthScore = 15;
    if (decayAlert) {
      if (decayAlert.priority === 'critical') {
        growthScore = 2;
        needsImprovement.push(`Severe content decay: Traffic dropped by ${decayAlert.trafficDeclinePercent}%.`);
      } else if (decayAlert.priority === 'high') {
        growthScore = 6;
        needsImprovement.push(`High traffic drop: -${decayAlert.trafficDeclinePercent}% decline in clicks.`);
      } else {
        growthScore = 10;
        needsImprovement.push(`Traffic decline detected: -${decayAlert.trafficDeclinePercent}%.`);
      }
    } else if (pageData) {
      if (pageData.clickChangePercent > 20) {
        growthScore = 25;
        strengths.push(`Strong upward trajectory (+${pageData.clickChangePercent}% clicks growth).`);
      } else if (pageData.clickChangePercent >= 0) {
        growthScore = 20;
        strengths.push('Stable organic traffic performance.');
      } else {
        growthScore = 14;
      }

      if (pageData.positionChange < 0) {
        strengths.push(`Ranking improved by ${Math.abs(pageData.positionChange).toFixed(1)} positions.`);
      } else if (pageData.positionChange > 2) {
        needsImprovement.push(`Ranking slipped by ${pageData.positionChange.toFixed(1)} positions.`);
      }
    }

    // 3. CTR Efficiency Score (0 to 25 pts)
    let ctrScore = 15;
    const ctr = pageData?.ctr || 0;
    const position = pageData?.position || 0;

    if (pageData && impressions >= 50) {
      if (position <= 3 && ctr >= 12) {
        ctrScore = 25;
        strengths.push(`Excellent Top 3 click-through rate (${ctr}%).`);
      } else if (position <= 10 && ctr >= 3.5) {
        ctrScore = 22;
        strengths.push(`Healthy Page 1 click-through rate (${ctr}%).`);
      } else if (position <= 10 && ctr < 2.0) {
        ctrScore = 8;
        needsImprovement.push(`Low CTR (${ctr}%) for position ${position.toFixed(1)}. Title and snippet need optimization.`);
      } else {
        ctrScore = 15;
      }
    }

    // 4. Metadata Completeness & Quality (0 to 25 pts)
    let metadataScore = 25;
    if (!calc.description || calc.description.length < 50) {
      metadataScore -= 10;
      needsImprovement.push('Meta description is too short or missing key search benefits.');
    }
    if (!calc.keywords || calc.keywords.length < 3) {
      metadataScore -= 5;
      needsImprovement.push('Limited keyword tags configured in calculator metadata.');
    }
    if (metadataScore === 25) {
      strengths.push('Complete metadata, title tags, and rich schema configured.');
    }

    const totalScore = Math.min(100, Math.max(10, impressionsScore + growthScore + ctrScore + metadataScore));

    let decayStatus: 'Healthy' | 'Needs Review' | 'Critical' = 'Healthy';
    if (decayAlert?.priority === 'critical') decayStatus = 'Critical';
    else if (decayAlert) decayStatus = 'Needs Review';

    scores[calc.slug] = {
      calculatorSlug: calc.slug,
      calculatorName: calc.name,
      score: totalScore,
      impressionsScore,
      growthScore,
      ctrScore,
      metadataScore,
      strengths,
      needsImprovement,
      decayStatus,
    };
  }

  return scores;
}
