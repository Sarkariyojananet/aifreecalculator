/**
 * POST /api/admin/calculator-health/errors/[id]/review
 * Marks an error log entry as reviewed.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../../lib/auth';
import { markErrorReviewed } from '../../../../../../lib/calculator-tests/health-store';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = params.id ?? '';
  // Validate ID format (alphanumeric + underscores)
  if (!id || !/^[a-z0-9_]+$/.test(id)) {
    return new Response(JSON.stringify({ error: 'Invalid error ID.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await markErrorReviewed(id, locals);
    return new Response(
      JSON.stringify({ success: true, id, message: 'Error marked as reviewed.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update error status';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
