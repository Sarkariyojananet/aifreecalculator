import type { APIRoute } from 'astro';
import { calculators } from '../../../data/calculators';
import { verifyAdminToken } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ calculators, total: calculators.length }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : null;

  const user = await verifyAdminToken(token);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { slug, enabled, featured } = body;

    const calc = calculators.find((c) => c.slug === slug);
    if (!calc) {
      return new Response(JSON.stringify({ error: 'Calculator not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (featured !== undefined) calc.featured = featured;

    return new Response(JSON.stringify({ success: true, calculator: calc }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Update failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
