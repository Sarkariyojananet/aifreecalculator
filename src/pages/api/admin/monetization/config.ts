/**
 * /api/admin/monetization/config
 * Authenticated API for managing Google AdSense API integration and OAuth tokens.
 * Client secrets and tokens are stored securely in D1 and NEVER returned in plain text.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  getAdSenseConfig,
  getMaskedAdSenseConfig,
  saveAdSenseConfig,
  deleteAdSenseConfig,
} from '../../../../lib/monetization/monetization-store';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawConfig = await getAdSenseConfig(locals);
  const safeConfig = getMaskedAdSenseConfig(rawConfig);

  return new Response(JSON.stringify({ success: true, config: safeConfig }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const clientId = typeof body.clientId === 'string' ? body.clientId.trim() : '';
    const clientSecret = typeof body.clientSecret === 'string' ? body.clientSecret.trim() : '';
    const refreshToken = typeof body.refreshToken === 'string' ? body.refreshToken.trim() : undefined;
    const accountId = typeof body.accountId === 'string' ? body.accountId.trim() : undefined;

    if (!clientId) {
      return new Response(
        JSON.stringify({ error: 'Google Cloud OAuth Client ID is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const res = await saveAdSenseConfig(
      {
        clientId,
        clientSecret,
        refreshToken,
        accountId,
      },
      locals
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: res.message,
        config: getMaskedAdSenseConfig(res.config),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to save AdSense credentials.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await deleteAdSenseConfig(locals);
    return new Response(
      JSON.stringify({ success: true, message: 'Google AdSense disconnected successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to disconnect AdSense.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
