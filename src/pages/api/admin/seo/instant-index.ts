import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  dispatchInstantIndexing,
  getIndexingHistory,
  getOrCreateIndexNowKey,
} from '../../../../lib/seo/indexing-service';
import { calculators } from '../../../../data/calculators';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const history = await getIndexingHistory(locals);
  const key = await getOrCreateIndexNowKey(locals);

  return new Response(
    JSON.stringify({
      success: true,
      indexNowKey: key,
      history,
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
    let urls: string[] = [];

    if (body.allCalculators) {
      urls = calculators.map((c) => (c.path.endsWith('/') ? c.path : `${c.path}/`));
    } else if (Array.isArray(body.urls)) {
      urls = body.urls.map((u: string) => u.trim()).filter(Boolean);
    } else if (typeof body.url === 'string' && body.url.trim()) {
      urls = [body.url.trim()];
    }

    if (!urls.length) {
      return new Response(JSON.stringify({ error: 'No URLs specified for indexing' }), { status: 400 });
    }

    const action = body.action === 'URL_DELETED' ? 'URL_DELETED' : 'URL_UPDATED';
    const result = await dispatchInstantIndexing(urls, action, locals);

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Instant indexing dispatch error';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
