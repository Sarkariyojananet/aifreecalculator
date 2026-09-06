/**
 * Uptime check runner for Phase 9
 * Executes lightweight, non-blocking HTTP probes across monitored endpoints
 * and persists authentic latency & status to D1.
 */

import { MONITORED_ROUTES, recordUptimeCheck, getMonitoredRouteStatuses, getAuthenticUptimePercentage } from './store';
import type { MonitoredRouteStatus, UptimeHealthStatus } from './types';

export async function runUptimeChecks(
  origin: string,
  locals: any
): Promise<MonitoredRouteStatus[]> {
  const cleanOrigin = origin.replace(/\/$/, '');

  for (const item of MONITORED_ROUTES) {
    const targetUrl = `${cleanOrigin}${item.route}`;
    const startTime = Date.now();
    let statusCode = 0;
    let status: UptimeHealthStatus = 'down';
    let errorMessage: string | undefined;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

      const res = await fetch(targetUrl, {
        method: item.route.startsWith('/api/') ? 'GET' : 'HEAD',
        headers: {
          'User-Agent': 'AIFreeCalculator-UptimeMonitor/1.0',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      statusCode = res.status;
      const durationMs = Date.now() - startTime;

      if (res.ok) {
        status = durationMs > 2500 ? 'degraded' : 'healthy';
      } else {
        status = 'down';
        errorMessage = `HTTP ${res.status} ${res.statusText}`;
      }

      await recordUptimeCheck(locals, {
        route: item.route,
        statusCode,
        responseTimeMs: durationMs,
        status,
        errorMessage,
      });
    } catch (err: any) {
      const durationMs = Date.now() - startTime;
      statusCode = 0;
      status = 'down';
      errorMessage = err?.name === 'AbortError' ? 'Probe timed out after 8000ms' : (err?.message || 'Connection failed');

      await recordUptimeCheck(locals, {
        route: item.route,
        statusCode,
        responseTimeMs: durationMs,
        status,
        errorMessage,
      });
    }
  }

  return await getMonitoredRouteStatuses(locals);
}
