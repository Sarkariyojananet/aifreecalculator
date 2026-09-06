/**
 * Cache Rules & Route Performance Model (Phase 6)
 * Reflects authentic caching architecture currently configured across the platform.
 */

import { calculators, categories } from '../../data/calculators';
import type { CacheRuleDefinition, RoutePerformanceRow } from './types';

/**
 * The 6 definitive caching strategies configured by the application and Cloudflare headers.
 */
export const PLATFORM_CACHE_RULES: CacheRuleDefinition[] = [
  {
    id: 'rule_static_assets',
    name: 'Versioned Static Build Assets',
    category: 'static_assets',
    routePattern: '/_astro/*',
    strategy: 'immutable',
    browserTTL: '1 Year (31,536,000s)',
    edgeTTL: '1 Year (31,536,000s)',
    cacheControlHeader: 'public, max-age=31536000, immutable',
    cdnHeader: 'Cloudflare Edge Immutable',
    status: 'active',
    description: 'Vite fingerprinted JavaScript, CSS, and font chunks with content hashes. Safe for permanent caching because filenames change when content updates.',
  },
  {
    id: 'rule_public_calculators',
    name: 'Public Calculator Pages (HTML Shell)',
    category: 'calculators',
    routePattern: '/[category]/[calculator-slug]/',
    strategy: 'cdn_edge_swr',
    browserTTL: '0s (Immediate Edge Revalidation)',
    edgeTTL: '7 Days + Stale-While-Revalidate',
    cacheControlHeader: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    cdnHeader: 'Cloudflare-CDN-Cache-Control: max-age=604800, stale-while-revalidate=86400',
    status: 'active',
    description: 'Pre-rendered calculator HTML. Computation happens purely in client browser. Edge serves cached HTML instantly while background revalidation keeps content fresh.',
  },
  {
    id: 'rule_homepage_categories',
    name: 'Homepage & Category Hub Pages',
    category: 'homepage_categories',
    routePattern: '/ and /[category]/',
    strategy: 'cdn_edge_swr',
    browserTTL: '0s (Immediate Edge Revalidation)',
    edgeTTL: '7 Days + Stale-While-Revalidate',
    cacheControlHeader: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    cdnHeader: 'Cloudflare-CDN-Cache-Control: max-age=604800, stale-while-revalidate=86400',
    status: 'active',
    description: 'Catalog navigation index pages. Strips UTM & social tracking parameters to prevent cache fragmentation across marketing campaigns.',
  },
  {
    id: 'rule_admin_panel',
    name: 'Admin Panel & Authenticated Views',
    category: 'admin_panel',
    routePattern: '/admin/*',
    strategy: 'no_store',
    browserTTL: '0s (Never Cached)',
    edgeTTL: '0s (Never Cached on CDN)',
    cacheControlHeader: 'private, no-cache, no-store, must-revalidate, max-age=0',
    cdnHeader: 'Cloudflare-CDN-Cache-Control: no-store',
    status: 'active',
    description: 'Strictly zero caching for admin dashboards, settings, and authenticated pages. Protects admin credentials and live CMS state.',
  },
  {
    id: 'rule_api_endpoints',
    name: 'API Routes & Ingestion Handlers',
    category: 'api_routes',
    routePattern: '/api/*',
    strategy: 'api_dynamic',
    browserTTL: '0s (No Cache)',
    edgeTTL: '0s (No CDN Cache)',
    cacheControlHeader: 'no-store, no-cache, must-revalidate, max-age=0',
    cdnHeader: 'Cloudflare-CDN-Cache-Control: no-store',
    status: 'active',
    description: 'Dynamic telemetry, contact form handlers, and admin APIs. Mutations and metrics are never cached to ensure live state.',
  },
  {
    id: 'rule_media_metadata',
    name: 'Social OG Banners, Favicons & Sitemaps',
    category: 'media_metadata',
    routePattern: '/og/*, /favicon.*, /sitemap*.xml',
    strategy: 'short_edge',
    browserTTL: '1h - 7 Days',
    edgeTTL: '1 Day - 30 Days',
    cacheControlHeader: 'public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400',
    cdnHeader: 'Varies by asset type (public/_headers)',
    status: 'active',
    description: 'Shared visual assets and XML crawl sitemaps. Cached aggressively at edge with fast background stale revalidation.',
  },
];

