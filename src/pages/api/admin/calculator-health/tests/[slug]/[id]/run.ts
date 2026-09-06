/**
 * /api/admin/calculator-health/tests/[slug]/[id]/run
 * POST: Execute an individual test case on-demand and return actual vs expected with tolerance comparison.
 */
import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../../../../lib/auth';
import { getTestCasesForSlug } from '../../../../../../../lib/calculator-tests/test-cases';
import { getCustomTestCases } from '../../../../../../../lib/calculator-tests/health-store';
import { buildExecutableCustomTestCase } from '../../../../../../../lib/calculator-tests/formula-dispatch';
import { runTestCase } from '../../../../../../../lib/calculator-tests/result-validator';
import type { CalculatorTestCase } from '../../../../../../../lib/calculator-tests/types';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, locals, params }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { slug, id } = params;
  if (!slug || !id) {
    return new Response(JSON.stringify({ error: 'Slug and test ID are required' }), { status: 400 });
  }

  try {
    let targetCase: CalculatorTestCase | null = null;

    if (id.startsWith('static_')) {
      const staticCases = getTestCasesForSlug(slug);
      const testName = id.replace('static_', '').replace(/_/g, ' ');
      targetCase = staticCases.find((tc) => tc.name.toLowerCase() === testName.toLowerCase()) || null;
      if (!targetCase) {
        // Try loose matching
        targetCase = staticCases.find((tc) => `static_${tc.name.replace(/\s+/g, '_')}` === id) || null;
      }
    } else {
      const customCases = await getCustomTestCases(locals, slug);
      const customDef = customCases.find((t) => t.id === id);
      if (customDef) {
        targetCase = buildExecutableCustomTestCase(customDef);
      }
    }

    if (!targetCase) {
      return new Response(JSON.stringify({ error: `Test case '${id}' not found` }), { status: 404 });
    }

    const testResult = runTestCase(targetCase);

    return new Response(JSON.stringify({ success: true, result: testResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Execution failed';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
