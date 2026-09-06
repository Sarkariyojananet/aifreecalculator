/**
 * /api/admin/monetization/oauth-callback
 * Handles Google OAuth 2.0 authorization code redirect securely server-side.
 * Exchanges authorization code for long-lived refresh token and stores in D1.
 */

import type { APIRoute } from 'astro';
import { authenticateAdminRequest } from '../../../../lib/auth';
import {
  getAdSenseConfig,
  saveAdSenseConfig,
} from '../../../../lib/monetization/monetization-store';
import {
  exchangeCodeForTokens,
  listAdSenseAccounts,
} from '../../../../lib/monetization/adsense-client';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, locals, url }) => {
  const user = await authenticateAdminRequest(request, cookies);
  if (!user) {
    return new Response('Unauthorized: Please log in to admin panel before connecting Google AdSense.', {
      status: 401,
    });
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return Response.redirect(
      new URL(`/admin/monetization/?error=${encodeURIComponent(`Google authorization denied: ${error}`)}`, url.origin),
      302
    );
  }

  if (!code) {
    return Response.redirect(
      new URL('/admin/monetization/?error=Missing+authorization+code', url.origin),
      302
    );
  }

  const config = await getAdSenseConfig(locals);
  if (!config || !config.clientId || !config.clientSecret) {
    return Response.redirect(
      new URL('/admin/monetization/?error=AdSense+OAuth+Client+ID+and+Secret+must+be+saved+first', url.origin),
      302
    );
  }

  try {
    const redirectUri = `${url.origin}/api/admin/monetization/oauth-callback`;
    const tokens = await exchangeCodeForTokens(config.clientId, config.clientSecret, code, redirectUri);

    if (!tokens.refreshToken && !config.refreshToken) {
      return Response.redirect(
        new URL('/admin/monetization/?error=No+refresh+token+returned.+Please+revoke+app+permissions+in+Google+Account+and+re-authorize+with+prompt=consent.', url.origin),
        302
      );
    }

    // Auto-discover AdSense publisher account using the new access token
    let accountId = config.accountId;
    let displayName = config.displayName;
    try {
      const accounts = await listAdSenseAccounts(tokens.accessToken);
      if (accounts.length > 0) {
        accountId = accounts[0].name;
        displayName = accounts[0].displayName || accounts[0].name;
      }
    } catch (accErr) {
      console.warn('Could not auto-list AdSense accounts:', accErr);
    }

    const now = Date.now();
    await saveAdSenseConfig(
      {
        refreshToken: tokens.refreshToken || config.refreshToken,
        accessToken: tokens.accessToken,
        accessTokenExpiresAt: now + (tokens.expiresIn - 120) * 1000,
        accountId: accountId || config.accountId,
        displayName: displayName || config.displayName,
        status: 'connected',
      },
      locals
    );

    return Response.redirect(new URL('/admin/monetization/?connected=true', url.origin), 302);
  } catch (err: any) {
    console.error('OAuth exchange error:', err);
    return Response.redirect(
      new URL(`/admin/monetization/?error=${encodeURIComponent(err.message || 'OAuth token exchange failed')}`, url.origin),
      302
    );
  }
};
