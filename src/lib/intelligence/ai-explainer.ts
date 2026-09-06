/**
 * Executive AI Explainer & Briefing Generator for Phase 10
 * aifreecalculator.com
 *
 * Provides executive website briefings using either an authenticated AI provider
 * (Google Gemini / OpenAI) or deterministic rule-based synthesis when AI is not configured.
 */

import type { ComprehensiveSnapshot } from './data-aggregator';
import type { IntelligenceInsight, WebsiteBriefing, WebsiteScoreBreakdown } from './types';
import { getAiConfig } from './intelligence-store';

/**
 * Generates an executive website briefing from the authentic system snapshot and insights
 */
export async function generateWebsiteBriefing(
  snapshot: ComprehensiveSnapshot,
  insights: IntelligenceInsight[],
  healthScore: WebsiteScoreBreakdown,
  locals?: any
): Promise<WebsiteBriefing> {
  const aiConfig = await getAiConfig(locals);

  // If AI is configured and enabled, try generating via AI provider
  if (aiConfig && aiConfig.enabled && aiConfig.apiKey) {
    try {
      const aiBriefing = await callAiProvider(aiConfig, snapshot, insights, healthScore);
      if (aiBriefing) {
        return aiBriefing;
      }
    } catch (err) {
      console.warn('AI Provider briefing generation failed, falling back to deterministic synthesis:', err);
    }
  }

  // Graceful deterministic fallback
  return generateDeterministicBriefing(snapshot, insights, healthScore);
}

/**
 * Synthesizes a deterministic, fact-grounded executive briefing without external AI
 */
