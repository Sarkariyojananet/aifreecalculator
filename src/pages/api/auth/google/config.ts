import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getGoogleOAuthConfig, saveGoogleOAuthConfig } from '../../../../lib/auth/google-oauth';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const config = await getGoogleOAuthConfig(locals);
  return new Response(
    JSON.stringify({
      configured: !!config,
      clientId: config?.clientId || '',
      hasSecret: !!config?.clientSecret,
      redirectUri: config?.redirectUri || '',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const { clientId, clientSecret, redirectUri } = body;

    if (!clientId?.trim() || !clientSecret?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Both Client ID and Client Secret are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const res = await saveGoogleOAuthConfig(locals, {
      clientId: clientId.trim(),
      clientSecret: clientSecret.trim(),
      redirectUri: redirectUri?.trim() || undefined,
    });

    return new Response(JSON.stringify(res), {
      status: res.success ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid request';
    return new Response(JSON.stringify({ error: msg }), { status: 400 });
  }
};
