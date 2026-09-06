/**
 * Cloudflare D1 Storage & Aggregation Engine for Calculator Analytics (Phase 4)
 */

import { getDb } from '../db';
import { calculators } from '../../data/calculators';
import type {
  AnalyticsDateRange,
  AnalyticsEventType,
  DailyAnalyticsRecord,
  DeviceCategory,
  GlobalAnalyticsKPIs,
  MetricDelta,
  TrafficSourceCategory,
  CalculatorFunnelMetrics,
  FunnelStage,
} from './types';
import { calculateConversionScore } from './scorer';

let tablesInitialized = false;

/**
 * Initializes the daily aggregated analytics table and indexes in Cloudflare D1.
 */
export async function initAnalyticsStore(locals?: any): Promise<void> {
  if (tablesInitialized) return;
  const db = getDb(locals);

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS cms_calc_daily_analytics (
        id TEXT PRIMARY KEY,
        calculator_slug TEXT NOT NULL,
        date TEXT NOT NULL,
        page_views INTEGER NOT NULL DEFAULT 0,
        calculator_starts INTEGER NOT NULL DEFAULT 0,
        calculate_clicks INTEGER NOT NULL DEFAULT 0,
        successful_calculations INTEGER NOT NULL DEFAULT 0,
        calculation_errors INTEGER NOT NULL DEFAULT 0,
        result_copies INTEGER NOT NULL DEFAULT 0,
        result_shares INTEGER NOT NULL DEFAULT 0,
        resets INTEGER NOT NULL DEFAULT 0,
        mobile_count INTEGER NOT NULL DEFAULT 0,
        desktop_count INTEGER NOT NULL DEFAULT 0,
        tablet_count INTEGER NOT NULL DEFAULT 0,
        organic_count INTEGER NOT NULL DEFAULT 0,
        direct_count INTEGER NOT NULL DEFAULT 0,
        referral_count INTEGER NOT NULL DEFAULT 0,
        social_count INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_daily_analytics_slug_date ON cms_calc_daily_analytics(calculator_slug, date);
      CREATE INDEX IF NOT EXISTS idx_daily_analytics_date ON cms_calc_daily_analytics(date);
    `);
    tablesInitialized = true;
  } catch {
    // Fail safely if in mock / read-only mode
  }
}

/**
 * Returns formatted YYYY-MM-DD date string.
 */
export function formatDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Resolves date intervals for current and previous equivalent comparison periods.
 */
export function resolveDateIntervals(range: AnalyticsDateRange): {
  currentStart: string;
  currentEnd: string;
  prevStart: string;
  prevEnd: string;
  days: number;
} {
  const now = new Date();
  const currentEnd = formatDateKey(now);

  let days = 7;
  if (range === 'today') days = 1;
  else if (range === '7d') days = 7;
  else if (range === '28d') days = 28;
  else if (range === '3m') days = 90;

  const curStartDt = new Date(now.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
  const currentStart = formatDateKey(curStartDt);

  const prevEndDt = new Date(curStartDt.getTime() - 24 * 60 * 60 * 1000);
  const prevEnd = formatDateKey(prevEndDt);

  const prevStartDt = new Date(prevEndDt.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
  const prevStart = formatDateKey(prevStartDt);

  return {
    currentStart,
    currentEnd,
    prevStart,
    prevEnd,
    days,
  };
}

/**
 * Records a single calculator analytics event atomically into daily aggregated buckets.
 */
export async function recordCalculatorAnalyticsEvent(
  params: {
    slug: string;
    eventType: AnalyticsEventType;
    device?: DeviceCategory;
    source?: TrafficSourceCategory;
  },
  locals?: any
): Promise<void> {
  await initAnalyticsStore(locals);
  const db = getDb(locals);

  const cleanSlug = params.slug.trim().toLowerCase();
  const today = formatDateKey(new Date());
  const id = `${cleanSlug}_${today}`;
  const now = new Date().toISOString();

  // Determine which column to increment
  let col = 'page_views';
  if (params.eventType === 'calculator_start') col = 'calculator_starts';
  else if (params.eventType === 'calculate_click') col = 'calculate_clicks';
  else if (params.eventType === 'calculation_success') col = 'successful_calculations';
  else if (params.eventType === 'calculation_error') col = 'calculation_errors';
  else if (params.eventType === 'result_copy') col = 'result_copies';
  else if (params.eventType === 'result_share') col = 'result_shares';
  else if (params.eventType === 'calculator_reset') col = 'resets';

  // Device column
  const devCol =
    params.device === 'mobile'
      ? 'mobile_count'
      : params.device === 'tablet'
      ? 'tablet_count'
      : 'desktop_count';

  // Source column
  const srcCol =
    params.source === 'organic'
      ? 'organic_count'
      : params.source === 'direct'
      ? 'direct_count'
      : params.source === 'social'
      ? 'social_count'
      : 'referral_count';

  try {
    await db
      .prepare(`
        INSERT INTO cms_calc_daily_analytics (
          id, calculator_slug, date, ${col}, ${devCol}, ${srcCol}, updated_at
        ) VALUES (?, ?, ?, 1, 1, 1, ?)
        ON CONFLICT(id) DO UPDATE SET
          ${col} = ${col} + 1,
          ${devCol} = ${devCol} + 1,
          ${srcCol} = ${srcCol} + 1,
          updated_at = excluded.updated_at
      `)
      .bind(id, cleanSlug, today, now)
      .run();
  } catch {
    // Fail safely; analytics must never throw
  }
}

/**
 * Calculates percentage delta and comparison object.
 */
function computeMetricDelta(current: number, previous: number, higherIsBetter = true): MetricDelta {
  const delta = current - previous;
  const percentChange = previous > 0 ? Number(((delta / previous) * 100).toFixed(1)) : current > 0 ? 100 : 0;
  const isPositive = higherIsBetter ? delta >= 0 : delta <= 0;

  return {
    current,
    previous,
    delta,
    percentChange,
    isPositive,
  };
}

export interface AggregatedRow {
  calculator_slug: string;
  page_views: number;
  calculator_starts: number;
  calculate_clicks: number;
  successful_calculations: number;
  calculation_errors: number;
  result_copies: number;
  result_shares: number;
  resets: number;
  mobile_count: number;
  desktop_count: number;
  tablet_count: number;
  organic_count: number;
  direct_count: number;
  referral_count: number;
  social_count: number;
}

/**
 * Aggregates analytics across all calculators for a given date window.
 */
export async function getAggregatedCalculatorMetrics(
  startDate: string,
  endDate: string,
  locals?: any
): Promise<Record<string, AggregatedRow>> {
  await initAnalyticsStore(locals);
  const db = getDb(locals);

  try {
    const rows = await db
      .prepare(`
        SELECT
          calculator_slug,
          COALESCE(SUM(page_views), 0) as page_views,
          COALESCE(SUM(calculator_starts), 0) as calculator_starts,
          COALESCE(SUM(calculate_clicks), 0) as calculate_clicks,
          COALESCE(SUM(successful_calculations), 0) as successful_calculations,
          COALESCE(SUM(calculation_errors), 0) as calculation_errors,
          COALESCE(SUM(result_copies), 0) as result_copies,
          COALESCE(SUM(result_shares), 0) as result_shares,
          COALESCE(SUM(resets), 0) as resets,
          COALESCE(SUM(mobile_count), 0) as mobile_count,
          COALESCE(SUM(desktop_count), 0) as desktop_count,
          COALESCE(SUM(tablet_count), 0) as tablet_count,
          COALESCE(SUM(organic_count), 0) as organic_count,
          COALESCE(SUM(direct_count), 0) as direct_count,
          COALESCE(SUM(referral_count), 0) as referral_count,
          COALESCE(SUM(social_count), 0) as social_count
        FROM cms_calc_daily_analytics
        WHERE date >= ? AND date <= ?
        GROUP BY calculator_slug
      `)
      .bind(startDate, endDate)
      .all<AggregatedRow>();

    const map: Record<string, AggregatedRow> = {};
    for (const r of rows?.results || []) {
      map[r.calculator_slug] = r;
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Retrieves global analytics KPI metrics with period-over-period comparison.
 */
export async function getGlobalAnalyticsKPIs(
  range: AnalyticsDateRange = '28d',
  locals?: any
): Promise<GlobalAnalyticsKPIs> {
  const { currentStart, currentEnd, prevStart, prevEnd } = resolveDateIntervals(range);

  const curMap = await getAggregatedCalculatorMetrics(currentStart, currentEnd, locals);
  const prevMap = await getAggregatedCalculatorMetrics(prevStart, prevEnd, locals);

  let curViews = 0, curCalcs = 0, curStarts = 0, curSuccess = 0, curErrors = 0, curEngagements = 0;
  let prevViews = 0, prevCalcs = 0, prevStarts = 0, prevSuccess = 0, prevErrors = 0, prevEngagements = 0;

  let topSlug = '';
  let topCalcCount = -1;

  for (const [slug, row] of Object.entries(curMap)) {
    curViews += row.page_views;
    curCalcs += row.successful_calculations;
    curStarts += row.calculator_starts;
    curSuccess += row.successful_calculations;
    curErrors += row.calculation_errors;
    curEngagements += row.result_copies + row.result_shares;

    if (row.successful_calculations > topCalcCount) {
      topCalcCount = row.successful_calculations;
      topSlug = slug;
    }
  }

  for (const row of Object.values(prevMap)) {
    prevViews += row.page_views;
    prevCalcs += row.successful_calculations;
    prevStarts += row.calculator_starts;
    prevSuccess += row.successful_calculations;
    prevErrors += row.calculation_errors;
    prevEngagements += row.result_copies + row.result_shares;
  }

  const curSuccessRate = (curSuccess + curErrors) > 0
    ? Number(((curSuccess / (curSuccess + curErrors)) * 100).toFixed(1))
    : 100;
  const prevSuccessRate = (prevSuccess + prevErrors) > 0
    ? Number(((prevSuccess / (prevSuccess + prevErrors)) * 100).toFixed(1))
    : 100;

  const curStartRate = curViews > 0 ? Number(((curStarts / curViews) * 100).toFixed(1)) : 0;
  const prevStartRate = prevViews > 0 ? Number(((prevStarts / prevViews) * 100).toFixed(1)) : 0;

  const topCalc = calculators.find((c) => c.slug === topSlug);

  return {
    totalPageViews: computeMetricDelta(curViews, prevViews),
    totalCalculations: computeMetricDelta(curCalcs, prevCalcs),
    averageSuccessRate: computeMetricDelta(curSuccessRate, prevSuccessRate),
    averageStartRate: computeMetricDelta(curStartRate, prevStartRate),
    totalEngagements: computeMetricDelta(curEngagements, prevEngagements),
    topPerformingSlug: topSlug || (calculators[0]?.slug ?? 'emi-calculator'),
    topPerformingName: topCalc ? topCalc.name : 'EMI Calculator',
    activeCalculatorsCount: Object.keys(curMap).length,
  };
}

/**
 * Builds complete funnel metrics and conversion scoring for a specific calculator.
 */
export async function getCalculatorDetailFunnel(
  slug: string,
  range: AnalyticsDateRange = '28d',
  locals?: any
): Promise<CalculatorFunnelMetrics | null> {
  const calc = calculators.find((c) => c.slug === slug || c.slug === `${slug}-calculator`);
  if (!calc) return null;

  const { currentStart, currentEnd } = resolveDateIntervals(range);
  const curMap = await getAggregatedCalculatorMetrics(currentStart, currentEnd, locals);
  const row = curMap[calc.slug] || {
    calculator_slug: calc.slug,
    page_views: 0,
    calculator_starts: 0,
    calculate_clicks: 0,
    successful_calculations: 0,
    calculation_errors: 0,
    result_copies: 0,
    result_shares: 0,
    resets: 0,
    mobile_count: 0,
    desktop_count: 0,
    tablet_count: 0,
    organic_count: 0,
    direct_count: 0,
    referral_count: 0,
    social_count: 0,
  };

  const pv = row.page_views;
  const cs = row.calculator_starts;
  const cc = row.calculate_clicks;
  const sc = row.successful_calculations;
  const ce = row.calculation_errors;
  const rc = row.result_copies;
  const rs = row.result_shares;
  const resets = row.resets;

  const startRate = pv > 0 ? Number(((cs / pv) * 100).toFixed(1)) : 0;
  const calculateRate = cs > 0 ? Number(((cc / cs) * 100).toFixed(1)) : 0;
  const successRate = (sc + ce) > 0 ? Number(((sc / (sc + ce)) * 100).toFixed(1)) : 100;
  const resultEngagementRate = sc > 0 ? Number((((rc + rs) / sc) * 100).toFixed(1)) : 0;

  // Build 4 Funnel Stages
  const stages: FunnelStage[] = [
    {
      name: 'Page Viewed',
      count: pv,
      percentageOfViews: 100,
      dropOffFromPrevious: 0,
    },
    {
      name: 'Calculator Started',
      count: cs,
      percentageOfViews: pv > 0 ? Number(((cs / pv) * 100).toFixed(1)) : 0,
      dropOffFromPrevious: pv > 0 ? Number(((1 - cs / pv) * 100).toFixed(1)) : 0,
    },
    {
      name: 'Calculate Clicked',
      count: cc,
      percentageOfViews: pv > 0 ? Number(((cc / pv) * 100).toFixed(1)) : 0,
      dropOffFromPrevious: cs > 0 ? Number(((1 - cc / cs) * 100).toFixed(1)) : 0,
    },
    {
      name: 'Successful Results',
      count: sc,
      percentageOfViews: pv > 0 ? Number(((sc / pv) * 100).toFixed(1)) : 0,
      dropOffFromPrevious: cc > 0 ? Number(((1 - sc / cc) * 100).toFixed(1)) : 0,
    },
  ];

  // Device Split (Normalized %)
  const totalDev = row.mobile_count + row.desktop_count + row.tablet_count;
  const deviceSplit = {
    mobile: totalDev > 0 ? Math.round((row.mobile_count / totalDev) * 100) : 0,
    desktop: totalDev > 0 ? Math.round((row.desktop_count / totalDev) * 100) : 0,
    tablet: totalDev > 0 ? Math.round((row.tablet_count / totalDev) * 100) : 0,
  };

  // Source Split (Normalized %)
  const totalSrc = row.organic_count + row.direct_count + row.referral_count + row.social_count;
  const sourceSplit = {
    organic: totalSrc > 0 ? Math.round((row.organic_count / totalSrc) * 100) : 0,
    direct: totalSrc > 0 ? Math.round((row.direct_count / totalSrc) * 100) : 0,
    referral: totalSrc > 0 ? Math.round((row.referral_count / totalSrc) * 100) : 0,
    social: totalSrc > 0 ? Math.round((row.social_count / totalSrc) * 100) : 0,
  };

  // Compute 0 - 100 Conversion Score
  const scoreResult = calculateConversionScore({
    pageViews: pv,
    calculatorStarts: cs,
    calculateClicks: cc,
    successfulCalculations: sc,
    calculationErrors: ce,
    resultCopies: rc,
    resultShares: rs,
  });

  return {
    slug: calc.slug,
    name: calc.name,
    category: calc.category,
    path: calc.path,
    pageViews: pv,
    calculatorStarts: cs,
    calculateClicks: cc,
    successfulCalculations: sc,
    calculationErrors: ce,
    resultCopies: rc,
    resultShares: rs,
    resets,
    startRate,
    calculateRate,
    successRate,
    resultEngagementRate,
    stages,
    deviceSplit,
    sourceSplit,
    conversionScore: scoreResult.score,
    conversionGrade: scoreResult.grade,
    strengths: scoreResult.strengths,
    needsImprovement: scoreResult.needsImprovement,
  };
}

/**
 * Retrieves all calculators funnel metrics, computed rates, and conversion scores.
 */
export async function getCalculatorsFunnelMetrics(
  range: AnalyticsDateRange = '28d',
  sort: 'conversionScore' | 'pageViews' | 'calculations' | 'startRate' | 'successRate' = 'conversionScore',
  locals?: any
): Promise<CalculatorFunnelMetrics[]> {
  const list: CalculatorFunnelMetrics[] = [];

  for (const calc of calculators) {
    const detail = await getCalculatorDetailFunnel(calc.slug, range, locals);
    if (detail) {
      list.push(detail);
    }
  }

  // Sort list by requested metric
  if (sort === 'pageViews') {
    list.sort((a, b) => b.pageViews - a.pageViews);
  } else if (sort === 'calculations') {
    list.sort((a, b) => b.successfulCalculations - a.successfulCalculations);
  } else if (sort === 'startRate') {
    list.sort((a, b) => b.startRate - a.startRate);
  } else if (sort === 'successRate') {
    list.sort((a, b) => b.successRate - a.successRate);
  } else {
    // Default by conversion score descending
    list.sort((a, b) => b.conversionScore - a.conversionScore);
  }

  return list;
}

/**
 * Retrieves daily timeline points for trend chart rendering.
 */
export async function getCalculatorTimeline(
  slug: string,
  range: AnalyticsDateRange = '28d',
  locals?: any
): Promise<DailyAnalyticsRecord[]> {
  await initAnalyticsStore(locals);
  const db = getDb(locals);
  const { currentStart, currentEnd } = resolveDateIntervals(range);

  try {
    const rows = await db
      .prepare(`
        SELECT * FROM cms_calc_daily_analytics
        WHERE calculator_slug = ? AND date >= ? AND date <= ?
        ORDER BY date ASC
      `)
      .bind(slug, currentStart, currentEnd)
      .all<any>();

    return (rows?.results || []).map((r) => ({
      id: r.id,
      calculatorSlug: r.calculator_slug,
      date: r.date,
      pageViews: r.page_views || 0,
      calculatorStarts: r.calculator_starts || 0,
      calculateClicks: r.calculate_clicks || 0,
      successfulCalculations: r.successful_calculations || 0,
      calculationErrors: r.calculation_errors || 0,
      resultCopies: r.result_copies || 0,
      resultShares: r.result_shares || 0,
      resets: r.resets || 0,
      mobileCount: r.mobile_count || 0,
      desktopCount: r.desktop_count || 0,
      tabletCount: r.tablet_count || 0,
      organicCount: r.organic_count || 0,
      directCount: r.direct_count || 0,
      referralCount: r.referral_count || 0,
      socialCount: r.social_count || 0,
      updatedAt: r.updated_at,
    }));
  } catch {
    return [];
  }
}
