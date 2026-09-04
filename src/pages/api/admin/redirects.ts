import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getRedirectRules,
  addOrUpdateRedirectRule,
  deleteRedirectRule,
  type RedirectRule,
} from '../../../lib/admin/content-store';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const rules = await getRedirectRules(locals);
  return new Response(JSON.stringify({ redirects: rules, total: rules.length }), {
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
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { id, source, destination, statusCode, active } = body;

    let cleanSource = (source || '').trim();
    let cleanDest = (destination || '').trim();

    if (!cleanSource || !cleanDest) {
      return new Response(JSON.stringify({ error: 'Both Source and Destination paths are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!cleanSource.startsWith('/')) cleanSource = '/' + cleanSource;
    if (!cleanDest.startsWith('/') && !cleanDest.startsWith('http://') && !cleanDest.startsWith('https://')) {
      cleanDest = '/' + cleanDest;
    }

    const rule: RedirectRule = {
      id: id || `redir-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      source: cleanSource,
      destination: cleanDest,
      statusCode: statusCode === 302 ? 302 : 301,
      active: active !== false,
      createdAt: body.createdAt || new Date().toISOString(),
      hits: body.hits || 0,
    };

    const result = await addOrUpdateRedirectRule(rule, locals);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, redirect: rule, redirects: result.rules }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save redirect rule';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Redirect ID parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await deleteRedirectRule(id, locals);
    return new Response(JSON.stringify({ success: true, redirects: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete redirect rule';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
