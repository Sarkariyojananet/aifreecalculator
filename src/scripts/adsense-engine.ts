/**
 * Client-Side Google AdSense Slot Hydration Engine
 * Bundled and cached asset. Eliminates runtime Worker requests to /api/adsense-config on normal pages.
 */

import {
  DEFAULT_ADS_CONFIG,
  DEFAULT_SMART_THROTTLING,
  type AdsConfig,
  type SmartThrottlingConfig,
} from '../lib/ads-config';

(function initAdSenseEngine() {
  if (typeof window === 'undefined') return;

  async function fetchAdConfig(): Promise<AdsConfig | null> {
    try {
      const CACHE_KEY = 'adsense_cfg';
      const CACHE_TTL = 86_400_000; // 24 hours client cache

      // Allow URL override for instant testing/previewing: ?preview_ads=1, ?test_ads=1, ?preview=ads
      const urlParams = new URLSearchParams(window.location.search);
      const forcePreview =
        urlParams.has('preview_ads') ||
        urlParams.has('test_ads') ||
        urlParams.get('preview') === 'ads' ||
        urlParams.get('ad_mode') === 'test';

      // 1. If NOT in forced preview mode: use static/build-time configuration directly
      if (!forcePreview) {
        if ((window as any).__AFC_ADS_CONFIG__) {
          return (window as any).__AFC_ADS_CONFIG__ as AdsConfig;
        }

        let cached: string | null = null;
        try {
          cached = localStorage.getItem(CACHE_KEY) || sessionStorage.getItem(CACHE_KEY);
        } catch {}

        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.expiry > Date.now() && parsed.data) {
              return parsed.data as AdsConfig;
            }
          } catch {}
        }

        // Return default build-time config without making any network request!
        return DEFAULT_ADS_CONFIG;
      }

      // 2. Only if forcePreview is explicitly active (admin testing), fetch live from API
      const fetchUrl = '/api/adsense-config?t=' + Date.now();
      const res = await fetch(fetchUrl);
      if (!res.ok) return DEFAULT_ADS_CONFIG;
      const data = (await res.json()) as AdsConfig;

      if (data) {
        data.testMode = true;
      }

      try {
        const payload = JSON.stringify({ data, expiry: Date.now() + CACHE_TTL });
        localStorage.setItem(CACHE_KEY, payload);
      } catch {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, expiry: Date.now() + CACHE_TTL }));
        } catch {}
      }
      return data;
    } catch {
      return (window as any).__AFC_ADS_CONFIG__ || DEFAULT_ADS_CONFIG;
    }
  }

  function loadGoogleScript(clientId: string) {
    if (!clientId || !clientId.startsWith('ca-pub-')) return;

    // The head loader defers adsbygoogle.js off the critical path.
    // When an ad unit is actually about to render, force it in now.
    if (typeof (window as any).__afcLoadAdSense === 'function') {
      (window as any).__afcLoadAdSense();
      return;
    }

    if (document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
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
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);
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

  async function renderAdSlots() {
    const config = await fetchAdConfig();
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
    renderAdSlots();
  };

  (window as any).__showAdPreview = function (enable: boolean) {
    try {
      localStorage.removeItem('adsense_cfg');
      sessionStorage.removeItem('adsense_cfg');
    } catch {}
    fetchAdConfig().then((cfg) => {
      if (cfg) {
        cfg.testMode = enable !== false;
        renderAdSlots();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAdSlots);
  } else {
    renderAdSlots();
  }
})();
