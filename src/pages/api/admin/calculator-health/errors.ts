/**
 * GET /api/admin/calculator-health/errors
 * Returns error log entries with optional filters.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getErrorLog } from '../../../../lib/calculator-tests/health-store';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slugFilter = url.searchParams.get('slug') ?? undefined;
  const reviewedParam = url.searchParams.get('reviewed');
  const reviewedFilter =
    reviewedParam === 'true' ? true : reviewedParam === 'false' ? false : undefined;
  const limitParam = parseInt(url.searchParams.get('limit') ?? '100', 10);
  const limit = Math.min(Math.max(1, isNaN(limitParam) ? 100 : limitParam), 500);

  // Validate slug filter
  if (slugFilter && !/^[a-z0-9-]+$/.test(slugFilter)) {
    return new Response(JSON.stringify({ error: 'Invalid slug filter.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const errors = await getErrorLog(locals, { slug: slugFilter, reviewed: reviewedFilter, limit });
    return new Response(
      JSON.stringify({ success: true, errors, count: errors.length }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to load error log';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
