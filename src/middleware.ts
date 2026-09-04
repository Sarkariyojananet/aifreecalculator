import { defineMiddleware } from 'astro:middleware';
import { getRedirectRules } from './lib/admin/content-store';

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // 1. Check dynamic 301/302 redirects managed in Admin CMS (Exclude admin, api, astro internal, static assets)
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/') && !pathname.startsWith('/_astro/') && !pathname.includes('.')) {
    try {
      const redirects = await getRedirectRules(context.locals);
      const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
      const rule = redirects.find(
        (r) => r.active !== false && (r.source === pathname || r.source === normalizedPath || `${r.source}/` === normalizedPath)
      );

      if (rule && rule.destination) {
        return context.redirect(rule.destination, rule.statusCode || 301);
      }
    } catch {
      // Fail safely to avoid blocking request
    }
  }

  const response = await next();

  // 2. Attach industry-standard HTTP security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // 3. Prevent public/CDN caching of admin pages & API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
  }

  return response;
});
