/**
 * /api/admin/calculator-health/tests/[slug]/[id]
 * PUT: Update custom test case or toggle active state
 * DELETE: Remove custom test case
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../../lib/auth';
import {
  getCustomTestCases,
  saveCustomTestCase,
  deleteCustomTestCase,
  toggleCustomTestCase,
} from '../../../../../../lib/calculator-tests/health-store';
import type { TestCategory } from '../../../../../../lib/calculator-tests/types';

export const prerender = false;

export const PUT: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { slug, id } = params;
  if (!slug || !id) {
    return new Response(JSON.stringify({ error: 'Slug and ID are required' }), { status: 400 });
  }

  try {
    const body = await request.json();

    // If only toggling active status
    if (Object.keys(body).length === 1 && 'active' in body) {
      await toggleCustomTestCase(id, Boolean(body.active), locals);
      return new Response(JSON.stringify({ success: true, id, active: Boolean(body.active) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const existingTests = await getCustomTestCases(locals, slug);
    const target = existingTests.find((t) => t.id === id);
    if (!target) {
      return new Response(JSON.stringify({ error: 'Custom test case not found' }), { status: 404 });
    }

    const updated = {
      ...target,
      name: body.name !== undefined ? String(body.name).trim() : target.name,
      category: (body.category as TestCategory) || target.category,
      expectedBehavior: body.expectedBehavior || target.expectedBehavior,
      expectedResultKey: body.expectedResultKey !== undefined ? String(body.expectedResultKey).trim() : target.expectedResultKey,
      expectedValue: body.expectedValue !== undefined ? body.expectedValue : target.expectedValue,
      tolerance: body.tolerance !== undefined ? Number(body.tolerance) : target.tolerance,
      inputValues: body.inputValues !== undefined ? body.inputValues : target.inputValues,
      description: body.description !== undefined ? String(body.description).trim() : target.description,
      active: body.active !== undefined ? Boolean(body.active) : target.active,
      updatedAt: new Date().toISOString(),
    };

    await saveCustomTestCase(updated, locals);

    return new Response(JSON.stringify({ success: true, testCase: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update test case';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Test ID is required' }), { status: 400 });
  }

  try {
    await deleteCustomTestCase(id, locals);
    return new Response(JSON.stringify({ success: true, message: 'Test case deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete test case';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
