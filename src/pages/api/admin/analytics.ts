/**
 * GET /api/admin/analytics
 * Authenticated Admin API for Calculator Performance & Conversion Analytics (Phase 4).
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getCalculatorsFunnelMetrics,
  getCalculatorDetailFunnel,
  getGlobalAnalyticsKPIs,
} from '../../../lib/analytics/store';
import {
  detectUnderperformingCalculators,
  detectAnalyticsAnomalies,
} from '../../../lib/analytics/scorer';
import type { AnalyticsDateRange } from '../../../lib/analytics/types';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const searchParams = url.searchParams;
    const range = (searchParams.get('range') || '28d') as AnalyticsDateRange;
    const slug = searchParams.get('slug');
    const sort = (searchParams.get('sort') || 'conversionScore') as any;

    // Single calculator detail request
    if (slug) {
      const detail = await getCalculatorDetailFunnel(slug, range, locals);
      if (!detail) {
        return new Response(JSON.stringify({ error: `Calculator '${slug}' not found` }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true, range, detail }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Global dashboard request
    const [kpis, currentMetrics, prevMetrics] = await Promise.all([
      getGlobalAnalyticsKPIs(range, locals),
      getCalculatorsFunnelMetrics(range, sort, locals),
      getCalculatorsFunnelMetrics(range, 'conversionScore', locals), // For anomaly comparison
    ]);

    // Detect anomalies and underperforming calculators
    const underperformingAlerts = detectUnderperformingCalculators(currentMetrics);
    const trendAnomalies = detectAnalyticsAnomalies(currentMetrics, prevMetrics);
    const combinedAlerts = [...underperformingAlerts, ...trendAnomalies];

    return new Response(
      JSON.stringify({
        success: true,
        range,
        kpis,
        calculators: currentMetrics,
        alerts: combinedAlerts,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to fetch analytics metrics',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
