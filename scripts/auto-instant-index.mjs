#!/usr/bin/env node
/**
 * Automated Instant Indexing Script for aifreecalculator.com
 * Supports:
 *  1. Google Indexing API (Googlebot crawling prompt)
 *  2. IndexNow API (Bing, Yandex, Seznam, Naver)
 * 
 * Safety Rules:
 *  - STRICTLY BLOCKS any localhost / 127.0.0.1 URLs.
 *  - Verifies that every URL is 100% ONLINE & LIVE on https://aifreecalculator.com (HTTP 200)
 *    before notifying Google, preventing crawl errors for unreleased pages.
 * 
 * Usage:
 *  npm run instant-index                               # Auto-detects new/changed live URLs and indexes them
 *  npm run instant-index -- --all                      # Re-checks and indexes all live canonical URLs
 *  npm run instant-index -- --url <LIVE_URL>           # Indexes a specific live URL
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DOMAIN = 'https://aifreecalculator.com';
const HOST = 'aifreecalculator.com';
const INDEXNOW_KEY = '9f8e4d2a1b7c3e5a6f0b8c2d4e1a7f9b';
const INDEXNOW_KEY_LOCATION = `${DOMAIN}/${INDEXNOW_KEY}.txt`;
const CACHE_FILE = path.join(process.cwd(), '.indexed-cache.json');
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), 'service-account.json');

// --- Helper: Base64URL for JWT ---
function base64Url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// --- Safety: Strictly Disallow Localhost URLs ---
function isSafeProductionUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('localhost') || url.includes('127.0.0.1') || url.includes('0.0.0.0')) {
    return false;
  }
  return url.startsWith(DOMAIN);
}

// --- Verification: Check if URL is live online (HTTP 200) on main domain ---
async function isUrlLiveOnline(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'AIFreeCalculator-IndexingVerifier/1.0' },
      signal: AbortSignal.timeout(4000)
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

// --- Google OAuth2 JWT Generator ---
async function getGoogleAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedClaim = base64Url(JSON.stringify(claim));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(key.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('Google OAuth token error: ' + JSON.stringify(data));
  }
  return data.access_token;
}

// --- Submit single URL to Google Indexing API ---
async function submitToGoogle(token, url) {
  if (!isSafeProductionUrl(url)) {
    return { ok: false, status: 400, data: { error: { message: 'Blocked non-production URL' } } };
  }

  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      url,
      type: 'URL_UPDATED'
    })
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

// --- Submit batch to IndexNow ---
async function submitToIndexNow(urlList) {
  const safeList = urlList.filter(isSafeProductionUrl);
  if (safeList.length === 0) return { ok: true, count: 0 };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: safeList.slice(0, 10000)
    })
  });
  return { status: res.status, ok: res.ok || res.status === 200 || res.status === 202 };
}

// --- Scan Canonical URLs from Project ---
function getCanonicalUrls() {
  const urls = [];
  const pagesDir = path.join(process.cwd(), 'src', 'pages');

  function scan(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        if (item === 'admin' || item === 'api') continue; // exclude admin and API
        scan(full);
      } else if (item.endsWith('.astro')) {
        let rel = path.relative(pagesDir, full).replace(/\\/g, '/');
        // Filter out 404, 500, dynamic templates without param
        if (rel.includes('404') || rel.includes('500')) continue;
        if (rel.includes('[lang]') || rel.includes('[...slug]')) continue;

        // Redirect stubs to exclude
        if (rel.includes('percentage-calculator') && rel.startsWith('general/')) continue;
        if (rel.includes('date-difference-calculator')) continue;
        if (rel.includes('standard-deviation-calculator') && rel.startsWith('math/')) continue;
        if (rel.startsWith('brickwork-calculator.astro')) continue;

        // Convert file path to URL on live production domain
        let urlPath = '/' + rel.replace(/\.astro$/, '');
        if (urlPath.endsWith('/index')) {
          urlPath = urlPath.replace(/\/index$/, '/');
        } else {
          urlPath = urlPath + '/';
        }
        if (urlPath === '//') urlPath = '/';

        const fileHash = crypto.createHash('md5').update(fs.readFileSync(full)).digest('hex');
        urls.push({
          url: `${DOMAIN}${urlPath}`,
          filePath: full,
          hash: fileHash,
          mtime: stat.mtimeMs
        });
      }
    }
  }

  scan(pagesDir);
  return urls;
}

// --- Load and Save Cache ---
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

// --- Main Runner ---
async function main() {
  const args = process.argv.slice(2);
  console.log('========================================================');
  console.log('   🚀 AIFreeCalculator Instant Indexing Engine');
  console.log('========================================================');

  // Handle specific URL argument
  const urlArgIndex = args.indexOf('--url');
  if (urlArgIndex !== -1 && args[urlArgIndex + 1]) {
    const singleUrl = args[urlArgIndex + 1];

    if (!isSafeProductionUrl(singleUrl)) {
      console.error(`❌ ERROR: "${singleUrl}" is NOT a valid production URL!`);
      console.error(`Localhost and non-${DOMAIN} URLs are strictly blocked from being submitted.`);
      process.exit(1);
    }

    console.log(`\nChecking if live online: ${singleUrl}...`);
    const isLive = await isUrlLiveOnline(singleUrl);
    if (!isLive) {
      console.warn(`⚠️ URL is not currently returning HTTP 200 on ${DOMAIN}!`);
      console.warn(`Skipping submission to prevent crawl errors. Deploy the page first, then re-index.`);
      return;
    }

    console.log(`✅ Verified live (HTTP 200). Submitting to search engines...`);

    // Check Google credentials
    let googleToken = null;
    if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
      const key = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
      googleToken = await getGoogleAccessToken(key);
    }

    // 1. Google
    if (googleToken) {
      process.stdout.write('  -> Google Indexing API... ');
      const gRes = await submitToGoogle(googleToken, singleUrl);
      console.log(gRes.ok ? 'SUCCESS' : `FAILED (${gRes.status})`);
    }

    // 2. IndexNow
    process.stdout.write('  -> IndexNow (Bing/Yandex)... ');
    const inRes = await submitToIndexNow([singleUrl]);
    console.log(inRes.ok ? 'SUCCESS' : `FAILED (${inRes.status})`);
    return;
  }

  // Scan project URLs
  const allUrls = getCanonicalUrls();
  const cache = loadCache();
  const isForceAll = args.includes('--all');

  const pendingUrls = [];
  for (const item of allUrls) {
    const cached = cache[item.url];
    if (isForceAll || !cached || cached.hash !== item.hash) {
      pendingUrls.push(item);
    }
  }

  console.log(`Total Canonical Pages Scanned: ${allUrls.length}`);
  console.log(`New or Modified Pages to Index: ${pendingUrls.length}`);

  if (pendingUrls.length === 0) {
    console.log('\n✨ All URLs are up-to-date in the index cache! No new pages detected.');
    console.log('Tip: Run with --all to force-submit all live canonical URLs.');
    return;
  }

  // Live Online Safety Verification: Only submit pages that are ACTUALLY live on the main domain
  console.log(`\n🔍 Pre-Flight Safety Check: Verifying pages are published live on ${DOMAIN}...`);
  const liveUrls = [];
  const offlineUrls = [];

  for (const item of pendingUrls) {
    const isLive = await isUrlLiveOnline(item.url);
    if (isLive) {
      liveUrls.push(item);
    } else {
      offlineUrls.push(item);
    }
  }

  if (offlineUrls.length > 0) {
    console.log(`ℹ️ Notice: Skipped ${offlineUrls.length} page(s) because they are not yet published online (HTTP 404 or draft). They will be indexed automatically once you deploy them!`);
  }

  if (liveUrls.length === 0) {
    console.log('\n⚠️ No new published live pages found on the main domain. Deploy to Cloudflare first, then index.');
    return;
  }

  console.log(`✅ Verified ${liveUrls.length} page(s) live and ready for indexing.`);

  // Check Google credentials
  let googleToken = null;
  if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    try {
      const key = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
      googleToken = await getGoogleAccessToken(key);
      console.log('✅ Google Search Console Service Account: Authenticated');
    } catch (err) {
      console.warn('⚠️ Google Auth Warning:', err.message);
    }
  }

  // 1. Submit batch to IndexNow (Unlimited / All in one request)
  console.log('\n📡 [1/2] Submitting to IndexNow (Bing, Yandex, Seznam)...');
  const indexNowUrlList = liveUrls.map(p => p.url);
  try {
    const inRes = await submitToIndexNow(indexNowUrlList);
    if (inRes.ok) {
      console.log(`✅ IndexNow: Successfully submitted ${indexNowUrlList.length} URLs in a single batch!`);
    } else {
      console.warn(`⚠️ IndexNow returned HTTP status: ${inRes.status}`);
    }
  } catch (err) {
    console.error('❌ IndexNow Error:', err.message);
  }

  // 2. Submit to Google Indexing API (Max 200/day per quota)
  if (googleToken) {
    console.log('\n📡 [2/2] Submitting to Google Indexing API (Googlebot Queue)...');
    const googleLimit = 190;
    const toSubmitGoogle = liveUrls.slice(0, googleLimit);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < toSubmitGoogle.length; i++) {
      const item = toSubmitGoogle[i];
      const res = await submitToGoogle(googleToken, item.url);
      if (res.ok) {
        successCount++;
        cache[item.url] = {
          lastIndexed: new Date().toISOString(),
          hash: item.hash
        };
      } else {
        failCount++;
        console.warn(`  [!] Failed ${item.url}: ${res.data?.error?.message || res.status}`);
      }

      await new Promise(r => setTimeout(r, 80));
    }

    console.log(`✅ Google Indexing API: ${successCount} submitted, ${failCount} failed.`);
    if (liveUrls.length > googleLimit) {
      console.log(`ℹ️ Note: Remaining ${liveUrls.length - googleLimit} URLs deferred to respect daily quota.`);
    }
  } else {
    for (const item of liveUrls) {
      cache[item.url] = {
        lastIndexed: new Date().toISOString(),
        hash: item.hash
      };
    }
  }

  saveCache(cache);
  console.log('\n🎉 Instant Indexing Process Completed Successfully!');
}

main().catch(err => {
  console.error('\nFatal Error in Instant Indexing Script:', err);
  process.exit(1);
});
