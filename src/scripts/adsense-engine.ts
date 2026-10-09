/**
 * Client-Side Google AdSense Slot Hydration Engine
 * Bundled and cached asset. Serves static /adsense-config.json without invoking Cloudflare Worker or D1.
 */

import {
  DEFAULT_ADS_CONFIG,
  DEFAULT_SMART_THROTTLING,
  type AdsConfig,
  type SmartThrottlingConfig,
} from '../lib/ads-config';

(function initAdSenseEngine() {
  if (typeof window === 'undefined') return;

  const CACHE_KEY = 'adsense_cfg';
  const CACHE_TTL = 86_400_000; // 24 hours client cache
  let inMemoryConfig: AdsConfig | null = null;
  let inFlightConfigPromise: Promise<AdsConfig | null> | null = null;

  function extractPublicAdsConfig(config: Partial<AdsConfig>): AdsConfig {
    return {
      enabled: typeof config.enabled === 'boolean' ? config.enabled : DEFAULT_ADS_CONFIG.enabled,
      clientId: typeof config.clientId === 'string' ? config.clientId : DEFAULT_ADS_CONFIG.clientId,
      testMode: config.testMode === true,
      autoAds: config.autoAds === true,
      approvalMode: config.approvalMode !== undefined ? Boolean(config.approvalMode) : (DEFAULT_ADS_CONFIG.approvalMode ?? true),
      isConfigured: Boolean(config.isConfigured),
      gaMeasurementId: typeof config.gaMeasurementId === 'string' ? config.gaMeasurementId : (DEFAULT_ADS_CONFIG.gaMeasurementId || ''),
      headerScript: typeof config.headerScript === 'string' ? config.headerScript : '',
      customMetaTags: typeof config.customMetaTags === 'string' ? config.customMetaTags : '',
      smartThrottling: config.smartThrottling || DEFAULT_SMART_THROTTLING,
      slots: config.slots || DEFAULT_ADS_CONFIG.slots,
    };
  }

  function isValidPublicConfig(cfg: unknown): cfg is AdsConfig {
    return Boolean(
      cfg &&
      typeof cfg === 'object' &&
      typeof (cfg as any).slots === 'object'
    );
  }

  function persistToStorage(data: AdsConfig): void {
    try {
      const payload = JSON.stringify({ data, expiry: Date.now() + CACHE_TTL });
      localStorage.setItem(CACHE_KEY, payload);
    } catch {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, expiry: Date.now() + CACHE_TTL }));
      } catch {}
    }
  }

  function readFromStorage(): AdsConfig | null {
    if (inMemoryConfig) return inMemoryConfig;
    try {
      const cached = localStorage.getItem(CACHE_KEY) || sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (
          parsed &&
          typeof parsed.expiry === 'number' &&
          parsed.expiry > Date.now() &&
          isValidPublicConfig(parsed.data)
        ) {
          inMemoryConfig = extractPublicAdsConfig(parsed.data);
          return inMemoryConfig;
        }
      }
    } catch {
      // localStorage disabled or sandbox restricted
    }
    return null;
  }

  function getAdsConfig(forceRefresh = false): Promise<AdsConfig | null> {
    // Allow URL override for instant testing/previewing: ?preview_ads=1, ?test_ads=1, ?preview=ads
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const forcePreview =
      urlParams.has('preview_ads') ||
      urlParams.has('test_ads') ||
      urlParams.get('preview') === 'ads' ||
      urlParams.get('ad_mode') === 'test';

    // 1. Immediately return valid cached configuration if available (Zero Network Request)
    if (!forcePreview && !forceRefresh) {
      const stored = readFromStorage();
      if (stored) {
        return Promise.resolve(stored);
      }

      // Use build-time public config before API fetch to avoid a Worker invocation on first visit.
      const initialConfig = (window as any).__AFC_ADS_CONFIG__;
      if (isValidPublicConfig(initialConfig)) {
        const publicConfig = extractPublicAdsConfig(initialConfig);
        inMemoryConfig = publicConfig;
        persistToStorage(publicConfig);
        return Promise.resolve(publicConfig);
      }
    }

    // 2. If a fetch is already in flight, share the single in-flight Promise among all simultaneous callers
    if (inFlightConfigPromise && !forceRefresh) {
      return inFlightConfigPromise;
    }

    // 3. Initiate single API request for missing/expired/forced cache
    inFlightConfigPromise = (async () => {
      try {
        const fetchUrl = forcePreview || forceRefresh
          ? `/adsense-config.json?t=${Date.now()}`
          : '/adsense-config.json';

        const res = await fetch(fetchUrl);
        if (res.ok) {
          const data = (await res.json()) as AdsConfig;
          if (isValidPublicConfig(data)) {
            if (forcePreview) {
              data.testMode = true;
            }

            const publicConfig = extractPublicAdsConfig(data);
            inMemoryConfig = publicConfig;
            persistToStorage(publicConfig);
            return publicConfig;
          }
        }
      } catch (err) {
        console.warn('[Ads Engine] Failed to fetch static ads config:', err);
      }

      // 4. Graceful fallback if network request fails or static JSON is unavailable
      const fallbackRaw = ((window as any).__AFC_ADS_CONFIG__ as AdsConfig) || DEFAULT_ADS_CONFIG;
      const fallback = extractPublicAdsConfig(fallbackRaw);
      if (forcePreview) {
        fallback.testMode = true;
      }
      inMemoryConfig = fallback;
      return fallback;
    })().catch((err) => {
      console.warn('[Ads Engine] Unexpected error resolving ads config:', err);
      const fallbackRaw = ((window as any).__AFC_ADS_CONFIG__ as AdsConfig) || DEFAULT_ADS_CONFIG;
      const fallback = extractPublicAdsConfig(fallbackRaw);
      if (forcePreview) {
        fallback.testMode = true;
      }
      inMemoryConfig = fallback;
      return fallback;
    }).finally(() => {
      inFlightConfigPromise = null;
    });

    return inFlightConfigPromise;
  }

  // Alias for backward compatibility within engine
  const fetchAdConfig = getAdsConfig;

  function loadGoogleScript(clientId: string) {
    if (!clientId || !clientId.startsWith('ca-pub-')) return;

    if (
      (window as any).__afcAdSenseLoaded ||
      document.querySelector('script[src*="pagead2.googlesyndication.com"]')
    ) {
      return;
    }

    // The head loader defers adsbygoogle.js off the critical path.
    // When an ad unit is actually about to render, force it in now.
    if (typeof (window as any).__afcLoadAdSense === 'function') {
      (window as any).__afcLoadAdSense();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    (window as any).__afcAdSenseLoaded = true;
    document.head.appendChild(script);
  }

  function loadHeaderScript(headerCode: string) {
    if (!headerCode || !headerCode.trim()) return;
    if (document.querySelector('[data-aifree-header-tag]')) return;

    let raw = headerCode.trim();
    // If raw JavaScript is provided without <script> tags, wrap it automatically
    if (!raw.includes('<script') && !raw.includes('<link') && !raw.includes('<meta')) {
      raw = `<script>${raw}<\/script>`;
    }

    const parser = document.createElement('div');
    parser.innerHTML = raw;

    Array.from(parser.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toUpperCase();

        if (tag === 'SCRIPT') {
          const srcAttr = el.getAttribute('src');
          if (srcAttr) {
            // Deduplicate: Don't inject if exact src or matching AdSense/Ahrefs script already exists
            if (
              document.querySelector(`script[src="${srcAttr}"]`) ||
              (srcAttr.includes('pagead2.googlesyndication.com') &&
                document.querySelector('script[src*="pagead2.googlesyndication.com"]')) ||
              (srcAttr.includes('analytics.ahrefs.com') &&
                document.querySelector('script[src*="analytics.ahrefs.com"]'))
            ) {
              return;
            }
          }

          const script = document.createElement('script');
          Array.from(el.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.setAttribute('data-aifree-header-tag', 'true');
          if (el.textContent && el.textContent.trim()) {
            script.textContent = el.textContent;
          }
          document.head.appendChild(script);
        } else {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.setAttribute('data-aifree-header-tag', 'true');
          document.head.appendChild(clone);
        }
      }
    });
  }

  function loadMetaTags(metaTagsString: string) {
    if (!metaTagsString || !metaTagsString.trim()) return;
    if (document.querySelector('[data-aifree-meta-tag]')) return;

    const parser = document.createElement('div');
    parser.innerHTML = metaTagsString.trim();

    Array.from(parser.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const clone = el.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-aifree-meta-tag', 'true');
        document.head.appendChild(clone);
      }
    });
  }

  function injectCustomCode(container: HTMLElement, codeString: string) {
    container.innerHTML = '';
    const temp = document.createElement('div');
    temp.innerHTML = codeString;

    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName.toUpperCase() === 'SCRIPT') {
          const s = document.createElement('script');
          Array.from(el.attributes).forEach((attr) => {
            s.setAttribute(attr.name, attr.value);
          });
          if (el.textContent && el.textContent.trim()) {
            s.textContent = el.textContent;
          }
          container.appendChild(s);
        } else {
          container.appendChild(el.cloneNode(true));
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        container.appendChild(document.createTextNode(node.textContent));
      }
    });
  }

  function loadGoogleAnalytics(gaId: string) {
    if (!gaId || !gaId.startsWith('G-')) return;

    // Install or preserve standard gtag queue
    (window as any).dataLayer = (window as any).dataLayer || [];
    if (!(window as any).gtag) {
      (window as any).gtag = function (...args: any[]) {
        (window as any).dataLayer.push(args);
      };
      (window as any).gtag('js', new Date());
    }

    // Configure only if not already configured with this ID
    if ((window as any).__afcCurrentGAId !== gaId) {
      (window as any).__afcCurrentGAId = gaId;
      (window as any).gtag('config', gaId);
    }

    // If script is already loaded or being fetched, prevent duplicate
    if (
      (window as any).__afcGALoaded ||
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
    ) {
      return;
    }

    // Delegate to deferred loader from GoogleAnalytics.astro if available
    if (typeof (window as any).__afcLoadGA === 'function') {
      (window as any).__afcLoadGA();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    (window as any).__afcGALoaded = true;
    document.head.appendChild(script);
  }

  function escapeText(str: unknown): string {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function renderAdSlots(forceRefresh = false) {
    const config = await fetchAdConfig(forceRefresh === true);
    if (!config) return;

    // 1. ALWAYS load Global Header Script / Tags (AdX, Prebid, Ezoic, GTM) immediately in <head>
    if (config.headerScript && config.headerScript.trim()) {
      loadHeaderScript(config.headerScript);
    }

    // 2. ALWAYS load Custom Meta Tags (Google Search Console, Bing, Pinterest, SEO) immediately in <head>
    if (config.customMetaTags && config.customMetaTags.trim()) {
      loadMetaTags(config.customMetaTags);
    }

    // 3. ALWAYS load Google Analytics 4 dynamically if configured in admin settings
    if (config.gaMeasurementId && config.gaMeasurementId.trim()) {
      loadGoogleAnalytics(config.gaMeasurementId);
    }

    const slotElements = document.querySelectorAll<HTMLElement>('[data-ad-slot-location]');
    if (!slotElements.length) return;

    function hideSlot(el: HTMLElement) {
      el.style.display = 'none';
      el.setAttribute('hidden', '');
      el.classList.add('hidden');
    }

    function showSlot(el: HTMLElement) {
      el.style.display = 'block';
      el.removeAttribute('hidden');
      el.classList.remove('hidden');
    }

    // If no config or globally disabled AND Test Mode is OFF
    if (!config.enabled && config.testMode !== true) {
      slotElements.forEach(hideSlot);
      return;
    }

    // ─── Smart Ads Throttling ──────────────────────────────────────────
    const throttling: SmartThrottlingConfig = config.smartThrottling || DEFAULT_SMART_THROTTLING;
    if (throttling.enabled) {
      // 1. Connection-aware throttling (2G / Save-Data)
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (throttling.disableOnSlowConnection && conn) {
        if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
          console.info('[Smart Ads] Suppressed ads due to slow connection / Save-Data mode.');
          slotElements.forEach(hideSlot);
          return;
        }
      }
    }

    // 1. If TEST MODE is explicitly TRUE
    if (config.testMode === true) {
      slotElements.forEach((el) => {
        const rawLocation = el.getAttribute('data-ad-slot-location') || '';
        const location = rawLocation.toLowerCase();
        const locationAlt = location.includes('-')
          ? location.replace(/-/g, '_')
          : location.replace(/_/g, '-');
        const slotConfig = (config.slots as any)?.[location] || (config.slots as any)?.[locationAlt] || {};
        const slotId = el.getAttribute('data-prop-slot-id') || slotConfig.slotId || '1234567890';
        const label = slotConfig.label || `${location.toUpperCase()} Ad Slot`;
        const isEnabled = slotConfig.enabled !== false;
        const net = slotConfig.adNetwork || 'adsense';

        if (!isEnabled) {
          hideSlot(el);
          return;
        }

        showSlot(el);
        const container = (el.querySelector('.ad-content-slot') as HTMLElement) || el;

        let networkLabel = 'GOOGLE ADSENSE';
        let networkDetails = `Ad Unit Slot ID: <strong>${escapeText(slotId)}</strong>`;
        let badgeColor =
          'border-amber-400 bg-amber-50/90 text-amber-900 dark:border-amber-600 dark:bg-amber-950/60 dark:text-amber-200';

        if (net === 'adx') {
          networkLabel = 'GOOGLE ADX / CUSTOM SCRIPT';
          networkDetails = `Custom Ad Tag Configured | Placement: <code>${escapeText(location)}</code>`;
          badgeColor =
            'border-purple-400 bg-purple-50/90 text-purple-900 dark:border-purple-600 dark:bg-purple-950/60 dark:text-purple-200';
        } else if (net === 'direct_sponsor') {
          networkLabel = 'DIRECT SPONSOR BANNER';
          networkDetails = `Target: <span class="font-mono text-xs">${escapeText(slotConfig.sponsorTargetUrl || 'https://sponsor-link.com')}</span>`;
          badgeColor =
            'border-emerald-400 bg-emerald-50/90 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-200';
        } else if (net === 'affiliate') {
          networkLabel = 'AFFILIATE CREATIVE';
          networkDetails = `Affiliate URL: <span class="font-mono text-xs">${escapeText(slotConfig.sponsorTargetUrl || 'https://affiliate-link.com')}</span>`;
          badgeColor =
            'border-blue-400 bg-blue-50/90 text-blue-900 dark:border-blue-600 dark:bg-blue-950/60 dark:text-blue-200';
        }

        container.innerHTML = `
          <div class="w-full rounded-2xl border-2 border-dashed ${badgeColor} p-4 text-center shadow-xs select-none">
            <div class="text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
              <span>🛠️</span> ${networkLabel} TEST MODE • ${escapeText(label)}
            </div>
            <div class="mt-1 text-xs font-bold">
              Placement: <code>${escapeText(location)}</code>
            </div>
            <div class="mt-1 text-[11px] font-mono">
              ${networkDetails}
            </div>
          </div>
        `;
      });
      return;
    }

    // 1.5. AdSense Approval / Review Mode
    // When approvalMode is active, the site keeps only the official Google AdSense script
    // and completely hides/suppresses all manual ad slots to prevent policy violations (blank placeholders, low content ratio)
    if (config.approvalMode) {
      if (config.clientId && config.clientId.startsWith('ca-pub-')) {
        loadGoogleScript(config.clientId);
      }
      slotElements.forEach(hideSlot);
      return;
    }

    // 2. Real Live Mode (enabled = true, testMode = false)
    if (config.enabled) {
      // Load Google AdSense library if publisher client ID is present and adsense is used
      const hasAdsenseSlot = Object.values(config.slots || {}).some(
        (s: any) => !s.adNetwork || s.adNetwork === 'adsense'
      );
      if (hasAdsenseSlot && config.clientId && config.clientId.startsWith('ca-pub-')) {
        loadGoogleScript(config.clientId);
      }

      const isMobile = window.innerWidth < 768;
      const maxMobile =
        throttling.enabled && typeof throttling.maxMobileAds === 'number'
          ? throttling.maxMobileAds
          : 0;
      let mobileRenderedCount = 0;

      function renderSlotElement(el: HTMLElement) {
        const rawLocation = el.getAttribute('data-ad-slot-location') || '';
        const location = rawLocation.toLowerCase();
        const locationAlt = location.includes('-')
          ? location.replace(/-/g, '_')
          : location.replace(/_/g, '-');
        const slotConfig = (config?.slots as any)?.[location] || (config?.slots as any)?.[locationAlt] || {};
        const isEnabled = slotConfig.enabled !== false;
        const net = slotConfig.adNetwork || 'adsense';
        const customCode = (slotConfig.customCode || '').trim();
        const slotId = el.getAttribute('data-prop-slot-id') || slotConfig.slotId;

        if (!isEnabled) {
          hideSlot(el);
          return;
        }

        // Apply mobile throttle limit
        if (isMobile && maxMobile > 0 && mobileRenderedCount >= maxMobile) {
          hideSlot(el);
          return;
        }

        // Mode A: Direct Sponsor or Affiliate Link
        if (net === 'direct_sponsor' || net === 'affiliate') {
          showSlot(el);
          mobileRenderedCount++;
          const container = (el.querySelector('.ad-content-slot') as HTMLElement) || el;
          if (container.getAttribute('data-ad-rendered') === net) return;

          const targetUrl = slotConfig.sponsorTargetUrl || '#';
          const bannerUrl = slotConfig.sponsorBannerUrl || '';
          const altText =
            slotConfig.sponsorAltText ||
            (net === 'affiliate' ? 'Recommended Partner' : 'Sponsored');
          const badge =
            slotConfig.sponsorBadgeText || (net === 'affiliate' ? 'Partner' : 'Sponsored');
          const openInNew = slotConfig.sponsorOpenInNewTab !== false;
          const rel = slotConfig.sponsorRel || 'sponsored nofollow noopener';

          container.innerHTML = `
            <div class="relative w-full rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-center dark:border-slate-800/80 dark:bg-slate-900/60 shadow-xs transition hover:shadow-md group">
              <span class="inline-block mb-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                ${escapeText(badge)}
              </span>
              <a href="${escapeText(targetUrl)}" ${openInNew ? 'target="_blank"' : ''} rel="${escapeText(rel)}" class="block max-w-full overflow-hidden rounded-xl">
                ${bannerUrl ? `<img src="${escapeText(bannerUrl)}" alt="${escapeText(altText)}" class="mx-auto max-h-36 max-w-full rounded-xl object-contain group-hover:scale-[1.01] transition-transform" loading="lazy" />` : `<div class="p-4 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">${escapeText(altText)} →</div>`}
              </a>
            </div>
          `;
          container.setAttribute('data-ad-rendered', net);
          return;
        }

        // Mode B: Google AdX / Custom Script (Manual Code)
        if (net === 'adx' && customCode) {
          showSlot(el);
          mobileRenderedCount++;
          const container = (el.querySelector('.ad-content-slot') as HTMLElement) || el;
          if (container.getAttribute('data-ad-rendered') === 'adx') return;
          container.innerHTML = '';
          injectCustomCode(container, customCode);
          container.setAttribute('data-ad-rendered', 'adx');
          return;
        }

        // Mode C: Google AdSense standard unit
        if (config?.clientId && config.clientId.startsWith('ca-pub-') && slotId) {
          showSlot(el);
          mobileRenderedCount++;
          const container = (el.querySelector('.ad-content-slot') as HTMLElement) || el;
          if (container.querySelector('.adsbygoogle')) return; // Already initialized

          container.innerHTML = '';
          const ins = document.createElement('ins');
          ins.className = 'adsbygoogle';
          ins.style.display = 'block';
          ins.setAttribute('data-ad-client', config.clientId);
          ins.setAttribute('data-ad-slot', slotId);
          ins.setAttribute('data-ad-format', 'auto');
          ins.setAttribute('data-full-width-responsive', 'true');
          container.appendChild(ins);

          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          } catch {}
          return;
        }

        hideSlot(el);
      }

      // Lazy loading via IntersectionObserver if enabled
      if (throttling.enabled && throttling.lazyLoadWithMargin && 'IntersectionObserver' in window) {
        const margin =
          typeof throttling.lazyLoadMarginPx === 'number' ? throttling.lazyLoadMarginPx : 300;
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                renderSlotElement(entry.target as HTMLElement);
                obs.unobserve(entry.target);
              }
            });
          },
          { rootMargin: `${margin}px` }
        );

        slotElements.forEach((el) => observer.observe(el));
      } else {
        slotElements.forEach(renderSlotElement);
      }
    } else {
      slotElements.forEach(hideSlot);
    }
  }

  // Global debug & programmatic hooks
  (window as any).__refreshAdsConfig = function () {
    try {
      localStorage.removeItem('adsense_cfg');
      sessionStorage.removeItem('adsense_cfg');
    } catch {}
    inFlightConfigPromise = null;
    inMemoryConfig = null;
    renderAdSlots(true);
  };

  (window as any).__showAdPreview = function (enable: boolean) {
    try {
      localStorage.removeItem('adsense_cfg');
      sessionStorage.removeItem('adsense_cfg');
    } catch {}
    inFlightConfigPromise = null;
    inMemoryConfig = null;
    getAdsConfig(true).then((cfg) => {
      if (cfg) {
        cfg.testMode = enable !== false;
        renderAdSlots();
      }
    });
  };

  (window as any).__afcGetAdsConfig = getAdsConfig;

  function startEngine() {
    if ((window as any).__afcEngineStarted) return;
    (window as any).__afcEngineStarted = true;

    if (typeof (window as any).__afcDefer === 'function') {
      (window as any).__afcDefer(() => {
        renderAdSlots();
      });
    } else {
      renderAdSlots();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEngine);
  } else {
    startEngine();
  }
})();
