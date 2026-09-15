/**
 * Safe Cloudflare Workers Runtime Environment Resolver
 *
 * In Astro v5/v6 with @astrojs/cloudflare, `Astro.locals.runtime.env` was removed
 * in favor of `import { env } from 'cloudflare:workers'`.
 *
 * This utility provides safe asynchronous and synchronous access to Cloudflare Workers
 * environment variables and bindings without triggering deprecated throwing getters on `locals.runtime`.
 */

let cachedCfEnv: any = null;
let cachedRuntimeProxy: Record<string, any> | null = null;

// Dynamic import of cloudflare:workers to prevent build-time failures in Node.js
if (typeof globalThis !== 'undefined') {
  try {
    // @ts-ignore
    import('cloudflare:workers')
      .then((cf) => {
        if (cf?.env) {
          cachedCfEnv = cf.env;
          cachedRuntimeProxy = null; // Re-invalidate cached proxy
        }
      })
      .catch(() => {});
  } catch {}
}

/**
 * Safely schedules an asynchronous task on Cloudflare ExecutionContext across
 * middleware, API routes, or background runners without throwing.
 */
export function safeWaitUntil(target: any, promise: Promise<unknown>): void {
  if (!target) {
    promise.catch(() => {});
    return;
  }
  if (typeof target.waitUntil === 'function') {
    target.waitUntil(promise);
  } else if (typeof target.locals?.waitUntil === 'function') {
    target.locals.waitUntil(promise);
  } else if (typeof target.locals?.cfContext?.waitUntil === 'function') {
    target.locals.cfContext.waitUntil(promise);
  } else if (typeof target.locals?.runtime?.ctx?.waitUntil === 'function') {
    target.locals.runtime.ctx.waitUntil(promise);
  } else if (typeof target.cfContext?.waitUntil === 'function') {
    target.cfContext.waitUntil(promise);
  } else if (typeof target.runtime?.ctx?.waitUntil === 'function') {
    target.runtime.ctx.waitUntil(promise);
  } else {
    promise.catch(() => {});
  }
}

/**
 * Resolves Cloudflare Workers runtime environment and bindings asynchronously.
 */
export async function getRuntimeEnv(locals?: any): Promise<Record<string, any>> {
  if (!cachedCfEnv) {
    try {
      // @ts-ignore
      const cf = await import('cloudflare:workers');
      if (cf?.env) {
        cachedCfEnv = cf.env;
        cachedRuntimeProxy = null;
      }
    } catch {
      // Graceful fallback for non-workerd runtimes
    }
  }

  return getRuntimeEnvSync(locals);
}

/**
 * Synchronous resolver for contexts where an async function cannot be awaited.
 * Uses a stable module-level cache when locals has no custom overrides,
 * eliminating repeated Proxy and object allocations on every call.
 */
export function getRuntimeEnvSync(locals?: any): Record<string, any> {
  const hasLocalsOverride = Boolean(
    locals && typeof locals === 'object' && !Array.isArray(locals) && (locals.env || locals.DB)
  );

  if (!hasLocalsOverride && cachedRuntimeProxy) {
    return cachedRuntimeProxy;
  }

  const fallbackEnv: Record<string, any> = {};

  if (typeof process !== 'undefined' && process?.env) {
    Object.assign(fallbackEnv, process.env);
  }

  if (hasLocalsOverride) {
    try {
      if (locals.env && typeof locals.env === 'object') {
        Object.assign(fallbackEnv, locals.env);
      }
    } catch {}
    if (locals.DB && !fallbackEnv.DB) {
      fallbackEnv.DB = locals.DB;
    }
  }

  if (typeof globalThis !== 'undefined') {
    const g = globalThis as any;
    if (g?.__env) Object.assign(fallbackEnv, g.__env);
  }

  const target = cachedCfEnv || {};

  const proxy = new Proxy(target, {
    get(t, prop, receiver) {
      if (typeof prop === 'string') {
        if (prop in t && t[prop] !== undefined) {
          return Reflect.get(t, prop, receiver);
        }
        if (prop in fallbackEnv) {
          return fallbackEnv[prop];
        }
      }
      return Reflect.get(t, prop, receiver);
    },
    has(t, prop) {
      return Reflect.has(t, prop) || (typeof prop === 'string' && prop in fallbackEnv);
    },
  });

  if (!hasLocalsOverride) {
    cachedRuntimeProxy = proxy;
  }

  return proxy;
}
