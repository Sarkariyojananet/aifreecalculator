/**
 * Google Search Console & SEO Intelligence Types
 */

export type GscDateRange = '7d' | '28d' | '3m';

export interface GscCredentials {
  clientEmail: string;
  privateKey: string;
  propertyUrl: string; // e.g., 'https://aifreecalculator.com/' or 'sc-domain:aifreecalculator.com'
}

export interface GscMetricSummary {
  clicks: number;
  impressions: number;
  ctr: number; // Percentage e.g. 5.2%
  position: number;
}

export interface MetricDelta {
  current: number;
  previous: number;
  delta: number; // current - previous
  percentageChange: number; // ((current - previous) / previous) * 100
  isPositive: boolean; // For clicks/impressions/ctr higher is good, for position lower is good
}

export interface GscPerformanceComparison {
  dateRange: GscDateRange;
  currentPeriod: {
    startDate: string;
    endDate: string;
    summary: GscMetricSummary;
  };
  previousPeriod: {
    startDate: string;
    endDate: string;
    summary: GscMetricSummary;
  };
  deltas: {
    clicks: MetricDelta;
    impressions: MetricDelta;
    ctr: MetricDelta;
    position: MetricDelta;
  };
}

export interface GscPageRow {
  url: string;
  path: string;
  calculatorSlug?: string;
  calculatorName?: string;
  category?: string;
  icon?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  previousClicks: number;
  previousImpressions: number;
  previousCtr: number;
  previousPosition: number;
  clickChangePercent: number;
  positionChange: number;
}

export interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  previousClicks: number;
  previousImpressions: number;
  previousCtr: number;
  previousPosition: number;
  clickChangePercent: number;
  positionChange: number;
  topPageUrl?: string;
  topCalculatorSlug?: string;
}

export type OpportunityType = 'position' | 'ctr' | 'page1_potential';

export interface SeoOpportunity {
  id: string;
  type: OpportunityType;
  title: string;
  pageUrl: string;
  calculatorSlug?: string;
  calculatorName: string;
  category?: string;
  icon?: string;
  query?: string;
  currentPosition: number;
  impressions: number;
  clicks: number;
  ctr: number;
  expectedCtr?: number;
  opportunityScore: number; // 0 to 100
  potentialImpact: 'High' | 'Medium' | 'Low';
  reason: string;
  recommendedAction: string;
}

export type DecayPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ContentDecayAlert {
  id: string;
  pageUrl: string;
  calculatorSlug?: string;
  calculatorName: string;
  category?: string;
  icon?: string;
  currentClicks: number;
  previousClicks: number;
  trafficDeclinePercent: number;
  currentPosition: number;
  previousPosition: number;
  positionDrop: number;
  currentImpressions: number;
  previousImpressions: number;
  priority: DecayPriority;
  explanation: string;
  possibleCauses: string[];
  recommendedFixes: string[];
}

export interface CalculatorSeoScore {
  calculatorSlug: string;
  calculatorName: string;
  score: number; // 0 to 100
  impressionsScore: number;
  growthScore: number;
  ctrScore: number;
  metadataScore: number;
  strengths: string[];
  needsImprovement: string[];
  decayStatus?: 'Healthy' | 'Needs Review' | 'Critical';
}

export interface GscSyncSnapshot {
  status: 'connected' | 'not_configured' | 'error';
  lastSyncedAt: string | null;
  propertyUrl: string;
  clientEmail?: string;
  errorMessage?: string;
  data: {
    [key in GscDateRange]?: {
      performance: GscPerformanceComparison;
      topPages: GscPageRow[];
      topQueries: GscQueryRow[];
      opportunities: SeoOpportunity[];
      decayAlerts: ContentDecayAlert[];
      calculatorScores: Record<string, CalculatorSeoScore>;
    };
  };
}
