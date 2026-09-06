/**
 * Types & Interfaces for AdSense Revenue & Monetization Analytics (Phase 8)
 */

export type MonetizationDateRange = 'today' | 'yesterday' | '7d' | '28d' | '3m' | 'custom';

export type AdSenseConnectionStatus = 'not_connected' | 'connected' | 'error';

export interface AdSenseConfig {
  clientId: string;
  clientSecret: string;
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpiresAt?: number;
  accountId?: string; // e.g. "accounts/pub-XXXXXXXXXXXXXXXX" or "pub-XXXXXXXXXXXXXXXX"
  displayName?: string;
  currency?: string; // e.g. "INR", "USD"
  connectedAt?: string;
  lastSyncAt?: string;
  status: AdSenseConnectionStatus;
  lastError?: string;
}

export interface MaskedAdSenseConfig {
  clientId: string;
  maskedClientSecret: string;
  hasRefreshToken: boolean;
  accountId: string;
  displayName: string;
  currency: string;
  connectedAt: string;
  lastSyncAt: string;
  status: AdSenseConnectionStatus;
  lastError?: string;
}

export interface DailyAdSenseMetric {
  id: string; // `${accountId}_${date}`
  date: string; // YYYY-MM-DD
  accountId: string;
  estimatedEarnings: number;
  currency: string;
  impressions: number;
  pageViews: number | null;
  clicks: number | null;
  pageViewsRpm: number | null;
  impressionsRpm: number | null;
  syncedAt: string;
}

export interface MetricDelta {
  current: number;
  previous: number;
  delta: number;
  percentChange: number;
  isPositive: boolean;
  isAvailable: boolean;
}

export interface MonetizationKPIs {
  estimatedRevenue: MetricDelta & { currency: string };
  impressions: MetricDelta;
  pageViews: MetricDelta;
  pageRpm: MetricDelta & { currency: string };
  impressionRpm: MetricDelta & { currency: string };
  clicks: MetricDelta;
  hasData: boolean;
  currency: string;
}

export interface RevenueTrendPoint {
  date: string;
  label: string;
  revenue: number;
  impressions: number;
  pageViews: number | null;
  rpm: number | null;
}

export interface CalculatorTrafficEngagementItem {
  slug: string;
  name: string;
  category: string;
  path: string;
  pageViews: number;
  calculations: number;
  startRate: number;
  completionRate: number;
}

export interface MonetizationOpportunity {
  id: string;
  type: 'traffic_monetization_gap' | 'revenue_decline' | 'high_rpm_expansion' | 'seo_monetization_correlation';
  title: string;
  severity: 'info' | 'warning' | 'opportunity';
  description: string;
  category?: string;
  evidence: string;
  recommendation: string;
}

export interface MonetizationSummary {
  connected: boolean;
  config: MaskedAdSenseConfig;
  range: MonetizationDateRange;
  rangeLabel: string;
  startDate: string;
  endDate: string;
  prevStartDate: string;
  prevEndDate: string;
  kpis: MonetizationKPIs;
  trend: RevenueTrendPoint[];
  opportunities: MonetizationOpportunity[];
  calculatorEngagement: CalculatorTrafficEngagementItem[];
  pageLevelDisclaimer: string;
  lastSyncAt: string | null;
}
