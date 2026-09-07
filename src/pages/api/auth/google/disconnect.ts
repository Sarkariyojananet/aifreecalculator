import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { disconnectGoogleAccount } from '../../../../lib/auth/google-oauth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const success = await disconnectGoogleAccount(locals);

  return new Response(JSON.stringify({ success, message: 'Google account disconnected.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
