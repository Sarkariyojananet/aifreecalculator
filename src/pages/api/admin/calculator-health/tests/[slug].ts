/**
 * /api/admin/calculator-health/tests/[slug]
 * GET: Retrieve all predefined and custom test cases for a calculator
 * POST: Create a new custom test case
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../lib/auth';
import { getTestCasesForSlug } from '../../../../../lib/calculator-tests/test-cases';
import {
  getCustomTestCases,
  saveCustomTestCase,
  getLatestTestResults,
} from '../../../../../lib/calculator-tests/health-store';
import type { CustomTestCaseDefinition, TestCategory } from '../../../../../lib/calculator-tests/types';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = params.slug ?? '';
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
  }

  const staticCases = getTestCasesForSlug(slug);
  const customCases = await getCustomTestCases(locals, slug);
  const latestResults = await getLatestTestResults(locals);
  const slugResults = latestResults?.[slug]?.results || [];

  const combined = [
    ...staticCases.map((tc) => {
      const match = slugResults.find((r) => r.testName === tc.name);
      return {
        id: `static_${tc.name.replace(/\s+/g, '_')}`,
        slug: tc.slug,
        name: tc.name,
        category: tc.category,
        expectedBehavior: tc.expectedBehavior,
        expectedResultKey: tc.expectedResultKey,
        expectedValue: tc.expectedValue,
        tolerance: tc.tolerance,
        inputValues: tc.inputValues || null,
        description: tc.description,
        isCustom: false,
        active: true,
        lastState: match?.state || 'NOT_RUN',
        lastActualValue: match?.actualValue,
        lastErrorMessage: match?.errorMessage,
      };
    }),
    ...customCases.map((tc) => {
      const match = slugResults.find((r) => r.testName === tc.name);
      return {
        id: tc.id,
        slug: tc.slug,
        name: tc.name,
        category: tc.category,
        expectedBehavior: tc.expectedBehavior,
        expectedResultKey: tc.expectedResultKey,
        expectedValue: tc.expectedValue,
        tolerance: tc.tolerance,
        inputValues: tc.inputValues,
        description: tc.description,
        isCustom: true,
        active: tc.active,
        lastState: match?.state || 'NOT_RUN',
        lastActualValue: match?.actualValue,
        lastErrorMessage: match?.errorMessage,
        createdAt: tc.createdAt,
      };
    }),
  ];

  return new Response(JSON.stringify({ success: true, slug, testCases: combined }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};

export const POST: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const slug = params.slug ?? '';
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const {
      name,
      category = 'Normal',
      expectedBehavior = 'result',
      expectedResultKey,
      expectedValue,
      tolerance = 0,
      inputValues = {},
      description = '',
      active = true,
    } = body;

    if (!name || typeof name !== 'string') {
      return new Response(JSON.stringify({ error: 'Test name is required' }), { status: 400 });
    }

    const testId = `tc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const newTest: CustomTestCaseDefinition = {
      id: testId,
      slug,
      name: name.trim(),
      category: category as TestCategory,
      expectedBehavior,
      expectedResultKey: expectedResultKey ? String(expectedResultKey).trim() : undefined,
      expectedValue: expectedValue !== undefined && expectedValue !== '' ? expectedValue : undefined,
      tolerance: Number(tolerance) || 0,
      inputValues: typeof inputValues === 'object' ? inputValues : {},
      description: description ? String(description).trim() : undefined,
      active: Boolean(active),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveCustomTestCase(newTest, locals);

    return new Response(JSON.stringify({ success: true, testCase: newTest }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create test case';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
