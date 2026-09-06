import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getRedirectRules } from '../../../../lib/admin/content-store';
import { auditAllRedirectRules } from '../../../../lib/redirects/validator';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rules = await getRedirectRules(locals);
  const audit = auditAllRedirectRules(rules);

  return new Response(
    JSON.stringify({
      chains: audit.chains,
      loops: audit.loops,
      totalChains: audit.chains.length,
      totalLoops: audit.loops.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
};
