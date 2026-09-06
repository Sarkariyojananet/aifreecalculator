/**
 * Types & Interfaces for Advanced Cache & Performance Manager (Phase 6)
 */

export type CacheStrategyType =
  | 'immutable'
  | 'cdn_edge_swr'
  | 'short_edge'
  | 'no_store'
  | 'api_dynamic';

export interface CloudflareConfig {
  apiToken?: string;
  zoneId?: string;
  accountId?: string;
  status: 'connected' | 'not_connected' | 'invalid_token';
  lastVerified?: string;
  zoneName?: string;
}

export interface CacheRuleDefinition {
  id: string;
  name: string;
  category: 'static_assets' | 'calculators' | 'homepage_categories' | 'api_routes' | 'admin_panel' | 'media_metadata';
  routePattern: string;
  strategy: CacheStrategyType;
  browserTTL: string;
  edgeTTL: string;
  cacheControlHeader: string;
  cdnHeader: string;
  status: 'active' | 'custom' | 'review';
  description: string;
}

export interface RealCacheMetrics {
  connected: boolean;
  dateRange: 'today' | '7d' | '28d' | '3m';
  totalRequests: number | null;
  cachedRequests: number | null;
  uncachedRequests: number | null;
  cacheHitRate: number | null; // 0 - 100 percentage
  totalBytes: number | null;
  cachedBytes: number | null;
  bandwidthSavedPercent: number | null;
  lastUpdated: string | null;
  dataSource: 'cloudflare_api' | 'not_connected';
}

export interface RoutePerformanceRow {
  path: string;
  name: string;
  category: string;
  type: 'calculator' | 'category' | 'core_page' | 'api' | 'admin';
  strategy: CacheStrategyType;
  cacheControl: string;
  estimatedRequests: number | null;
  statusBadge: 'cached_edge' | 'static_immutable' | 'protected_no_store' | 'dynamic_api';
  canPurge: boolean;
  canWarm: boolean;
  recommendation?: string;
}

export interface CachePurgeRequest {
  target: 'url' | 'calculator' | 'category' | 'homepage' | 'everything';
  value?: string;
  confirmEverything?: boolean;
}

export interface CachePurgeResult {
  success: boolean;
  purgedTarget: string;
  purgedUrls: string[];
  cloudflarePurged: boolean;
  workerCachePurged: boolean;
  message: string;
  timestamp: string;
}

export interface CacheWarmRequest {
  urls: string[];
}

export interface CacheWarmResult {
  url: string;
  statusCode: number;
  timeMs: number;
  cfCacheStatus?: string;
  success: boolean;
}

export interface PerformanceRecommendation {
  id: string;
  severity: 'critical' | 'warning' | 'info' | 'optimal';
  title: string;
  category: 'caching' | 'assets' | 'api' | 'worker';
  issue: string;
  recommendation: string;
  actionType?: 'purge' | 'configure' | 'review';
  actionTarget?: string;
}
