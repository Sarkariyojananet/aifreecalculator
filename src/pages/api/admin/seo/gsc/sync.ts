import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../lib/auth';
import { syncGscPerformanceData } from '../../../../../lib/seo/gsc-store';
import type { GscDateRange } from '../../../../../lib/seo/gsc-types';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let range: GscDateRange = '28d';
    try {
      const body = await request.json();
      if (body?.range) range = body.range;
    } catch {
      const queryRange = url.searchParams.get('range');
      if (queryRange === '7d' || queryRange === '28d' || queryRange === '3m') {
        range = queryRange;
      }
    }

    // Force refresh from live Google Search Console API
    const snapshot = await syncGscPerformanceData(locals, range, true);

    if (snapshot.status === 'error') {
      return new Response(
        JSON.stringify({
          success: false,
          error: snapshot.errorMessage || 'Failed to sync with Search Console API',
          snapshot,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Search Console data synchronized successfully.',
        snapshot,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Sync request failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
