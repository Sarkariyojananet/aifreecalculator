import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { gatherComprehensiveSnapshot, evaluateDataCoverage } from '../../../../lib/intelligence/data-aggregator';
import { generateDeterministicInsights, calculateExecutiveScore } from '../../../../lib/intelligence/rule-engine';
import { saveInsights, getStoredInsights, getAiConfig } from '../../../../lib/intelligence/intelligence-store';
import { generateWebsiteBriefing } from '../../../../lib/intelligence/ai-explainer';
import type { IntelligenceOverviewReport, InsightPriority, IntelligenceInsight } from '../../../../lib/intelligence/types';

export const prerender = false;

/**
 * GET /api/admin/intelligence/overview
 * Authenticated endpoint returning authentic comprehensive website intelligence:
 * Executive Health Score, Data Coverage, Briefing, Top Priorities, and Filterable Insights.
 */
export const GET: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. Gather authentic multi-system snapshot concurrently
    const snapshot = await gatherComprehensiveSnapshot(locals);

    // 2. Evaluate data coverage across all 7 operational systems
    const coverage = evaluateDataCoverage(snapshot);

    // 3. Generate deterministic rule-based insights & correlations
    const generatedInsights: IntelligenceInsight[] = generateDeterministicInsights(snapshot);

    // 4. Calculate Executive Website Score (0-100) based on authentic data
    const healthScore = calculateExecutiveScore(snapshot, coverage);

    // 5. Persist/update newly detected insights in D1 (without overwriting user acknowledgment states)
    await saveInsights(generatedInsights, locals);

    // 6. Retrieve stored insights from D1
    const storedInsights: IntelligenceInsight[] = await getStoredInsights(locals);

    // If D1 returned fewer than generated (e.g. initial setup), fallback to generated
    const allInsights: IntelligenceInsight[] = storedInsights.length > 0 ? storedInsights : generatedInsights;

    // 7. Generate Executive Website Briefing (via AI or deterministic synthesis)
    const briefing = await generateWebsiteBriefing(snapshot, allInsights, healthScore, locals);

    // 8. Extract top priorities (P0 and P1 active items)
    const topPriorities: IntelligenceInsight[] = allInsights
      .filter((i: IntelligenceInsight) => (i.priority === 'P0' || i.priority === 'P1') && i.status !== 'resolved' && i.status !== 'ignored')
      .slice(0, 5);

    // 9. Compute summary count tallies
    const countsByPriority: Record<InsightPriority, number> = {
      P0: 0,
      P1: 0,
      P2: 0,
      P3: 0,
    };

    const countsByCategory: Record<string, number> = {};

    for (const item of allInsights) {
      const p = item.priority as InsightPriority;
      if (p in countsByPriority) {
        countsByPriority[p]++;
      }
      countsByCategory[item.category] = (countsByCategory[item.category] || 0) + 1;
    }

    // 10. Check AI configuration status
    const aiConfig = await getAiConfig(locals);

    const payload: IntelligenceOverviewReport = {
      healthScore,
      coverage,
      briefing,
      topPriorities,
      insights: allInsights,
      totalInsightsCount: allInsights.length,
      countsByPriority,
      countsByCategory,
      aiStatus: {
        isConfigured: !!(aiConfig && aiConfig.enabled && aiConfig.apiKey),
        provider: aiConfig?.provider,
        model: aiConfig?.model,
      },
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Intelligence Overview API Error:', err);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate website intelligence overview',
        details: err?.message || String(err),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
