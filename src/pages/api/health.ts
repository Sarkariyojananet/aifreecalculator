import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';

export const prerender = false;

/**
 * Public, lightweight health probe endpoint (Step 9)
 * Strictly exposes only non-sensitive operational state.
 */
export const GET: APIRoute = async ({ locals }) => {
  const startTime = Date.now();
  let dbStatus: 'healthy' | 'degraded' = 'healthy';

  try {
    const db = getDb(locals);
    // Lightweight probe query: SELECT 1
    const check = await db.prepare('SELECT 1 as alive').first<{ alive: number }>();
    if (!check || check.alive !== 1) {
      dbStatus = 'degraded';
    }
  } catch {
    dbStatus = 'degraded';
  }

  const responseBody = {
    status: dbStatus === 'healthy' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    version: import.meta.env.PUBLIC_GIT_COMMIT_HASH || 'unknown',
    database: dbStatus,
    latencyMs: Date.now() - startTime,
  };

  return new Response(JSON.stringify(responseBody), {
    status: dbStatus === 'healthy' ? 200 : 503,
    headers: {
      'Content-Type': 'application/json',
      // Cache at Cloudflare edge for 15 s — absorbs bot floods without hitting D1 on every request
      'Cache-Control': 'public, max-age=15, s-maxage=15',
    },
  });
};
