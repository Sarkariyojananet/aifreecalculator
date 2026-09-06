/**
 * Deterministic Priority Scoring for 404 URLs
 */

import type { RedirectPriority } from './types';

export interface PriorityScoreInput {
  totalHits: number;
  recentHits: number;
  gscImpressions?: number;
  hasSafeSuggestion?: boolean;
}

/**
 * Calculates deterministic priority for a 404 URL.
 * 
 * 🔴 Critical: High recent hits (>=25) OR high total hits (>=100) OR high GSC impressions (>=50).
 * 🟠 High: Meaningful recurring traffic (>=10 recent OR >=30 total OR >=10 GSC impressions).
 * 🟡 Medium: Moderate recurring traffic (>=3 recent OR >=5 total).
 * 🔵 Low: Few hits (<5 total).
 */
export function calculate404Priority(input: PriorityScoreInput): RedirectPriority {
  const { totalHits, recentHits, gscImpressions = 0 } = input;

  if (recentHits >= 25 || totalHits >= 100 || gscImpressions >= 50) {
    return 'critical';
  }

  if (recentHits >= 10 || totalHits >= 30 || gscImpressions >= 10) {
    return 'high';
  }

  if (recentHits >= 3 || totalHits >= 5) {
    return 'medium';
  }

  return 'low';
}
