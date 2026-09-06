/**
 * Google AdSense Management API v2 Client
 * Zero external dependencies. Uses standard fetch with Google OAuth 2.0.
 */

import type { AdSenseConfig, DailyAdSenseMetric } from './types';

const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const ADSENSE_API_BASE = 'https://adsense.googleapis.com/v2';
export const ADSENSE_SCOPE = 'https://www.googleapis.com/auth/adsense.readonly';

/**
 * Exchange Authorization Code for Refresh and Access Tokens
 */
export async function exchangeCodeForTokens(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string
): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}> {
  const params = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Google OAuth token exchange failed (${res.status}): ${errorBody}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Refresh an expired Google OAuth access token using the stored refresh token
 */
export async function refreshAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
): Promise<{
  accessToken: string;
  expiresIn: number;
}> {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to refresh Google AdSense access token (${res.status}): ${errorBody}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
    token_type: string;
  };

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Get a valid access token for the AdSense config, refreshing if necessary
 */
export async function getValidAccessToken(
  config: AdSenseConfig
): Promise<{ accessToken: string; updatedConfig?: Partial<AdSenseConfig> }> {
  const now = Date.now();

  // If existing access token is valid for at least another 2 minutes, reuse it
  if (config.accessToken && config.accessTokenExpiresAt && config.accessTokenExpiresAt > now + 120000) {
    return { accessToken: config.accessToken };
  }

  // Refresh token required
  if (!config.refreshToken) {
    throw new Error('No refresh token available. Reconnect Google AdSense to authorize reporting access.');
  }

  const { accessToken, expiresIn } = await refreshAccessToken(
    config.clientId,
    config.clientSecret,
    config.refreshToken
  );

  const expiresAt = now + (expiresIn - 120) * 1000;

  return {
    accessToken,
    updatedConfig: {
      accessToken,
      accessTokenExpiresAt: expiresAt,
    },
  };
}

/**
 * Fetch available AdSense accounts accessible by the connected credentials
 */