/**
 * Builds the complete Route Performance & Cache Explorer catalog.
 */
export function getRoutePerformanceCatalog(statsMap?: Record<string, number>): RoutePerformanceRow[] {
  const rows: RoutePerformanceRow[] = [];

  // 1. Homepage
  rows.push({
    path: '/',
    name: 'Homepage (All Calculators Hub)',
    category: 'General',
    type: 'core_page',
    strategy: 'cdn_edge_swr',
    cacheControl: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    estimatedRequests: statsMap?.['homepage'] ?? null,
    statusBadge: 'cached_edge',
    canPurge: true,
    canWarm: true,
  });

  // 2. Category Hub Pages (5)
  for (const cat of categories) {
    const catSlug = cat.name.toLowerCase();
    rows.push({
      path: `/${catSlug}/`,
      name: `${cat.name} Calculators Hub`,
      category: cat.name,
      type: 'category',
      strategy: 'cdn_edge_swr',
      cacheControl: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      estimatedRequests: statsMap?.[`cat_${catSlug}`] ?? null,
      statusBadge: 'cached_edge',
      canPurge: true,
      canWarm: true,
    });
  }

  // 3. All 39 Calculators
  for (const calc of calculators) {
    const est = statsMap?.[calc.slug] || statsMap?.[`${calc.slug}-calculator`] || null;
    rows.push({
      path: calc.path,
      name: calc.name,
      category: calc.category,
      type: 'calculator',
      strategy: 'cdn_edge_swr',
      cacheControl: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      estimatedRequests: est,
      statusBadge: 'cached_edge',
      canPurge: true,
      canWarm: true,
    });
  }

  // 4. Core Informational Pages
  const corePages = [
    { path: '/all-calculators/', name: 'All Calculators Catalog' },
    { path: '/about/', name: 'About Us' },
    { path: '/contact/', name: 'Contact Us' },
    { path: '/privacy-policy/', name: 'Privacy Policy' },
    { path: '/terms/', name: 'Terms & Conditions' },
    { path: '/disclaimer/', name: 'Disclaimer' },
  ];

  for (const p of corePages) {
    rows.push({
      path: p.path,
      name: p.name,
      category: 'General',
      type: 'core_page',
      strategy: 'cdn_edge_swr',
      cacheControl: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      estimatedRequests: null,
      statusBadge: 'cached_edge',
      canPurge: true,
      canWarm: true,
    });
  }

  // 5. Public API Ingestion Endpoints
  const apiEndpoints = [
    { path: '/api/analytics/event', name: 'Funnel Analytics Ingestion' },
    { path: '/api/calculator-error-log', name: 'Calculator Error Telemetry' },
    { path: '/api/search-log', name: 'Search Query Capture' },
    { path: '/api/contact', name: 'Contact Form Dispatch' },
  ];

  for (const api of apiEndpoints) {
    rows.push({
      path: api.path,
      name: api.name,
      category: 'API',
      type: 'api',
      strategy: 'api_dynamic',
      cacheControl: 'no-store, no-cache, must-revalidate',
      estimatedRequests: null,
      statusBadge: 'dynamic_api',
      canPurge: false,
      canWarm: false,
      recommendation: 'Dynamic ingestion endpoint. Correctly configured to never cache on CDN or browser.',
    });
  }

  // 6. Admin Panel Entry
  rows.push({
    path: '/admin/*',
    name: 'Admin Panel & CMS Management',
    category: 'Admin',
    type: 'admin',
    strategy: 'no_store',
    cacheControl: 'private, no-cache, no-store, must-revalidate, max-age=0',
    estimatedRequests: null,
    statusBadge: 'protected_no_store',
    canPurge: false,
    canWarm: false,
    recommendation: 'Protected admin zone. Strictly bypasses CDN cache to ensure real-time management.',
  });

  return rows;
}
