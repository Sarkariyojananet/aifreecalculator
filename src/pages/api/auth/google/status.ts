import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getGoogleAccountStatus, getGoogleOAuthConfig } from '../../../../lib/auth/google-oauth';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const status = await getGoogleAccountStatus(locals);
  const config = await getGoogleOAuthConfig(locals);

  return new Response(
    JSON.stringify({
      ...status,
      hasAppConfigured: !!config,
      clientId: config?.clientId ? `${config.clientId.slice(0, 12)}...` : null,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache',
      },
    }
  );
};
