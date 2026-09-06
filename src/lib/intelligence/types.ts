/**
 * Types for Phase 10: Complete AI Website Intelligence Hub
 * aifreecalculator.com
 */

export type InsightPriority = 'P0' | 'P1' | 'P2' | 'P3';
export type InsightCategory =
  | 'critical'
  | 'seo'
  | 'health'
  | 'conversion'
  | 'performance'
  | 'revenue'
  | 'errors'
  | '404'
  | 'deployment';

export type InsightStatus = 'new' | 'active' | 'acknowledged' | 'resolved' | 'ignored';
export type ConfidenceLevel = 'high' | 'medium' | 'limited';

export type CorrelationType =
  | 'seo_conversion'
  | 'health_conversion'
  | 'performance_conversion'
  | 'seo_revenue'
  | '404_seo'
  | 'error_deployment';

export interface SupportingMetric {
  label: string;
  current: string | number;
  previous?: string | number;
  change?: string;
}

export interface RecommendedAction {
  label: string;
  url: string;
  actionType: 'investigate' | 'optimize' | 'fix' | 'review';
}

export interface AffectedEntity {
  name: string;
  path?: string;
  type: 'calculator' | 'route' | 'system' | 'global';
}

export interface IntelligenceInsight {
  id: string;
  title: string;
  priority: InsightPriority;
  priorityReason: string;
  category: InsightCategory;
  affectedEntity: AffectedEntity;
  whyDetected: string;
  supportingMetrics: SupportingMetric[];
  recommendedAction: RecommendedAction;
  dataSources: string[];
  detectedAt: string;
  confidence: ConfidenceLevel;
  status: InsightStatus;
  correlationType?: CorrelationType;
}

export interface DataCoverageStatus {
  sourceId: string;
  name: string;
  status: 'connected' | 'active' | 'limited' | 'not_connected';
  description: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface DataCoverageReport {
  overallPercentage: number;
  connectedCount: number;
  totalSources: number;
  sources: DataCoverageStatus[];
}

export interface HealthScoreComponent {
  name: string;
  score: number;
  weight: number;
  status: 'optimal' | 'good' | 'needs_attention' | 'critical' | 'not_enough_data';
  summary: string;
}

export interface WebsiteScoreBreakdown {
  overallScore: number;
  confidence: ConfidenceLevel;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  components: Record<string, HealthScoreComponent>;
  formulaExplanation: string;
}

export interface WebsiteBriefing {
  period: string;
  generatedAt: string;
  overallStatusSummary: string;
  biggestWin: { title: string; detail: string } | null;
  biggestRisk: { title: string; detail: string } | null;
  seoHighlight: string | null;
  revenueHighlight: string | null;
  performanceHighlight: string | null;
  recommendedNextSteps: string[];
  isAiGenerated: boolean;
  aiProvider?: string;
}

export interface IntelligenceOverviewReport {
  healthScore: WebsiteScoreBreakdown;
  coverage: DataCoverageReport;
  briefing: WebsiteBriefing;
  topPriorities: IntelligenceInsight[];
  insights: IntelligenceInsight[];
  totalInsightsCount: number;
  countsByPriority: Record<InsightPriority, number>;
  countsByCategory: Record<string, number>;
  aiStatus: {
    isConfigured: boolean;
    provider?: string;
    model?: string;
  };
}
