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

// Dynamic import of cloudflare:workers to prevent build-time failures in Node.js
if (typeof globalThis !== 'undefined') {
  try {
    // @ts-ignore
    import('cloudflare:workers')
      .then((cf) => {
        if (cf?.env) cachedCfEnv = cf.env;
      })
      .catch(() => {});
  } catch {}
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
      }
    } catch {
      // Graceful fallback for non-workerd runtimes (e.g. Node.js local dev or build)
    }
  }

  const fallbackEnv: Record<string, any> = {};

  // 1. Process environment (Node.js dev / build fallback)
  if (typeof process !== 'undefined' && process?.env) {
    Object.assign(fallbackEnv, process.env);
  }

  // 2. Safe check on locals without accessing throwing getters (never touch locals.runtime.env)
  if (locals && typeof locals === 'object' && !Array.isArray(locals)) {
    try {
      if (locals.env && typeof locals.env === 'object') {
        Object.assign(fallbackEnv, locals.env);
      }
    } catch {}
    if (locals.DB && !fallbackEnv.DB) {
      fallbackEnv.DB = locals.DB;
    }
  }

  // 3. Check globalThis
  if (typeof globalThis !== 'undefined') {
    const g = globalThis as any;
    if (g?.__env) Object.assign(fallbackEnv, g.__env);
  }

  const target = cachedCfEnv || {};

  return new Proxy(target, {
    get(t, prop, receiver) {
      if (typeof prop === 'string') {
        // Cloudflare Worker runtime bindings take precedence
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
}

/**
 * Synchronous resolver for contexts where an async function cannot be awaited.
 */
export function getRuntimeEnvSync(locals?: any): Record<string, any> {
  const fallbackEnv: Record<string, any> = {};

  if (typeof process !== 'undefined' && process?.env) {
    Object.assign(fallbackEnv, process.env);
  }

  if (locals && typeof locals === 'object' && !Array.isArray(locals)) {
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

  return new Proxy(target, {
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
}
