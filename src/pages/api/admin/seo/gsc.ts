import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getGscCredentials, saveGscCredentials, syncGscPerformanceData } from '../../../../lib/seo/gsc-store';
import type { GscDateRange } from '../../../../lib/seo/gsc-types';

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
    const range = (url.searchParams.get('range') || '28d') as GscDateRange;
    const force = url.searchParams.get('force') === 'true';

    const snapshot = await syncGscPerformanceData(locals, range, force);

    return new Response(JSON.stringify({ success: true, snapshot }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch GSC data';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { clientEmail, privateKey, propertyUrl } = body;

    if (!clientEmail || !privateKey) {
      return new Response(
        JSON.stringify({ error: 'Missing required credentials: clientEmail and privateKey are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const saveRes = await saveGscCredentials(locals, {
      clientEmail,
      privateKey,
      propertyUrl,
    });

    if (!saveRes.success) {
      return new Response(JSON.stringify({ error: saveRes.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Trigger initial sync in the background/inline
    const snapshot = await syncGscPerformanceData(locals, '28d', true);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Google Search Console connected successfully.',
        snapshot,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save GSC credentials';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
