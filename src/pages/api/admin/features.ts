import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../lib/auth';
import {
  getFeatureFlags,
  saveFeatureFlags,
  type FeatureFlags,
} from '../../../lib/admin/content-store';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const flags = await getFeatureFlags(locals);
  return new Response(JSON.stringify({ flags }), {
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
    const current = await getFeatureFlags(locals);

    const updated: FeatureFlags = {
      enablePdfDownload: typeof body.enablePdfDownload === 'boolean' ? body.enablePdfDownload : current.enablePdfDownload,
      enableShareCalculation: typeof body.enableShareCalculation === 'boolean' ? body.enableShareCalculation : current.enableShareCalculation,
      enableRecentlyUsed: typeof body.enableRecentlyUsed === 'boolean' ? body.enableRecentlyUsed : current.enableRecentlyUsed,
      enableUserFeedback: typeof body.enableUserFeedback === 'boolean' ? body.enableUserFeedback : current.enableUserFeedback,
      enableDarkModeToggle: typeof body.enableDarkModeToggle === 'boolean' ? body.enableDarkModeToggle : current.enableDarkModeToggle,
      enableAdSenseAutoAds: typeof body.enableAdSenseAutoAds === 'boolean' ? body.enableAdSenseAutoAds : current.enableAdSenseAutoAds,
      enableSearchAnalytics: typeof body.enableSearchAnalytics === 'boolean' ? body.enableSearchAnalytics : current.enableSearchAnalytics,
    };

    await saveFeatureFlags(updated, locals);

    return new Response(JSON.stringify({ success: true, flags: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update feature flags';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
