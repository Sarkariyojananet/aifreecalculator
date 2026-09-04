import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import { getFAQs, saveFAQs, saveSingleFAQ, deleteFAQ, type FAQItem } from '../../../lib/admin/content-store';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const faqs = await getFAQs(locals);
  return new Response(JSON.stringify({ faqs, total: faqs.length }), {
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

    // Check if bulk update or single FAQ update
    if (Array.isArray(body.faqs)) {
      const sanitized: FAQItem[] = body.faqs.map((f: any, idx: number) => ({
        id: f.id || `faq-${Date.now()}-${idx}`,
        question: (f.question || '').trim(),
        answer: (f.answer || '').trim(),
        category: f.category || 'General',
        calculatorSlug: f.calculatorSlug || undefined,
        sortOrder: typeof f.sortOrder === 'number' ? f.sortOrder : idx + 1,
      })).filter((f: FAQItem) => f.question && f.answer);

      await saveFAQs(sanitized, locals);
      return new Response(JSON.stringify({ success: true, faqs: sanitized }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { id, question, answer, category, calculatorSlug, sortOrder } = body;
    if (!question || !answer) {
      return new Response(JSON.stringify({ error: 'Both Question and Answer are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const faqItem: FAQItem = {
      id: id || `faq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'General',
      calculatorSlug: calculatorSlug || undefined,
      sortOrder: typeof sortOrder === 'number' ? sortOrder : 1,
    };

    const updated = await saveSingleFAQ(faqItem, locals);

    return new Response(JSON.stringify({ success: true, faq: faqItem, faqs: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save FAQ';
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
      return new Response(JSON.stringify({ error: 'FAQ ID parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updated = await deleteFAQ(id, locals);
    return new Response(JSON.stringify({ success: true, faqs: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete FAQ';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
