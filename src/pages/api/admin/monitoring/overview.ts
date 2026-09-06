import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getDeploymentRecords } from '../../../../lib/monitoring/deployment-client';
import {
  getErrorGroups,
  getIncidents,
  getMonitoredRouteStatuses,
  getAuthenticUptimePercentage,
} from '../../../../lib/monitoring/store';

export const prerender = false;

/**
 * GET /api/admin/monitoring/overview
 * Authenticated endpoint returning comprehensive real deployment and health monitoring metrics.
 */
export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const [deploymentsData, errorGroups, incidents, monitoredRoutes, uptimeData] = await Promise.all([
      getDeploymentRecords(locals),
      getErrorGroups(locals, { limit: 50 }),
      getIncidents(locals, { limit: 20 }),
      getMonitoredRouteStatuses(locals),
      getAuthenticUptimePercentage(locals),
    ]);

    const openIncidents = incidents.filter((i) => i.status === 'open' || i.status === 'investigating');
    const criticalErrors = errorGroups.filter((e) => e.severity === 'critical' && e.status === 'open');

    let overallStatus: 'healthy' | 'degraded' | 'outage' | 'unknown' = 'healthy';
    let overallStatusLabel = 'All Systems Operational';

    const hasRouteDown = monitoredRoutes.some((r) => r.status === 'down');
    const hasRouteDegraded = monitoredRoutes.some((r) => r.status === 'degraded');

    if (hasRouteDown || openIncidents.some((i) => i.severity === 'critical')) {
      overallStatus = 'outage';
      overallStatusLabel = 'Critical Incident Detected';
    } else if (hasRouteDegraded || openIncidents.length > 0 || criticalErrors.length > 0) {
      overallStatus = 'degraded';
      overallStatusLabel = 'Degraded Performance';
    }

    return new Response(
      JSON.stringify({
        success: true,
        summary: {
          overallStatus,
          overallStatusLabel,
          deployment: deploymentsData.current,
          deploymentHistory: deploymentsData.history,
          deploymentDataSource: deploymentsData.dataSource,
          openIncidentsCount: openIncidents.length,
          criticalErrorsCount: criticalErrors.length,
          totalErrorGroupsCount: errorGroups.length,
          monitoredRoutes,
          uptimePercentage: uptimeData.percentage,
          totalUptimeChecks: uptimeData.totalChecks,
          hasUptimeHistory: uptimeData.totalChecks >= 5,
        },
        errorGroups,
        incidents,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to fetch monitoring overview' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
