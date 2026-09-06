/**
 * Google Search Console API Client
 * Zero-dependency client using Web Crypto and node:crypto for Cloudflare Workers & Node.js
 */

import crypto from 'node:crypto';
import type {
  GscCredentials,
  GscDateRange,
  GscMetricSummary,
  MetricDelta,
  GscPerformanceComparison,
  GscPageRow,
  GscQueryRow,
} from './gsc-types';
import { calculators } from '../../data/calculators';

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function base64Url(input: string | Buffer): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, 'utf-8');
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Creates a signed RS256 JWT for Google OAuth2 Service Account assertion
 */
function createServiceAccountJwt(clientEmail: string, privateKey: string, scope: string): string {
  const cleanKey = privateKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: clientEmail,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const message = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  const signature = signer.sign(cleanKey, 'base64url');

  return `${message}.${signature}`;
}

/**
 * Exchanges signed JWT for Google OAuth2 Bearer Access Token
 */
export async function getGscAccessToken(credentials: GscCredentials): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60000) {
    return cachedAccessToken.token;
  }

  const jwt = createServiceAccountJwt(
    credentials.clientEmail,
    credentials.privateKey,
    'https://www.googleapis.com/auth/webmasters.readonly'
  );

  const bodyParams = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth Token Error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in - 300) * 1000,
  };

  return cachedAccessToken.token;
}

/**
 * Executes a query against Google Search Console Search Analytics API
 */
