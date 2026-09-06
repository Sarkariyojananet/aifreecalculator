/**
 * Types & Interfaces for 404 Monitor & Smart Redirect Manager
 */

export type RedirectPriority = 'critical' | 'high' | 'medium' | 'low';
export type Log404Status = 'active' | 'ignored' | 'redirected';
export type DeviceCategory = 'mobile' | 'desktop' | 'tablet' | 'bot' | 'unknown';

export interface SmartSuggestion {
  destination: string;
  title: string;
  category: string;
  confidence: number; // 0 - 100
  reason: string;
}

export interface Log404Entry {
  path: string;
  firstSeen: string;
  lastSeen: string;
  hitCount: number;
  recentHitCount: number;
  recentWindowStart: string;
  referrer?: string;
  deviceCategory: DeviceCategory;
  suggestedDestination?: string;
  suggestionConfidence?: number;
  suggestionReason?: string;
  priority: RedirectPriority;
  status: Log404Status;
  redirectId?: string;
  gscImpressions?: number;
  gscClicks?: number;
}

export interface RedirectHistoryEntry {
  id: string;
  ruleId: string;
  action: 'created' | 'updated' | 'deleted' | 'toggled';
  source: string;
  destination: string;
  statusCode: 301 | 302;
  adminUser: string;
  timestamp: string;
  note?: string;
}

export interface RedirectChainStep {
  from: string;
  to: string;
  statusCode: number;
}

export interface RedirectChainWarning {
  source: string;
  currentDestination: string;
  finalDestination: string;
  steps: RedirectChainStep[];
  hopCount: number;
  recommendedAction: string;
}

export interface RedirectLoopError {
  source: string;
  destination: string;
  cycle: string[];
}

export interface RedirectSummaryKPIs {
  totalActive404s: number;
  highPriority404s: number;
  critical404s: number;
  total404Hits: number;
  redirectedCount: number;
  ignoredCount: number;
  activeRulesCount: number;
  detectedChainsCount: number;
}