export async function listAdSenseAccounts(
  accessToken: string
): Promise<Array<{ name: string; displayName: string; pendingTasks?: any[] }>> {
  const res = await fetch(`${ADSENSE_API_BASE}/accounts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list Google AdSense accounts (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as {
    accounts?: Array<{ name: string; displayName: string }>;
  };

  return data.accounts || [];
}

interface AdSenseReportRow {
  date: string;
  estimatedEarnings: number;
  impressions: number;
  pageViews: number | null;
  clicks: number | null;
  pageViewsRpm: number | null;
  impressionsRpm: number | null;
  currency: string;
}

/**
 * Generates an AdSense report for a given date range across DATE dimension
 */
export async function fetchAdSenseReport(
  accountId: string,
  startDateStr: string, // YYYY-MM-DD
  endDateStr: string,   // YYYY-MM-DD
  accessToken: string
): Promise<{
  rows: AdSenseReportRow[];
  currency: string;
  total: {
    estimatedEarnings: number;
    impressions: number;
    pageViews: number | null;
    clicks: number | null;
    pageViewsRpm: number | null;
    impressionsRpm: number | null;
  };
}> {
  // Normalize account identifier (must be e.g. "accounts/pub-1234567890123456")
  const normalizedAccount = accountId.startsWith('accounts/') ? accountId : `accounts/${accountId}`;

  const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDateStr.split('-').map(Number);

  const url = new URL(`${ADSENSE_API_BASE}/${normalizedAccount}/reports:generate`);
  url.searchParams.set('dateRange', 'CUSTOM');
  url.searchParams.set('startDate.year', String(startYear));
  url.searchParams.set('startDate.month', String(startMonth));
  url.searchParams.set('startDate.day', String(startDay));
  url.searchParams.set('endDate.year', String(endYear));
  url.searchParams.set('endDate.month', String(endMonth));
  url.searchParams.set('endDate.day', String(endDay));

  // Request key standard AdSense metrics
  const requestedMetrics = [
    'ESTIMATED_EARNINGS',
    'IMPRESSIONS',
    'PAGE_VIEWS',
    'CLICKS',
    'PAGE_VIEWS_RPM',
    'IMPRESSIONS_RPM',
  ];

  requestedMetrics.forEach((m) => url.searchParams.append('metrics', m));
  url.searchParams.append('dimensions', 'DATE');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AdSense Report Error (${res.status}): ${errorText}`);
  }

  const data = await res.json() as {
    headers?: Array<{ name: string; type: string; currencyCode?: string }>;
    rows?: Array<{ cells: Array<{ value: string }> }>;
    total?: { cells: Array<{ value: string }> };
    startDate?: { year: number; month: number; day: number };
    endDate?: { year: number; month: number; day: number };
  };

  const headers = data.headers || [];
  const dateIdx = headers.findIndex((h) => h.name === 'DATE');
  const earningsIdx = headers.findIndex((h) => h.name === 'ESTIMATED_EARNINGS');
  const impIdx = headers.findIndex((h) => h.name === 'IMPRESSIONS');
  const pvIdx = headers.findIndex((h) => h.name === 'PAGE_VIEWS');
  const clicksIdx = headers.findIndex((h) => h.name === 'CLICKS');
  const pvRpmIdx = headers.findIndex((h) => h.name === 'PAGE_VIEWS_RPM');
  const impRpmIdx = headers.findIndex((h) => h.name === 'IMPRESSIONS_RPM');

  // Detect currency from headers
  const currencyHeader = headers.find((h) => h.currencyCode);
  const currency = currencyHeader?.currencyCode || 'INR';

  const rows: AdSenseReportRow[] = (data.rows || []).map((row) => {
    const cells = row.cells || [];
    const dateVal = dateIdx !== -1 && cells[dateIdx]?.value ? cells[dateIdx].value : '';
    // Format dateVal: Google returns YYYY-MM-DD or YYYYMMDD
    let formattedDate = dateVal;
    if (dateVal.length === 8 && !dateVal.includes('-')) {
      formattedDate = `${dateVal.slice(0, 4)}-${dateVal.slice(4, 6)}-${dateVal.slice(6, 8)}`;
    }

    const earnings = earningsIdx !== -1 && cells[earningsIdx]?.value ? parseFloat(cells[earningsIdx].value) || 0 : 0;
    const impressions = impIdx !== -1 && cells[impIdx]?.value ? parseInt(cells[impIdx].value, 10) || 0 : 0;
    const pageViews = pvIdx !== -1 && cells[pvIdx]?.value ? parseInt(cells[pvIdx].value, 10) || 0 : null;
    const clicks = clicksIdx !== -1 && cells[clicksIdx]?.value ? parseInt(cells[clicksIdx].value, 10) || 0 : null;
    const pageViewsRpm = pvRpmIdx !== -1 && cells[pvRpmIdx]?.value ? parseFloat(cells[pvRpmIdx].value) || 0 : null;
    const impressionsRpm = impRpmIdx !== -1 && cells[impRpmIdx]?.value ? parseFloat(cells[impRpmIdx].value) || 0 : null;

    return {
      date: formattedDate,
      estimatedEarnings: earnings,
      impressions,
      pageViews,
      clicks,
      pageViewsRpm,
      impressionsRpm,
      currency,
    };
  });

  // Sort rows chronologically
  rows.sort((a, b) => a.date.localeCompare(b.date));

  // Parse total row
  let totalObj = {
    estimatedEarnings: 0,
    impressions: 0,
    pageViews: null as number | null,
    clicks: null as number | null,
    pageViewsRpm: null as number | null,
    impressionsRpm: null as number | null,
  };

  if (data.total?.cells) {
    const tc = data.total.cells;
    totalObj = {
      estimatedEarnings: earningsIdx !== -1 && tc[earningsIdx]?.value ? parseFloat(tc[earningsIdx].value) || 0 : 0,
      impressions: impIdx !== -1 && tc[impIdx]?.value ? parseInt(tc[impIdx].value, 10) || 0 : 0,
      pageViews: pvIdx !== -1 && tc[pvIdx]?.value ? parseInt(tc[pvIdx].value, 10) || 0 : null,
      clicks: clicksIdx !== -1 && tc[clicksIdx]?.value ? parseInt(tc[clicksIdx].value, 10) || 0 : null,
      pageViewsRpm: pvRpmIdx !== -1 && tc[pvRpmIdx]?.value ? parseFloat(tc[pvRpmIdx].value) || 0 : null,
      impressionsRpm: impRpmIdx !== -1 && tc[impRpmIdx]?.value ? parseFloat(tc[impRpmIdx].value) || 0 : null,
    };
  } else {
    // If no total cell, aggregate from rows
    const totalEarnings = rows.reduce((acc, r) => acc + r.estimatedEarnings, 0);
    const totalImpressions = rows.reduce((acc, r) => acc + r.impressions, 0);
    const hasPv = rows.some((r) => r.pageViews !== null);
    const totalPv = hasPv ? rows.reduce((acc, r) => acc + (r.pageViews || 0), 0) : null;
    const hasClicks = rows.some((r) => r.clicks !== null);
    const totalClicks = hasClicks ? rows.reduce((acc, r) => acc + (r.clicks || 0), 0) : null;
    const pageViewsRpm = totalPv && totalPv > 0 ? (totalEarnings / totalPv) * 1000 : null;
    const impressionsRpm = totalImpressions > 0 ? (totalEarnings / totalImpressions) * 1000 : null;

    totalObj = {
      estimatedEarnings: Math.round(totalEarnings * 100) / 100,
      impressions: totalImpressions,
      pageViews: totalPv,
      clicks: totalClicks,
      pageViewsRpm: pageViewsRpm ? Math.round(pageViewsRpm * 100) / 100 : null,
      impressionsRpm: impressionsRpm ? Math.round(impressionsRpm * 100) / 100 : null,
    };
  }

  return {
    rows,
    currency,
    total: totalObj,
  };
}
