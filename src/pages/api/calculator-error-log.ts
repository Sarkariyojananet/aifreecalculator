/**
 * POST /api/calculator-error-log
 * Public endpoint for runtime error reporting from calculator pages.
 * Rate-limited by aggregation: identical errors are aggregated, not duplicated.
 *
 * SECURITY NOTES:
 * - Validates calculator slug against known slugs
 * - Validates error_type against allowlist
 * - Rejects oversized payloads
 * - Never stores user input, IP addresses, or auth tokens
 * - Fails silently — never breaks calculator functionality
 *
 * LIMITATION:
 * - No distributed rate limiting beyond D1 aggregation
 * - Malicious flooding is mitigated by aggregation (one DB row per slug+type)
 */
import type { APIRoute } from 'astro';
import { recordRuntimeError } from '../../lib/calculator-tests/health-store';
import { calculators } from '../../data/calculators';

import { safeWaitUntil } from '../../lib/cloudflare-env';

export const prerender = false;

const ALLOWED_ERROR_TYPES = new Set(['nan', 'infinity', 'exception', 'invalid_result']);
const KNOWN_SLUGS = new Set(calculators.map((c) => c.slug));
const MAX_MESSAGE_LENGTH = 200;

const SILENT_OK_RESPONSE = new Response(JSON.stringify({ received: true }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' },
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Reject overly large bodies
    const contentLength = parseInt(request.headers.get('content-length') ?? '0', 10);
    if (contentLength > 2048) return SILENT_OK_RESPONSE;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return SILENT_OK_RESPONSE;
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) return SILENT_OK_RESPONSE;
    const payload = body as Record<string, unknown>;

    const slug = typeof payload.calculatorSlug === 'string' ? payload.calculatorSlug.trim() : '';
    const errorType = typeof payload.errorType === 'string' ? payload.errorType.trim() : '';
    const rawMessage = typeof payload.errorMessage === 'string' ? payload.errorMessage : '';

    // Validate slug is alphanumeric + hyphens
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) return SILENT_OK_RESPONSE;

    // Validate slug against known calculators (O(1) Set lookup)
    if (!KNOWN_SLUGS.has(slug)) return SILENT_OK_RESPONSE;

    // Validate error type against allowlist
    if (!ALLOWED_ERROR_TYPES.has(errorType)) return SILENT_OK_RESPONSE;

    // Sanitize message: truncate, remove any PII-looking content
    const errorMessage = rawMessage
      .slice(0, MAX_MESSAGE_LENGTH)
      .replace(/\d{10,}/g, '[REDACTED]') // remove long numeric sequences (phone/ID)
      .trim() || null;

    const recordPromise = recordRuntimeError(slug, errorType, errorMessage, locals).catch(() => {});
    safeWaitUntil(locals, recordPromise);

    return SILENT_OK_RESPONSE;
  } catch {
    // Any error in error logging must not surface
    return SILENT_OK_RESPONSE;
  }
};
