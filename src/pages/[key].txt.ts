import type { APIRoute } from 'astro';
import { getOrCreateIndexNowKey } from '../lib/seo/indexing-service';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const requestedKey = params.key;
  const currentKey = await getOrCreateIndexNowKey(locals);

  // If the requested filename matches the active IndexNow key
  if (requestedKey === currentKey) {
    return new Response(currentKey, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  return new Response('Not Found', { status: 404 });
};
