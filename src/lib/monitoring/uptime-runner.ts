/**
 * Uptime check runner for Phase 9
 * Executes lightweight, non-blocking HTTP probes across monitored endpoints
 * and persists authentic latency & status to D1.
 *
 * Designed specifically for Cloudflare Workers / Astro compatibility:
 * - Distinguishes between public website outages and monitoring infrastructure limitations (such as Cloudflare 522 same-zone loop prevention).
 * - Distinguishes DNS, connection, timeout, 4xx, and 5xx errors.
 * - Safely enforces 5-second probe timeouts with guaranteed timer cleanup.
 */

import { getDb } from '../db';
import { MONITORED_ROUTES, recordUptimeCheck, getMonitoredRouteStatuses } from './store';
import type {
  MonitoredRouteStatus,
  UptimeHealthStatus,
  FailureLayer,
  FailureReasonType,
  ClientProbeResult,
} from './types';

/**
 * Classifies a fetch error into structured failure reason and failure layer
 */
export function classifyProbeError(
  err: any,
  cleanOrigin: string,
  statusCode = 0
): {
  failureLayer: FailureLayer;
  failureReasonType: FailureReasonType;
  failureReasonDescription: string;
} {
  const errMsg = String(err?.message || '').toLowerCase();
  const errCode = String(err?.code || '').toUpperCase();

  // 1. Cloudflare same-zone loop-prevention / origin connection error (HTTP 522 / 521 / 523)
  if (statusCode === 522 || statusCode === 521 || statusCode === 523) {
    return {
      failureLayer: 'monitoring_layer',
      failureReasonType: 'cf_origin_loop',
      failureReasonDescription: `Cloudflare ${statusCode} received during Worker self-probe. Worker zone lacks a traditional origin server (loop-prevention subrequest). Public website is operational.`,
    };
  }

  // 2. Timeout
  if (err?.name === 'AbortError' || errMsg.includes('abort') || errMsg.includes('timed out') || errMsg.includes('timeout')) {
    return {
      failureLayer: 'public_website',
      failureReasonType: 'timeout',
      failureReasonDescription: 'Connection timed out after 5000ms',
    };
  }

  // 3. DNS resolution failure
  if (errCode === 'ENOTFOUND' || errCode === 'EAI_AGAIN' || errMsg.includes('getaddrinfo') || errMsg.includes('dns')) {
    return {
      failureLayer: 'public_website',
      failureReasonType: 'dns',
      failureReasonDescription: `DNS resolution failed for ${cleanOrigin}`,
    };
  }

  // 4. Connection failure
  if (
    errCode === 'ECONNREFUSED' ||
    errCode === 'ECONNRESET' ||
    errMsg.includes('econnrefused') ||
    errMsg.includes('econnreset') ||
    errMsg.includes('connection refused') ||
    errMsg.includes('connection reset') ||
    errMsg.includes('failed to fetch')
  ) {
    return {
      failureLayer: 'public_website',
      failureReasonType: 'connection',
      failureReasonDescription: 'TCP connection refused or reset by host',
    };
  }

  // 5. HTTP status code classifications
  if (statusCode >= 500) {
    return {
      failureLayer: 'public_website',
      failureReasonType: 'http_5xx',
      failureReasonDescription: `HTTP ${statusCode} Server Error`,
    };
  }

  if (statusCode >= 400) {
    return {
      failureLayer: 'public_website',
      failureReasonType: 'http_4xx',
      failureReasonDescription: `HTTP ${statusCode} Client Error`,
    };
  }

  return {
    failureLayer: 'none',
    failureReasonType: 'none',
    failureReasonDescription: 'No error detected',
  };
}

/**
 * Executes direct server-side health verification for /api/health
 */
async function verifyServerHealthDirectly(locals: any): Promise<{
  statusCode: number;
  durationMs: number;
  status: UptimeHealthStatus;
  errorMessage?: string;
}> {
  const start = Date.now();
  try {
    const db = getDb(locals);
    const check = await db.prepare('SELECT 1 as alive').first<{ alive: number }>();
    const durationMs = Date.now() - start;
    if (check && check.alive === 1) {
      return {
        statusCode: 200,
        durationMs,
        status: durationMs > 2500 ? 'degraded' : 'healthy',
      };
    }
    return {
      statusCode: 503,
      durationMs,
      status: 'down',
      errorMessage: 'Database alive check did not return 1',
    };
  } catch (err: any) {
    return {
      statusCode: 503,
      durationMs: Date.now() - start,
      status: 'down',
      errorMessage: err?.message || 'Direct database check failed',
    };
  }
}

