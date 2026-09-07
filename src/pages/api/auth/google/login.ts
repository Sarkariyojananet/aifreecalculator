import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getGoogleAuthUrl, getGoogleOAuthConfig } from '../../../../lib/auth/google-oauth';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/admin/barwalaoffice/' },
    });
  }

  const returnTo = url.searchParams.get('returnTo') || '/admin/settings/';
  const config = await getGoogleOAuthConfig(locals);

  if (!config) {
    // If Client ID/Secret are not configured yet, redirect with helpful prompt
    return new Response(null, {
      status: 302,
      headers: { Location: `${returnTo}?google_setup=required` },
    });
  }

  try {
    const origin = url.origin;
    const authUrl = await getGoogleAuthUrl(origin, locals, encodeURIComponent(returnTo));
    return new Response(null, {
      status: 302,
      headers: { Location: authUrl },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to generate Google auth URL';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
