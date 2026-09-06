import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { gatherComprehensiveSnapshot, evaluateDataCoverage } from '../../../../lib/intelligence/data-aggregator';
import { generateDeterministicInsights, calculateExecutiveScore } from '../../../../lib/intelligence/rule-engine';
import { saveInsights, getStoredInsights } from '../../../../lib/intelligence/intelligence-store';
import { generateWebsiteBriefing } from '../../../../lib/intelligence/ai-explainer';
import type { IntelligenceInsight } from '../../../../lib/intelligence/types';

export const prerender = false;

/**
 * POST /api/admin/intelligence/refresh
 * Forces re-evaluation of all cross-system rules and updates D1 intelligence store.
 */
export const POST: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const snapshot = await gatherComprehensiveSnapshot(locals);
    const coverage = evaluateDataCoverage(snapshot);
    const generatedInsights: IntelligenceInsight[] = generateDeterministicInsights(snapshot);
    const healthScore = calculateExecutiveScore(snapshot, coverage);

    await saveInsights(generatedInsights, locals);
    const storedInsights: IntelligenceInsight[] = await getStoredInsights(locals);
    const allInsights: IntelligenceInsight[] = storedInsights.length > 0 ? storedInsights : generatedInsights;
    const briefing = await generateWebsiteBriefing(snapshot, allInsights, healthScore, locals);

    return new Response(
      JSON.stringify({
        success: true,
        refreshedAt: new Date().toISOString(),
        insightsCount: allInsights.length,
        overallScore: healthScore.overallScore,
        grade: healthScore.grade,
        briefing,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Refresh Intelligence Error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
