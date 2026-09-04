import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getSEOChangeHistory } from '../../../../lib/seo/change-history';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const history = await getSEOChangeHistory(locals);
  return new Response(JSON.stringify({ history, count: history.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