export async function querySearchAnalytics(
  credentials: GscCredentials,
  body: Record<string, unknown>
): Promise<any> {
  const token = await getGscAccessToken(credentials);
  const siteUrl = encodeURIComponent(credentials.propertyUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Search Console API Error (${response.status}): ${errorText}`);
  }

  return await response.json();
}

/**
 * Tests connection to Google Search Console
 */
export async function testGscConnection(credentials: GscCredentials): Promise<{ success: boolean; message: string }> {
  try {
    const dateRange = getDateRangeStrings('7d');
    await querySearchAnalytics(credentials, {
      startDate: dateRange.current.startDate,
      endDate: dateRange.current.endDate,
      rowLimit: 1,
    });
    return { success: true, message: 'Connected successfully to Google Search Console property.' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: msg };
  }
}

/**
 * Date range calculation with standard 3-day Search Console data availability lag
 */
export function getDateRangeStrings(range: GscDateRange): {
  current: { startDate: string; endDate: string };
  previous: { startDate: string; endDate: string };
} {
  const now = new Date();
  // Buffer of 3 days for GSC data latency
  const lagDays = 3;
  const currentEnd = new Date(now.getTime() - lagDays * 24 * 60 * 60 * 1000);

  let dayCount = 28;
  if (range === '7d') dayCount = 7;
  else if (range === '3m') dayCount = 90;

  const currentStart = new Date(currentEnd.getTime() - (dayCount - 1) * 24 * 60 * 60 * 1000);

  const prevEnd = new Date(currentStart.getTime() - 1 * 24 * 60 * 60 * 1000);
  const prevStart = new Date(prevEnd.getTime() - (dayCount - 1) * 24 * 60 * 60 * 1000);

  const fmt = (d: Date) => d.toISOString().split('T')[0];

  return {
    current: {
      startDate: fmt(currentStart),
      endDate: fmt(currentEnd),
    },
    previous: {
      startDate: fmt(prevStart),
      endDate: fmt(prevEnd),
    },
  };
}

function computeDelta(current: number, previous: number, lowerIsBetter = false): MetricDelta {
  const delta = current - previous;
  const percentageChange = previous > 0 ? (delta / previous) * 100 : current > 0 ? 100 : 0;
  const isPositive = lowerIsBetter ? delta < 0 : delta > 0;

  return {
    current,
    previous,
    delta: Math.round(delta * 100) / 100,
    percentageChange: Math.round(percentageChange * 10) / 10,
    isPositive,
  };
}

/**
 * Maps a full URL to a calculator in our CMS registry
 */
export function mapUrlToCalculator(url: string) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/$/, '') || '/';

    // 1. Direct path match
    const directMatch = calculators.find((c) => c.path.replace(/\/$/, '') === path);
    if (directMatch) return directMatch;

    // 2. Slug ending match
    const slug = path.split('/').filter(Boolean).pop();
    if (slug) {
      const slugMatch = calculators.find((c) => c.slug === slug);
      if (slugMatch) return slugMatch;
    }
  } catch {}
  return null;
}

/**
 * Fetches and assembles the complete performance dataset for a specific date range
 */
export async function fetchGscDatasetForRange(
  credentials: GscCredentials,
  range: GscDateRange
): Promise<{
  performance: GscPerformanceComparison;
  topPages: GscPageRow[];
  topQueries: GscQueryRow[];
  pageQueryData: Array<{ page: string; query: string; clicks: number; impressions: number; ctr: number; position: number }>;
}> {
  const dates = getDateRangeStrings(range);

  // 1. Fetch Current and Previous Aggregates
  const [currSummaryRes, prevSummaryRes] = await Promise.all([
    querySearchAnalytics(credentials, {
      startDate: dates.current.startDate,
      endDate: dates.current.endDate,
    }),
    querySearchAnalytics(credentials, {
      startDate: dates.previous.startDate,
      endDate: dates.previous.endDate,
    }),
  ]);

  const currRow = currSummaryRes.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const prevRow = prevSummaryRes.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  const currentSummary: GscMetricSummary = {
    clicks: currRow.clicks || 0,
    impressions: currRow.impressions || 0,
    ctr: Math.round((currRow.ctr || 0) * 10000) / 100,
    position: Math.round((currRow.position || 0) * 10) / 10,
  };

  const previousSummary: GscMetricSummary = {
    clicks: prevRow.clicks || 0,
    impressions: prevRow.impressions || 0,
    ctr: Math.round((prevRow.ctr || 0) * 10000) / 100,
    position: Math.round((prevRow.position || 0) * 10) / 10,
  };

  const performance: GscPerformanceComparison = {
    dateRange: range,
    currentPeriod: {
      startDate: dates.current.startDate,
      endDate: dates.current.endDate,
      summary: currentSummary,
    },
    previousPeriod: {
      startDate: dates.previous.startDate,
      endDate: dates.previous.endDate,
      summary: previousSummary,
    },
    deltas: {
      clicks: computeDelta(currentSummary.clicks, previousSummary.clicks),
      impressions: computeDelta(currentSummary.impressions, previousSummary.impressions),
      ctr: computeDelta(currentSummary.ctr, previousSummary.ctr),
      position: computeDelta(currentSummary.position, previousSummary.position, true),
    },
  };

  // 2. Fetch Pages (Current vs Previous)
  const [currPagesRes, prevPagesRes] = await Promise.all([
    querySearchAnalytics(credentials, {
      startDate: dates.current.startDate,
      endDate: dates.current.endDate,
      dimensions: ['page'],
      rowLimit: 250,
    }),
    querySearchAnalytics(credentials, {
      startDate: dates.previous.startDate,
      endDate: dates.previous.endDate,
      dimensions: ['page'],
      rowLimit: 250,
    }),
  ]);

  const prevPagesMap = new Map<string, any>();
  for (const r of prevPagesRes.rows || []) {
    const pageUrl = r.keys?.[0];
    if (pageUrl) prevPagesMap.set(pageUrl, r);
  }

  const topPages: GscPageRow[] = [];
  for (const r of currPagesRes.rows || []) {
    const url = r.keys?.[0] || '';
    const prev = prevPagesMap.get(url);
    const pClicks = prev?.clicks || 0;
    const pImpr = prev?.impressions || 0;
    const pCtr = Math.round((prev?.ctr || 0) * 10000) / 100;
    const pPos = Math.round((prev?.position || 0) * 10) / 10;

    const clicks = r.clicks || 0;
    const impressions = r.impressions || 0;
    const ctr = Math.round((r.ctr || 0) * 10000) / 100;
    const position = Math.round((r.position || 0) * 10) / 10;

    const calc = mapUrlToCalculator(url);
    let path = url;
    try { path = new URL(url).pathname; } catch {}

    const clickChangePercent = pClicks > 0 ? Math.round(((clicks - pClicks) / pClicks) * 1000) / 10 : clicks > 0 ? 100 : 0;
    const positionChange = pPos > 0 ? Math.round((position - pPos) * 10) / 10 : 0;

    topPages.push({
      url,
      path,
      calculatorSlug: calc?.slug,
      calculatorName: calc?.name,
      category: calc?.category,
      icon: calc?.icon,
      clicks,
      impressions,
      ctr,
      position,
      previousClicks: pClicks,
      previousImpressions: pImpr,
      previousCtr: pCtr,
      previousPosition: pPos,
      clickChangePercent,
      positionChange,
    });
  }

  topPages.sort((a, b) => b.clicks - a.clicks);

  // 3. Fetch Queries (Current vs Previous)
  const [currQueriesRes, prevQueriesRes] = await Promise.all([
    querySearchAnalytics(credentials, {
      startDate: dates.current.startDate,
      endDate: dates.current.endDate,
      dimensions: ['query'],
      rowLimit: 500,
    }),
    querySearchAnalytics(credentials, {
      startDate: dates.previous.startDate,
      endDate: dates.previous.endDate,
      dimensions: ['query'],
      rowLimit: 500,
    }),
  ]);

  const prevQueriesMap = new Map<string, any>();
  for (const r of prevQueriesRes.rows || []) {
    const q = r.keys?.[0];
    if (q) prevQueriesMap.set(q, r);
  }

  const topQueries: GscQueryRow[] = [];
  for (const r of currQueriesRes.rows || []) {
    const query = r.keys?.[0] || '';
    const prev = prevQueriesMap.get(query);
    const pClicks = prev?.clicks || 0;
    const pImpr = prev?.impressions || 0;
    const pCtr = Math.round((prev?.ctr || 0) * 10000) / 100;
    const pPos = Math.round((prev?.position || 0) * 10) / 10;

    const clicks = r.clicks || 0;
    const impressions = r.impressions || 0;
    const ctr = Math.round((r.ctr || 0) * 10000) / 100;
    const position = Math.round((r.position || 0) * 10) / 10;

    const clickChangePercent = pClicks > 0 ? Math.round(((clicks - pClicks) / pClicks) * 1000) / 10 : clicks > 0 ? 100 : 0;
    const positionChange = pPos > 0 ? Math.round((position - pPos) * 10) / 10 : 0;

    topQueries.push({
      query,
      clicks,
      impressions,
      ctr,
      position,
      previousClicks: pClicks,
      previousImpressions: pImpr,
      previousCtr: pCtr,
      previousPosition: pPos,
      clickChangePercent,
      positionChange,
    });
  }

  topQueries.sort((a, b) => b.clicks - a.clicks);

  // 4. Fetch Multidimensional Page + Query Data for Opportunity Intelligence
  const pageQueryRes = await querySearchAnalytics(credentials, {
    startDate: dates.current.startDate,
    endDate: dates.current.endDate,
    dimensions: ['page', 'query'],
    rowLimit: 500,
  });

  const pageQueryData: Array<{
    page: string;
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }> = [];

  for (const r of pageQueryRes.rows || []) {
    const page = r.keys?.[0] || '';
    const query = r.keys?.[1] || '';
    if (page && query) {
      pageQueryData.push({
        page,
        query,
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        ctr: Math.round((r.ctr || 0) * 10000) / 100,
        position: Math.round((r.position || 0) * 10) / 10,
      });
    }
  }

  // Link top page & calculator to query rows
  for (const q of topQueries) {
    const matched = pageQueryData.find((pq) => pq.query.toLowerCase() === q.query.toLowerCase());
    if (matched) {
      q.topPageUrl = matched.page;
      const calc = mapUrlToCalculator(matched.page);
      if (calc) q.topCalculatorSlug = calc.slug;
    }
  }

  return {
    performance,
    topPages,
    topQueries,
    pageQueryData,
  };
}
