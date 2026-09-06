import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getRedirectRules,
  addOrUpdateRedirectRule,
  deleteRedirectRule,
  type RedirectRule,
} from '../../../lib/admin/content-store';
import {
  detectRedirectLoop,
  detectRedirectChain,
  auditAllRedirectRules,
  isKnownSiteRoute,
  normalizeRedirectPath,
} from '../../../lib/redirects/validator';
import {
  getRedirectSummaryKPIs,
  logRedirectHistory,
  update404Status,
} from '../../../lib/redirects/store';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const rules = await getRedirectRules(locals);
  const audit = auditAllRedirectRules(rules);
  const kpis = await getRedirectSummaryKPIs(locals);

  return new Response(
    JSON.stringify({
      redirects: rules,
      total: rules.length,
      chains: audit.chains,
      loops: audit.loops,
      kpis,
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
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin authentication required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { id, source, destination, statusCode, active, note, collapseChain } = body;

    let cleanSource = (source || '').trim();
    let cleanDest = (destination || '').trim();

    if (!cleanSource || !cleanDest) {
      return new Response(JSON.stringify({ error: 'Both Source and Destination paths are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    cleanSource = normalizeRedirectPath(cleanSource);
    if (!cleanDest.startsWith('http://') && !cleanDest.startsWith('https://')) {
      cleanDest = normalizeRedirectPath(cleanDest);
    }

    const currentRules = await getRedirectRules(locals);
    const existingRule = currentRules.find((r) => r.id === id);

    // 1. Loop detection (arbitrary depth)
    const loopError = detectRedirectLoop(cleanSource, cleanDest, currentRules, id);
    if (loopError) {
      return new Response(
        JSON.stringify({
          error: `Redirect loop detected: ${loopError.cycle.join(' ➔ ')}. This rule cannot be saved.`,
          loop: loopError,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Chain detection & optional auto-collapse
    let finalDest = cleanDest;
    const chainWarning = detectRedirectChain(cleanSource, cleanDest, currentRules, id);
    if (chainWarning && collapseChain) {
      finalDest = chainWarning.finalDestination;
    }

    // 3. Destination route validation warning
    const routeCheck = isKnownSiteRoute(finalDest);
    let destinationWarning: string | undefined;
    if (!routeCheck.known) {
      destinationWarning = `Destination "${finalDest}" does not match any known calculator or page. Ensure this path exists to prevent a secondary 404.`;
    }

    const rule: RedirectRule = {
      id: id || `redir-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      source: cleanSource,
      destination: finalDest,
      statusCode: statusCode === 302 ? 302 : 301,
      active: active !== false,
      createdAt: body.createdAt || new Date().toISOString(),
      hits: body.hits || 0,
    };

    const result = await addOrUpdateRedirectRule(rule, locals);
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Log to redirect history
    await logRedirectHistory(
      {
        ruleId: rule.id,
        action: existingRule ? 'updated' : 'created',
        source: rule.source,
        destination: rule.destination,
        statusCode: rule.statusCode,
        adminUser: user.username,
        note: note || (chainWarning && collapseChain ? 'Auto-collapsed redirect chain to final destination' : undefined),
      },
      locals
    );

    // 5. Update 404 status in cms_404_logs if this redirected a 404 path
    await update404Status(rule.source, 'redirected', rule.id, locals);
    if (rule.source.endsWith('/')) {
      await update404Status(rule.source.slice(0, -1), 'redirected', rule.id, locals);
    }

    const updatedAudit = auditAllRedirectRules(result.rules);

    return new Response(
      JSON.stringify({
        success: true,
        redirect: rule,
        redirects: result.rules,
        chainWarning: !collapseChain ? chainWarning : undefined,
        destinationWarning,
        chains: updatedAudit.chains,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save redirect rule';
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
      return new Response(JSON.stringify({ error: 'Redirect ID parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentRules = await getRedirectRules(locals);
    const ruleToDelete = currentRules.find((r) => r.id === id);

    const updated = await deleteRedirectRule(id, locals);

    if (ruleToDelete) {
      await logRedirectHistory(
        {
          ruleId: id,
          action: 'deleted',
          source: ruleToDelete.source,
          destination: ruleToDelete.destination,
          statusCode: ruleToDelete.statusCode,
          adminUser: user.username,
        },
        locals
      );
    }

    return new Response(JSON.stringify({ success: true, redirects: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete redirect rule';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
