import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import { getAiConfig, saveAiConfig, deleteAiConfig } from '../../../../lib/intelligence/intelligence-store';

export const prerender = false;

/**
 * GET /api/admin/intelligence/ai-config
 * Retrieves current AI configuration status (with sensitive API key masked)
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
    const config = await getAiConfig(locals);
    if (!config) {
      return new Response(JSON.stringify({ isConfigured: false, enabled: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        isConfigured: true,
        provider: config.provider,
        model: config.model,
        enabled: config.enabled,
        hasApiKey: !!config.apiKey,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * POST /api/admin/intelligence/ai-config
 * Updates or sets AI provider configuration (Gemini / OpenAI)
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
    const body = (await request.json().catch(() => null)) as any;
    if (!body || !body.provider) {
      return new Response(JSON.stringify({ error: 'Provider is required (gemini or openai)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const provider = body.provider.toLowerCase();
    if (provider !== 'gemini' && provider !== 'openai') {
      return new Response(JSON.stringify({ error: 'Supported providers are "gemini" and "openai"' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Retain existing key if user didn't enter a new one
    let apiKey = body.apiKey?.trim();
    if (!apiKey) {
      const existing = await getAiConfig(locals);
      apiKey = existing?.apiKey || '';
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key is required to enable AI briefing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await saveAiConfig(
      {
        provider,
        apiKey,
        model: body.model?.trim() || (provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini'),
        enabled: body.enabled !== false,
      },
      locals
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully configured ${provider.toUpperCase()} AI intelligence provider.`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

/**
 * DELETE /api/admin/intelligence/ai-config
 * Removes AI provider configuration (falls back to deterministic intelligence)
 */
export const DELETE: APIRoute = async ({ request, cookies, locals }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await deleteAiConfig(locals);
    return new Response(
      JSON.stringify({
        success: true,
        message: 'AI Provider credentials removed. Rule-based intelligence will be used.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
