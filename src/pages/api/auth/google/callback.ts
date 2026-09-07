import type { APIRoute } from 'astro';
import { handleGoogleCallback } from '../../../../lib/auth/google-oauth';

export const prerender = false;

export const GET: APIRoute = async ({ locals, url }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const stateRaw = url.searchParams.get('state') || '/admin/settings/';
  let returnTo = '/admin/settings/';

  try {
    returnTo = decodeURIComponent(stateRaw);
  } catch {}

  // Basic sanity check on returnTo to prevent open redirects
  if (!returnTo.startsWith('/admin')) {
    returnTo = '/admin/settings/';
  }

  if (error) {
    const separator = returnTo.includes('?') ? '&' : '?';
    return new Response(null, {
      status: 302,
      headers: { Location: `${returnTo}${separator}google_error=${encodeURIComponent(error)}` },
    });
  }

  if (!code) {
    const separator = returnTo.includes('?') ? '&' : '?';
    return new Response(null, {
      status: 302,
      headers: { Location: `${returnTo}${separator}google_error=missing_code` },
    });
  }

  const result = await handleGoogleCallback(code, url.origin, locals);

  const separator = returnTo.includes('?') ? '&' : '?';
  if (!result.success) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `${returnTo}${separator}google_error=${encodeURIComponent(result.error || 'authorization_failed')}`,
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${returnTo}${separator}google_connected=success&account=${encodeURIComponent(result.email || '')}`,
    },
  });
};
