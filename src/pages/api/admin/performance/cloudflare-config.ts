/**
 * /api/admin/performance/cloudflare-config
 * Authenticated API for managing Cloudflare API credentials.
 * Tokens are stored securely in D1 and NEVER returned in plain text.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  getCloudflareConfig,
  getMaskedCloudflareConfig,
  saveCloudflareConfig,
  deleteCloudflareConfig,
} from '../../../../lib/performance/cloudflare-client';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawConfig = await getCloudflareConfig(locals);
  const safeConfig = getMaskedCloudflareConfig(rawConfig);

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
    const apiToken = typeof body.apiToken === 'string' ? body.apiToken.trim() : '';
    const zoneId = typeof body.zoneId === 'string' ? body.zoneId.trim() : '';
    const accountId = typeof body.accountId === 'string' ? body.accountId.trim() : undefined;

    if (!apiToken || !zoneId) {
      return new Response(
        JSON.stringify({ error: 'Both Cloudflare API Token and Zone ID are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await saveCloudflareConfig({ apiToken, zoneId, accountId }, locals);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error || 'Failed to verify Cloudflare credentials.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const safeConfig = getMaskedCloudflareConfig(result.config!);
    return new Response(
      JSON.stringify({ success: true, message: 'Cloudflare API connected successfully.', config: safeConfig }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Invalid request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
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

  await deleteCloudflareConfig(locals);
  return new Response(
    JSON.stringify({ success: true, message: 'Cloudflare credentials removed.' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