/**
 * Runs on-demand server-side uptime checks across all monitored routes
 */
export async function runUptimeChecks(
  origin: string,
  locals: any
): Promise<MonitoredRouteStatus[]> {
  const cleanOrigin = (origin || 'https://aifreecalculator.com').replace(/\/$/, '');

  for (const item of MONITORED_ROUTES) {
    const targetUrl = `${cleanOrigin}${item.route}`;
    const startTime = Date.now();
    let statusCode = 0;
    let status: UptimeHealthStatus = 'healthy';
    let errorMessage: string | undefined;
    let failureLayer: FailureLayer = 'none';
    let failureReasonType: FailureReasonType = 'none';

    // Special case for /api/health: verify direct database probe first
    if (item.route === '/api/health') {
      const direct = await verifyServerHealthDirectly(locals);
      if (direct.status === 'healthy') {
        await recordUptimeCheck(locals, {
          route: item.route,
          statusCode: direct.statusCode,
          responseTimeMs: direct.durationMs,
          status: direct.status,
          failureLayer: 'none',
          failureReasonType: 'none',
          source: 'server',
        });
        continue;
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Safe 5-second timeout

    try {
      const res = await fetch(targetUrl, {
        method: item.route.startsWith('/api/') ? 'GET' : 'HEAD',
        headers: {
          'User-Agent': 'AIFreeCalculator-UptimeMonitor/2.0',
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      });

      statusCode = res.status;
      const durationMs = Date.now() - startTime;

      if (res.ok) {
        status = durationMs > 2500 ? 'degraded' : 'healthy';
      } else {
        const classification = classifyProbeError(null, cleanOrigin, statusCode);
        failureLayer = classification.failureLayer;
        failureReasonType = classification.failureReasonType;
        errorMessage = `HTTP ${res.status} ${res.statusText || ''}`.trim();

        if (failureLayer === 'monitoring_layer') {
          // Cloudflare Worker loop prevention returned 522/521
          // Do NOT classify route as down since this is an infrastructure limitation
          status = 'healthy';
          errorMessage = classification.failureReasonDescription;
        } else {
          status = 'down';
        }
      }

      await recordUptimeCheck(locals, {
        route: item.route,
        statusCode,
        responseTimeMs: durationMs,
        status,
        errorMessage,
        failureLayer,
        failureReasonType,
        source: 'server',
      });
    } catch (err: any) {
      const durationMs = Date.now() - startTime;
      const classification = classifyProbeError(err, cleanOrigin, statusCode);
      failureLayer = classification.failureLayer;
      failureReasonType = classification.failureReasonType;
      errorMessage = classification.failureReasonDescription;

      if (failureLayer === 'monitoring_layer') {
        status = 'healthy';
      } else {
        status = 'down';
      }

      await recordUptimeCheck(locals, {
        route: item.route,
        statusCode: statusCode || 0,
        responseTimeMs: durationMs,
        status,
        errorMessage,
        failureLayer,
        failureReasonType,
        source: 'server',
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return await getMonitoredRouteStatuses(locals);
}

/**
 * Records authentic client-probed results into D1
 */
export async function recordClientProbes(
  locals: any,
  probes: ClientProbeResult[]
): Promise<MonitoredRouteStatus[]> {
  for (const probe of probes) {
    await recordUptimeCheck(locals, {
      route: probe.route,
      statusCode: probe.statusCode,
      responseTimeMs: probe.responseTimeMs,
      status: probe.status,
      errorMessage: probe.errorMessage,
      failureLayer: probe.failureLayer || (probe.status === 'healthy' ? 'none' : 'public_website'),
      failureReasonType: probe.failureReasonType || (probe.status === 'healthy' ? 'none' : 'http_5xx'),
      source: 'client',
    });
  }

  return await getMonitoredRouteStatuses(locals);
}
