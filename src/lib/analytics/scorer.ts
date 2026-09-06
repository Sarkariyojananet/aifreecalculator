/**
 * Conversion Scoring & Anomaly Detection Engine (Phase 4)
 */

import type {
  CalculatorFunnelMetrics,
  AnalyticsAnomalyAlert,
} from './types';

export interface ScoreInput {
  pageViews: number;
  calculatorStarts: number;
  calculateClicks: number;
  successfulCalculations: number;
  calculationErrors: number;
  resultCopies: number;
  resultShares: number;
}

export interface ScoreOutput {
  score: number;
  grade: 'optimal' | 'good' | 'needs_attention' | 'critical';
  strengths: string[];
  needsImprovement: string[];
}

/**
 * Calculates a transparent 0-100 conversion score based on funnel performance:
 * - Start Rate (35 points): Form activation vs page views
 * - Calculate Rate (25 points): Completion of input to calculation
 * - Calculation Success (30 points): Execution reliability without errors or NaN
 * - Result Engagement (10 points): Post-calculation actions (Copy, Share)
 */
export function calculateConversionScore(input: ScoreInput): ScoreOutput {
  const {
    pageViews,
    calculatorStarts,
    calculateClicks,
    successfulCalculations,
    calculationErrors,
    resultCopies,
    resultShares,
  } = input;

  // If no visitors yet, return neutral empty state
  if (pageViews === 0) {
    return {
      score: 0,
      grade: 'needs_attention',
      strengths: [],
      needsImprovement: ['No traffic recorded in this period yet'],
    };
  }

  const strengths: string[] = [];
  const needsImprovement: string[] = [];

  // 1. Start Rate Score (Max 35)
  // Target: 70% start rate gives full 35 points
  const startRatio = calculatorStarts / pageViews;
  const startScore = Math.min(35, Math.round(startRatio * 50));
  const startPercent = Math.round(startRatio * 100);

  if (startPercent >= 65) {
    strengths.push(`High form activation: ${startPercent}% of visitors interact with the calculator inputs`);
  } else if (startPercent < 35 && pageViews >= 10) {
    needsImprovement.push(`Low initial interaction: Only ${startPercent}% of visitors touch an input field`);
  }

  // 2. Calculate Rate Score (Max 25)
  // Target: 70%+ of users who start proceed to click calculate
  const calcRatio = calculatorStarts > 0 ? calculateClicks / calculatorStarts : 0;
  const calcScore = Math.min(25, Math.round(calcRatio * 35));
  const calcPercent = Math.round(calcRatio * 100);

  if (calcPercent >= 70 && calculatorStarts >= 5) {
    strengths.push(`Strong completion: ${calcPercent}% of engaged users proceed to calculate`);
  } else if (calcPercent < 45 && calculatorStarts >= 10) {
    needsImprovement.push(`High form abandonment: ${100 - calcPercent}% of users who start typing abandon before calculating`);
  }

  // 3. Calculation Success Score (Max 30)
  // Target: 100% calculation reliability with zero runtime errors
  const totalAttempts = successfulCalculations + calculationErrors;
  let successScore = 30;
  if (totalAttempts > 0) {
    const successRatio = successfulCalculations / totalAttempts;
    successScore = Math.round(successRatio * 30);
    const successPercent = Math.round(successRatio * 100);

    if (successPercent >= 98 && totalAttempts >= 5) {
      strengths.push(`Flawless execution: ${successPercent}% of calculations succeed without client errors`);
    } else if (successPercent < 90) {
      needsImprovement.push(`Calculation failures: ${100 - successPercent}% of calculations trigger validation or runtime issues`);
    }
  } else if (calculateClicks > 0 && successfulCalculations === 0) {
    successScore = 0;
    needsImprovement.push('Calculations attempted but no successful results were rendered');
  }

  // 4. Result Engagement Score (Max 10)
  // Target: Users copying or sharing results
  let engScore = 0;
  if (successfulCalculations > 0) {
    const engCount = resultCopies + resultShares;
    const engRatio = engCount / successfulCalculations;
    engScore = Math.min(10, Math.round(engRatio * 20));
    const engPercent = Math.round(engRatio * 100);

    if (engPercent >= 20) {
      strengths.push(`High post-result utility: ${engPercent}% of completed calculations are copied or shared`);
    } else if (engPercent === 0 && successfulCalculations >= 15) {
      needsImprovement.push('Zero post-result actions: Users are not copying or sharing results');
    }
  }

  const totalScore = Math.max(0, Math.min(100, startScore + calcScore + successScore + engScore));

  let grade: 'optimal' | 'good' | 'needs_attention' | 'critical';
  if (totalScore >= 80) {
    grade = 'optimal';
  } else if (totalScore >= 60) {
    grade = 'good';
  } else if (totalScore >= 40) {
    grade = 'needs_attention';
  } else {
    grade = 'critical';
  }

  if (strengths.length === 0 && totalScore >= 50) {
    strengths.push('Steady baseline engagement across the calculation funnel');
  }
  if (needsImprovement.length === 0 && totalScore < 80) {
    needsImprovement.push('Explore optimizing call-to-action visibility above the fold to increase click-through');
  }

  return {
    score: totalScore,
    grade,
    strengths,
    needsImprovement,
  };
}

