/**
 * Google OAuth 2.0 Direct Gmail Authorization Service
 * Connects Google Search Console, AdSense, and Google Indexing with 1-click OAuth
 * Eliminates manual Service Account JSON keys and private key configurations.
 */

import { getDb } from '../db';
import { getRuntimeEnvSync } from '../cloudflare-env';

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
}

export interface GoogleConnectionData {
  connected: boolean;
  email?: string;
  name?: string;
  picture?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  scopes?: string[];
  connectedAt?: string;
}

const SETTINGS_KEY = 'google_oauth_connection';
const CONFIG_KEY = 'google_oauth_config';

export const GSC_SCOPES = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/webmasters.readonly',
];

export const ALL_SCOPES = [
  ...GSC_SCOPES,
  'https://www.googleapis.com/auth/adsense.readonly',
  'https://www.googleapis.com/auth/indexing',
];

export const DEFAULT_SCOPES = ALL_SCOPES;

/**
 * Resolves Google OAuth Client credentials from environment or D1 settings.
 */
export async function getGoogleOAuthConfig(locals?: any): Promise<GoogleOAuthConfig | null> {
  const env = getRuntimeEnvSync(locals);

  // 1. Check environment variables
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    return {
      clientId: env.GOOGLE_CLIENT_ID.trim(),
      clientSecret: env.GOOGLE_CLIENT_SECRET.trim(),
      redirectUri: env.GOOGLE_REDIRECT_URI?.trim(),
    };
  }

  // 2. Check D1 site_settings
  try {
    const db = getDb(locals);
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(CONFIG_KEY)
      .first<{ value: string }>();

    if (row?.value) {
      const parsed = JSON.parse(row.value);
      if (parsed.clientId && parsed.clientSecret) {
        return {
          clientId: parsed.clientId.trim(),
          clientSecret: parsed.clientSecret.trim(),
          redirectUri: parsed.redirectUri?.trim(),
        };
      }
    }
  } catch {}

  return null;
}

/**
 * Saves Google OAuth Client ID & Secret to D1 site_settings
 */
