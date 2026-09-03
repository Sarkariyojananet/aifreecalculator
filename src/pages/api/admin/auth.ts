import type { APIRoute } from 'astro';
import { createAdminToken, validateCredentials, verifyAdminToken } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password, action } = body;

    if (action === 'logout') {
      return new Response(JSON.stringify({ success: true, message: 'Logged out' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly; SameSite=Lax',
        },
      });
    }

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isValid = validateCredentials(username, password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid admin credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = await createAdminToken(username);

    return new Response(JSON.stringify({ success: true, token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_session=${token}; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax`,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication failed';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async ({ request, cookies }) => {
  let token = cookies.get('admin_session')?.value;
  if (!token) {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }
  if (!token) {
    const cookieHeader = request.headers.get('cookie') || request.headers.get('Cookie');
    token = cookieHeader?.match(/admin_session=([^;]+)/)?.[1]?.trim();
  }

  const user = await verifyAdminToken(token);
  if (!user) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ authenticated: true, user }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