/**
 * Inspects a list of calculator metrics to identify underperforming calculators
 * and generate actionable alerts for the admin dashboard.
 */
export function detectUnderperformingCalculators(metricsList: CalculatorFunnelMetrics[]): AnalyticsAnomalyAlert[] {
  const alerts: AnalyticsAnomalyAlert[] = [];

  for (const m of metricsList) {
    // 1. Critical Calculation Error Spike
    const totalCalc = m.successfulCalculations + m.calculationErrors;
    if (m.calculationErrors > 0 && totalCalc >= 5) {
      const errorRate = (m.calculationErrors / totalCalc) * 100;
      if (errorRate >= 10 || m.calculationErrors >= 5) {
        alerts.push({
          id: `err_${m.slug}`,
          slug: m.slug,
          calculatorName: m.name,
          category: m.category,
          type: 'error_spike',
          severity: 'critical',
          title: `Calculation Errors Detected on ${m.name}`,
          message: `${m.calculationErrors} calculation attempts (${errorRate.toFixed(1)}%) failed with client validation or formula errors.`,
          currentValue: `${m.calculationErrors} errors (${errorRate.toFixed(1)}%)`,
          expectedValue: '0 errors (< 2%)',
          recommendedAction: 'Check formula test manager and inspect input boundary conditions.',
          link: `/admin/analytics/${m.slug}`,
        });
      }
    }

    // 2. High Form Drop-off (started typing but abandoned)
    if (m.calculatorStarts >= 15) {
      const dropOffRate = 100 - m.calculateRate;
      if (dropOffRate >= 65) {
        alerts.push({
          id: `drop_${m.slug}`,
          slug: m.slug,
          calculatorName: m.name,
          category: m.category,
          type: 'high_drop_off',
          severity: 'warning',
          title: `High Form Abandonment on ${m.name}`,
          message: `${dropOffRate.toFixed(1)}% of users who start filling inputs abandon the calculator before clicking Calculate.`,
          currentValue: `${dropOffRate.toFixed(1)}% drop-off`,
          expectedValue: '< 35% drop-off',
          recommendedAction: 'Reduce form input complexity, add default prefilled values, or reposition the Calculate button.',
          link: `/admin/analytics/${m.slug}`,
        });
      }
    }

    // 3. Low Start Rate (visitors view page but ignore form)
    if (m.pageViews >= 25 && m.startRate < 30) {
      alerts.push({
        id: `start_${m.slug}`,
        slug: m.slug,
        calculatorName: m.name,
        category: m.category,
        type: 'low_start_rate',
        severity: 'info',
        title: `Low Form Engagement on ${m.name}`,
        message: `Only ${m.startRate.toFixed(1)}% of visitors interact with the input fields. The form may be buried or not immediately visible.`,
        currentValue: `${m.startRate.toFixed(1)}% start rate`,
        expectedValue: '> 50% start rate',
        recommendedAction: 'Move calculator form higher above the fold and simplify hero introduction.',
        link: `/admin/analytics/${m.slug}`,
      });
    }
  }

  // Sort by severity: critical > warning > info
  const severityOrder: Record<string, number> = { critical: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

/**
 * Compares current period metrics against previous period metrics to detect
 * volume drops or sudden regression anomalies.
 */
export function detectAnalyticsAnomalies(
  currentList: CalculatorFunnelMetrics[],
  previousList: CalculatorFunnelMetrics[]
): AnalyticsAnomalyAlert[] {
  const alerts: AnalyticsAnomalyAlert[] = [];
  const prevMap = new Map<string, CalculatorFunnelMetrics>();
  for (const p of previousList) {
    prevMap.set(p.slug, p);
  }

  for (const curr of currentList) {
    const prev = prevMap.get(curr.slug);
    if (!prev) continue;

    // Detect drop in calculations (> 35% drop with minimum 15 calculations in previous period)
    if (prev.successfulCalculations >= 15 && curr.successfulCalculations < prev.successfulCalculations) {
      const dropPct = ((prev.successfulCalculations - curr.successfulCalculations) / prev.successfulCalculations) * 100;
      if (dropPct >= 35) {
        alerts.push({
          id: `drop_vol_${curr.slug}`,
          slug: curr.slug,
          calculatorName: curr.name,
          category: curr.category,
          type: 'calculation_drop',
          severity: 'warning',
          title: `Calculations Dropped by ${Math.round(dropPct)}% on ${curr.name}`,
          message: `Successful calculations fell from ${prev.successfulCalculations} to ${curr.successfulCalculations} compared to the previous period.`,
          currentValue: `${curr.successfulCalculations} calcs`,
          expectedValue: `${prev.successfulCalculations} calcs`,
          recommendedAction: 'Verify search rankings, mobile layout responsiveness, and ensure no recent script errors.',
          link: `/admin/analytics/${curr.slug}`,
        });
      }
    }
  }

  return alerts;
}
