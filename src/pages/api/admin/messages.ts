import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getDb,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  getContactNotificationEmail,
  setContactNotificationEmail,
} from '../../../lib/db';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const countOnly = url.searchParams.get('countOnly') === 'true';

  const db = getDb(locals);
  const messages = await getContactMessages(db);
  const unreadCount = messages.filter((m) => m.status === 'new').length;

  if (countOnly) {
    return new Response(
      JSON.stringify({
        success: true,
        unreadCount,
        totalCount: messages.length,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }

  const targetEmail = await getContactNotificationEmail(db, locals);

  return new Response(
    JSON.stringify({
      success: true,
      messages,
      count: messages.length,
      unreadCount,
      targetEmail,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
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
    const { email } = body;
    if (!email || !String(email).includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email address is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDb(locals);
    await setContactNotificationEmail(db, String(email).trim());

    return new Response(JSON.stringify({ success: true, email: String(email).trim() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to update email setting' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PATCH: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'ID and status required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDb(locals);
    await updateContactMessageStatus(db, id, status);

    return new Response(JSON.stringify({ success: true, id, status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to update message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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
    const url = new URL(request.url);
    let id = url.searchParams.get('id');

    if (!id) {
      try {
        const body = await request.json();
        id = body?.id;
      } catch {}
    }

    if (!id) {
      return new Response(JSON.stringify({ error: 'Message ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = getDb(locals);
    await deleteContactMessage(db, id);

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to delete message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