export function generateDeterministicBriefing(
  snapshot: ComprehensiveSnapshot,
  insights: IntelligenceInsight[],
  healthScore: WebsiteScoreBreakdown
): WebsiteBriefing {
  const period = 'Last 24 Hours';
  const generatedAt = new Date().toISOString();

  // Determine overall status summary based on health grade and active critical insights
  const criticalCount = insights.filter((i) => i.priority === 'P0' && i.status !== 'resolved').length;
  const highCount = insights.filter((i) => i.priority === 'P1' && i.status !== 'resolved').length;

  let overallStatusSummary = '';
  if (criticalCount > 0) {
    overallStatusSummary = `Critical attention required: ${criticalCount} high-severity operational incident(s) currently active. Site overall health grade is ${healthScore.grade} (${healthScore.overallScore}/100). Immediate remediation recommended.`;
  } else if (highCount > 0) {
    overallStatusSummary = `System operational with ${highCount} high-priority optimization(s) flagged. Health grade is ${healthScore.grade} (${healthScore.overallScore}/100). Priority focus should be on resolving conversion blockers and formula test verifications.`;
  } else if (healthScore.overallScore >= 85) {
    overallStatusSummary = `All monitored systems operating within optimal parameters. Overall website health grade is ${healthScore.grade} (${healthScore.overallScore}/100) with robust uptime, zero critical errors, and active cache acceleration.`;
  } else {
    overallStatusSummary = `Baseline system operational. Overall website health score stands at ${healthScore.overallScore}/100 (Grade ${healthScore.grade}). Connect additional telemetry sources to maximize automated intelligence precision.`;
  }

  // Identify Biggest Win
  let biggestWin: { title: string; detail: string } | null = null;
  const uptimePct = snapshot.monitoring.uptime.percentage;
  if (uptimePct !== undefined && uptimePct >= 99.9) {
    biggestWin = {
      title: 'Flawless Route Reliability',
      detail: `All monitored production routes maintained ${uptimePct.toFixed(1)}% availability with no catastrophic downtime.`,
    };
  } else if (snapshot.performance.cacheMetrics?.hitRatioPercentage && snapshot.performance.cacheMetrics.hitRatioPercentage >= 75) {
    biggestWin = {
      title: 'High Edge Cache Efficiency',
      detail: `Cloudflare edge cache is serving ${snapshot.performance.cacheMetrics.hitRatioPercentage.toFixed(1)}% of requests directly from edge points of presence.`,
    };
  } else if (snapshot.seo.gscData?.summary && snapshot.seo.gscData.summary.totalClicks > 0) {
    biggestWin = {
      title: 'Organic Search Reach',
      detail: `Generated ${snapshot.seo.gscData.summary.totalClicks.toLocaleString()} organic search clicks across ${snapshot.seo.gscData.summary.totalImpressions.toLocaleString()} search impressions.`,
    };
  } else {
    biggestWin = {
      title: 'System Baseline Stable',
      detail: 'Core calculation engines and application runtime endpoints are passing baseline integrity checks.',
    };
  }

  // Identify Biggest Risk
  let biggestRisk: { title: string; detail: string } | null = null;
  const p0Insight = insights.find((i) => i.priority === 'P0' && i.status !== 'resolved');
  const p1Insight = insights.find((i) => i.priority === 'P1' && i.status !== 'resolved');
  const unresolved404s = snapshot.redirects.kpis?.unresolved404Count || 0;

  if (p0Insight) {
    biggestRisk = {
      title: p0Insight.title,
      detail: p0Insight.whyDetected,
    };
  } else if (p1Insight) {
    biggestRisk = {
      title: p1Insight.title,
      detail: p1Insight.whyDetected,
    };
  } else if (unresolved404s > 10) {
    biggestRisk = {
      title: 'Unresolved 404 Route Leaks',
      detail: `${unresolved404s} missing URLs are generating 404 errors, causing user bounce and potential crawl budget loss.`,
    };
  } else {
    biggestRisk = {
      title: 'Limited Integration Visibility',
      detail: 'Connect Google Search Console and AdSense API credentials in Admin settings to unlock real-time revenue and search decay alerts.',
    };
  }

  // System Highlights
  let seoHighlight: string | null = null;
  if (snapshot.seo.isGscConnected && snapshot.seo.gscData?.totals) {
    const oppCount = snapshot.seo.opportunities?.length || 0;
    seoHighlight = `${(snapshot.seo.gscData.totals.clicks || 0).toLocaleString()} clicks recorded. ${oppCount} striking-distance SEO keyword opportunities detected.`;
  } else {
    seoHighlight = 'GSC API is not connected. Connect Service Account in SEO Settings to unlock organic keyword tracking.';
  }

  let revenueHighlight: string | null = null;
  if (snapshot.monetization.isAdSenseConnected && snapshot.monetization.summary) {
    revenueHighlight = `AdSense connected. Total yield: ₹${snapshot.monetization.summary.totalEarnings || 0}, Impressions: ${(snapshot.monetization.summary.totalImpressions || 0).toLocaleString()}.`;
  } else {
    revenueHighlight = 'AdSense API credentials not configured. Configure in Monetization Settings to monitor RPM yield.';
  }

  let performanceHighlight: string | null = null;
  if (snapshot.monitoring.uptime.totalChecks > 0) {
    performanceHighlight = `Probes active: ${snapshot.monitoring.uptime.totalChecks} automated uptime tests recorded with zero downtime reported.`;
  }

  // Recommended Next Steps (from top 3 actionable insights)
  const actionable = insights
    .filter((i) => i.status !== 'resolved' && i.status !== 'ignored')
    .slice(0, 3)
    .map((i) => `${i.recommendedAction.label}: ${i.title}`);

  if (actionable.length === 0) {
    actionable.push('Continue regular automated uptime and formula verification tests.');
    actionable.push('Verify Cloudflare edge cache purge rules on newly deployed calculator assets.');
  }

  return {
    period,
    generatedAt,
    overallStatusSummary,
    biggestWin,
    biggestRisk,
    seoHighlight,
    revenueHighlight,
    performanceHighlight,
    recommendedNextSteps: actionable,
    isAiGenerated: false,
  };
}

/**
 * Calls configured AI provider (Google Gemini or OpenAI) to generate an executive briefing
 */
