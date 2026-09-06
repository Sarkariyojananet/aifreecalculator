/**
 * /api/admin/performance/purge
 * Authenticated API for executing targeted or global cache purges.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { purgeCloudflareCache } from '../../../../lib/performance/cloudflare-client';
import type { CachePurgeRequest } from '../../../../lib/performance/types';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const target = body.target as CachePurgeRequest['target'];
    const value = typeof body.value === 'string' ? body.value.trim() : undefined;
    const confirmEverything = Boolean(body.confirmEverything);

    const validTargets = ['url', 'calculator', 'category', 'homepage', 'everything'];
    if (!target || !validTargets.includes(target)) {
      return new Response(JSON.stringify({ error: 'Invalid purge target specified.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (target === 'url' && !value) {
      return new Response(JSON.stringify({ error: 'A valid URL path is required to purge.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (target === 'calculator' && !value) {
      return new Response(JSON.stringify({ error: 'Calculator slug is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (target === 'everything' && !confirmEverything) {
      return new Response(
        JSON.stringify({ error: 'Global cache purge requires explicit confirmation.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const purgeResult = await purgeCloudflareCache(
      {
        target,
        value,
        confirmEverything,
      },
      locals
    );

    return new Response(JSON.stringify(purgeResult), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Purge operation failed.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