export async function saveGoogleOAuthConfig(
  locals: any,
  config: { clientId: string; clientSecret: string; redirectUri?: string }
): Promise<{ success: boolean; message: string }> {
  try {
    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(CONFIG_KEY, JSON.stringify(config))
      .run();

    return { success: true, message: 'Google OAuth app credentials saved.' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Failed to save OAuth config: ${msg}` };
  }
}

/**
 * Builds Google OAuth 2.0 consent authorization URL
 */
export async function getGoogleAuthUrl(
  origin: string,
  locals?: any,
  state = 'admin',
  scopeType: 'gsc' | 'all' = 'all'
): Promise<string> {
  const config = await getGoogleOAuthConfig(locals);
  if (!config) {
    throw new Error('Google OAuth credentials not configured. Please set Client ID and Client Secret.');
  }

  const redirectUri = config.redirectUri || `${origin.replace(/\/$/, '')}/api/auth/google/callback`;
  const scopes = scopeType === 'gsc' ? GSC_SCOPES : ALL_SCOPES;

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent', // Ensures refresh token is always returned
    scope: scopes.join(' '),
    state,
    include_granted_scopes: 'true',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchanges authorization code for access and refresh tokens, then stores connection data.
 */
export async function handleGoogleCallback(
  code: string,
  origin: string,
  locals?: any
): Promise<{ success: boolean; email?: string; error?: string }> {
  const config = await getGoogleOAuthConfig(locals);
  if (!config) {
    return { success: false, error: 'Google OAuth configuration not found.' };
  }

  const redirectUri = config.redirectUri || `${origin.replace(/\/$/, '')}/api/auth/google/callback`;

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const errBody = await tokenRes.text();
      return { success: false, error: `Google token exchange failed (${tokenRes.status}): ${errBody}` };
    }

    const tokenData = (await tokenRes.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in: number;
      scope?: string;
      id_token?: string;
    };

    // Fetch user profile
    let email = '';
    let name = '';
    let picture = '';

    try {
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      if (userRes.ok) {
        const userData = (await userRes.json()) as { email?: string; name?: string; picture?: string };
        email = userData.email || '';
        name = userData.name || '';
        picture = userData.picture || '';
      }
    } catch {}

    const expiresAt = Date.now() + (tokenData.expires_in - 300) * 1000; // 5 min safety buffer

    // Preserve existing refresh token if Google didn't return a new one on re-consent
    let refreshToken = tokenData.refresh_token;
    if (!refreshToken) {
      const current = await getGoogleConnectionData(locals);
      refreshToken = current?.refreshToken;
    }

    const connectionData: GoogleConnectionData = {
      connected: true,
      email,
      name,
      picture,
      accessToken: tokenData.access_token,
      refreshToken,
      expiresAt,
      scopes: tokenData.scope ? tokenData.scope.split(' ') : DEFAULT_SCOPES,
      connectedAt: new Date().toISOString(),
    };

    const db = getDb(locals);
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind(SETTINGS_KEY, JSON.stringify(connectionData))
      .run();

    return { success: true, email };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg };
  }
}

/**
 * Returns raw stored connection data
 */
export async function getGoogleConnectionData(locals?: any): Promise<GoogleConnectionData | null> {
  try {
    const db = getDb(locals);
    const row = await db
      .prepare('SELECT value FROM site_settings WHERE key = ?')
      .bind(SETTINGS_KEY)
      .first<{ value: string }>();

    if (row?.value) {
      return JSON.parse(row.value) as GoogleConnectionData;
    }
  } catch {}

  return null;
}

/**
 * Returns clean connection status for UI display (safe, no secret tokens)
 */
export async function getGoogleAccountStatus(locals?: any): Promise<{
  connected: boolean;
  email?: string;
  name?: string;
  picture?: string;
  connectedAt?: string;
  hasSearchConsole: boolean;
  hasAdSense: boolean;
  hasIndexing: boolean;
}> {
  const data = await getGoogleConnectionData(locals);
  if (!data || !data.connected) {
    return {
      connected: false,
      hasSearchConsole: false,
      hasAdSense: false,
      hasIndexing: false,
    };
  }

  const scopes = data.scopes || [];
  return {
    connected: true,
    email: data.email,
    name: data.name,
    picture: data.picture,
    connectedAt: data.connectedAt,
    hasSearchConsole: scopes.some((s) => s.includes('webmasters')),
    hasAdSense: scopes.some((s) => s.includes('adsense')),
    hasIndexing: scopes.some((s) => s.includes('indexing')),
  };
}

/**
 * Gets an active, non-expired Google access token, auto-refreshing via refresh_token if needed.
 */
export async function getValidGoogleAccessToken(locals?: any): Promise<string | null> {
  const data = await getGoogleConnectionData(locals);
  if (!data || !data.connected) return null;

  const now = Date.now();

  // If token is still valid, return it immediately
  if (data.accessToken && data.expiresAt && data.expiresAt > now) {
    return data.accessToken;
  }

  // Need to refresh token
  if (!data.refreshToken) {
    return null;
  }

  const config = await getGoogleOAuthConfig(locals);
  if (!config) return null;

  try {
    const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: data.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!refreshRes.ok) {
      return null;
    }

    const refreshed = (await refreshRes.json()) as { access_token: string; expires_in: number };
    const newExpiresAt = Date.now() + (refreshed.expires_in - 300) * 1000;

    data.accessToken = refreshed.access_token;
    data.expiresAt = newExpiresAt;

    const db = getDb(locals);
    await db
      .prepare('UPDATE site_settings SET value = ? WHERE key = ?')
      .bind(JSON.stringify(data), SETTINGS_KEY)
      .run();

    return refreshed.access_token;
  } catch {
    return null;
  }
}

/**
 * Disconnects Google Account and removes stored OAuth tokens
 */
export async function disconnectGoogleAccount(locals?: any): Promise<boolean> {
  try {
    const db = getDb(locals);
    await db.prepare('DELETE FROM site_settings WHERE key = ?').bind(SETTINGS_KEY).run();
    return true;
  } catch {
    return false;
  }
}
