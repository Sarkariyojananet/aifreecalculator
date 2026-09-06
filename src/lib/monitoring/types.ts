/**
 * Types for Phase 9: Deployment, Error & Site Monitoring
 * aifreecalculator.com
 */

export type ErrorSeverity = 'critical' | 'error' | 'warning';
export type ErrorCategory = 'worker_server' | 'api' | 'calculator_runtime' | 'client_js' | 'background';
export type ErrorStatus = 'open' | 'investigating' | 'resolved' | 'ignored';

export interface ErrorGroup {
  id: string;
  fingerprint: string;
  route: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  firstSeen: string;
  lastSeen: string;
  occurrenceCount: number;
  latestMessage: string;
  status: ErrorStatus;
}

export type UptimeHealthStatus = 'healthy' | 'degraded' | 'down';

export interface UptimeCheck {
  id: string;
  route: string;
  checkedAt: string;
  statusCode: number;
  responseTimeMs: number;
  status: UptimeHealthStatus;
  errorMessage?: string;
}

export interface MonitoredRouteStatus {
  route: string;
  label: string;
  category: 'core' | 'calculator' | 'api';
  status: UptimeHealthStatus | 'unknown';
  statusCode?: number;
  responseTimeMs?: number;
  lastCheckedAt?: string;
  responseClassification?: 'good' | 'slow' | 'very_slow' | 'down' | 'unknown';
  recentFailureCount?: number;
}

export type IncidentSeverity = 'critical' | 'warning' | 'info';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'ignored';

export interface SiteIncident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  affectedRoute: string;
  detectedAt: string;
  updatedAt: string;
  summary: string;
  occurrenceCount: number;
  status: IncidentStatus;
}

export interface DeploymentRecord {
  id: string;
  version: string;
  environment: string;
  status: 'active' | 'healthy' | 'warning' | 'failed' | 'unknown';
  deployedAt: string;
  commitSha?: string;
  commitMessage?: string;
  commitAuthor?: string;
  source: string;
  isCurrentProduction: boolean;
}

export interface SystemHealthSummary {
  overallStatus: 'healthy' | 'degraded' | 'outage' | 'unknown';
  overallStatusLabel: string;
  deployment: DeploymentRecord;
  openIncidentsCount: number;
  criticalErrorsLast24h: number;
  totalErrorsLast24h: number;
  monitoredRoutes: MonitoredRouteStatus[];
  uptimePercentage?: number;
  hasUptimeHistory: boolean;
}
