/**
 * Types & Interfaces for Calculator Performance & Conversion Analytics (Phase 4)
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'calculator_start'
  | 'input_change'
  | 'calculate_click'
  | 'calculation_success'
  | 'calculation_error'
  | 'result_copy'
  | 'result_share'
  | 'calculator_reset';

export type AnalyticsDateRange = 'today' | '7d' | '28d' | '3m';
export type DeviceCategory = 'mobile' | 'desktop' | 'tablet' | 'bot' | 'unknown';
export type TrafficSourceCategory = 'organic' | 'direct' | 'referral' | 'social' | 'other';

export interface DailyAnalyticsRecord {
  id: string; // `${slug}_${date}`
  calculatorSlug: string;
  date: string; // YYYY-MM-DD
  pageViews: number;
  calculatorStarts: number;
  calculateClicks: number;
  successfulCalculations: number;
  calculationErrors: number;
  resultCopies: number;
  resultShares: number;
  resets: number;
  mobileCount: number;
  desktopCount: number;
  tabletCount: number;
  organicCount: number;
  directCount: number;
  referralCount: number;
  socialCount: number;
  updatedAt: string;
}

export interface FunnelStage {
  name: string;
  count: number;
  percentageOfViews: number;
  dropOffFromPrevious: number; // 0 - 100 percentage
}

export interface CalculatorFunnelMetrics {
  slug: string;
  name: string;
  category: string;
  path: string;
  pageViews: number;
  calculatorStarts: number;
  calculateClicks: number;
  successfulCalculations: number;
  calculationErrors: number;
  resultCopies: number;
  resultShares: number;
  resets: number;
  // Computed Rates
  startRate: number; // starts / pageViews (0-100%)
  calculateRate: number; // clicks / starts (0-100%)
  successRate: number; // successful / clicks (0-100%)
  resultEngagementRate: number; // (copies + shares) / successful (0-100%)
  // Funnel Stages
  stages: FunnelStage[];
  // Device & Traffic Distribution
  deviceSplit: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  sourceSplit: {
    organic: number;
    direct: number;
    referral: number;
    social: number;
  };
  conversionScore: number; // 0 - 100
  conversionGrade: 'optimal' | 'good' | 'needs_attention' | 'critical';
  strengths: string[];
  needsImprovement: string[];
}

export interface MetricDelta {
  current: number;
  previous: number;
  delta: number;
  percentChange: number;
  isPositive: boolean;
}

export interface GlobalAnalyticsKPIs {
  totalPageViews: MetricDelta;
  totalCalculations: MetricDelta;
  averageSuccessRate: MetricDelta;
  averageStartRate: MetricDelta;
  totalEngagements: MetricDelta;
  topPerformingSlug: string;
  topPerformingName: string;
  activeCalculatorsCount: number;
}

export interface AnalyticsAnomalyAlert {
  id: string;
  slug: string;
  calculatorName: string;
  category: string;
  type: 'error_spike' | 'calculation_drop' | 'low_start_rate' | 'high_drop_off';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  currentValue: string;
  expectedValue: string;
  recommendedAction: string;
  link: string;
}