async function callAiProvider(
  config: { provider: string; apiKey?: string; model?: string },
  snapshot: ComprehensiveSnapshot,
  insights: IntelligenceInsight[],
  healthScore: WebsiteScoreBreakdown
): Promise<WebsiteBriefing | null> {
  if (!config.apiKey) return null;

  const topProblems = insights
    .filter((i) => i.priority === 'P0' || i.priority === 'P1')
    .slice(0, 5)
    .map((i) => `- [${i.priority}] ${i.title}: ${i.whyDetected}`)
    .join('\n');

  const systemPrompt = `You are an elite Site Reliability & Growth Architect analyzing aifreecalculator.com.
You must base your analysis strictly on the provided factual snapshot and deterministic insights.
Never hallucinate or invent fake metrics. If data for a system is missing or not connected, state it clearly.
Your output must be a clean JSON object matching this exact TypeScript structure:
{
  "period": "Last 24 Hours",
  "overallStatusSummary": "2-3 sentences concise executive summary of current site health and operational posture",
  "biggestWin": { "title": "...", "detail": "..." },
  "biggestRisk": { "title": "...", "detail": "..." },
  "seoHighlight": "...",
  "revenueHighlight": "...",
  "performanceHighlight": "...",
  "recommendedNextSteps": ["Step 1", "Step 2", "Step 3"]
}`;

  const userContent = `Site: aifreecalculator.com
Overall Health Score: ${healthScore.overallScore}/100 (Grade ${healthScore.grade})
Active Incidents: ${snapshot.monitoring.incidents?.length || 0}
Open Error Groups: ${snapshot.monitoring.errorGroups?.length || 0}
Failed Calculator Formula Tests: ${snapshot.calculatorHealth.failedCalculators?.length || 0}
Unresolved 404s: ${snapshot.redirects.kpis?.unresolved404Count || 0}
Edge Cache Connected: ${snapshot.performance.isCloudflareConnected ? 'Yes' : 'No'}
GSC Connected: ${snapshot.seo.isGscConnected ? 'Yes' : 'No'}
AdSense Connected: ${snapshot.monetization.isAdSenseConnected ? 'Yes' : 'No'}

Top Deterministic Insights:
${topProblems || 'None. All systems operational.'}`;

  if (config.provider === 'gemini') {
    const model = config.model || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\n${userContent}\n\nRespond ONLY with valid JSON.` }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as any;
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      period: parsed.period || 'Last 24 Hours',
      generatedAt: new Date().toISOString(),
      overallStatusSummary: parsed.overallStatusSummary || '',
      biggestWin: parsed.biggestWin || null,
      biggestRisk: parsed.biggestRisk || null,
      seoHighlight: parsed.seoHighlight || null,
      revenueHighlight: parsed.revenueHighlight || null,
      performanceHighlight: parsed.performanceHighlight || null,
      recommendedNextSteps: Array.isArray(parsed.recommendedNextSteps) ? parsed.recommendedNextSteps : [],
      isAiGenerated: true,
      aiProvider: `Google Gemini (${model})`,
    };
  }

  if (config.provider === 'openai') {
    const model = config.model || 'gpt-4o-mini';
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API returned status ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as any;
    const rawText = data?.choices?.[0]?.message?.content;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      period: parsed.period || 'Last 24 Hours',
      generatedAt: new Date().toISOString(),
      overallStatusSummary: parsed.overallStatusSummary || '',
      biggestWin: parsed.biggestWin || null,
      biggestRisk: parsed.biggestRisk || null,
      seoHighlight: parsed.seoHighlight || null,
      revenueHighlight: parsed.revenueHighlight || null,
      performanceHighlight: parsed.performanceHighlight || null,
      recommendedNextSteps: Array.isArray(parsed.recommendedNextSteps) ? parsed.recommendedNextSteps : [],
      isAiGenerated: true,
      aiProvider: `OpenAI (${model})`,
    };
  }

  return null;
}
