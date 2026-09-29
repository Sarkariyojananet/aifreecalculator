/**
 * Safe Cloudflare Workers Runtime Environment Resolver
 *
 * Provides safe asynchronous and synchronous access to Cloudflare Workers
 * environment variables and bindings across Cloudflare Workers and Node.js environments.
 *
 * Guaranteed to NEVER execute I/O or evaluate AsyncLocalStorage-backed `env`
 * in the module-level global scope.
 */

/**
 * Safely schedules an asynchronous task on Cloudflare ExecutionContext across
 * middleware, API routes, or background runners without throwing.
 */
export function safeWaitUntil(target: any, promise: Promise<unknown>): void {
  try {
    if (!target) {
      promise.catch(() => {});
      return;
    }
    if (typeof target.waitUntil === 'function') {
      target.waitUntil(promise);
      return;
    }
    if (typeof target.locals?.waitUntil === 'function') {
      target.locals.waitUntil(promise);
      return;
    }
    if (typeof target.locals?.cfContext?.waitUntil === 'function') {
      target.locals.cfContext.waitUntil(promise);
      return;
    }
    if (typeof target.cfContext?.waitUntil === 'function') {
      target.cfContext.waitUntil(promise);
      return;
    }
    try {
      if (typeof target.locals?.runtime?.ctx?.waitUntil === 'function') {
        target.locals.runtime.ctx.waitUntil(promise);
        return;
      }
    } catch {}
    try {
      if (typeof target.runtime?.ctx?.waitUntil === 'function') {
        target.runtime.ctx.waitUntil(promise);
        return;
      }
    } catch {}
    promise.catch(() => {});
  } catch {
    promise.catch(() => {});
  }
}

/**
 * Resolves Cloudflare Workers runtime environment and bindings asynchronously.
 * Strictly called within an active request context.
 */
export async function getRuntimeEnv(locals?: any): Promise<Record<string, any>> {
  let cfEnv: any = null;
  try {
    // @ts-ignore
    const cf = await import('cloudflare:workers');
    if (cf?.env) {
      cfEnv = cf.env;
    }
  } catch {
    // Graceful fallback for non-workerd runtimes (Node.js / dev server / test runners)
  }

  return getRuntimeEnvSync(locals, cfEnv);
}

/**
 * Synchronous resolver for contexts where an async function cannot be awaited.
 * Extracts environment from request locals, runtime context, or Node process without
 * caching mutable request-scoped proxies in global isolate scope.
 */
export function getRuntimeEnvSync(locals?: any, explicitCfEnv?: any): Record<string, any> {
  const sources: Record<string, any>[] = [];

  // 1. Process environment (Node.js / build time)
  if (typeof process !== 'undefined' && process?.env) {
    sources.push(process.env);
  }

  // 2. Global environment fallbacks
  if (typeof globalThis !== 'undefined') {
    const g = globalThis as any;
    if (g?.__env && typeof g.__env === 'object') {
      sources.push(g.__env);
    }
    if (g?.env && typeof g.env === 'object') {
      sources.push(g.env);
    }
  }

  // 3. Locals environment bindings (Astro Cloudflare adapter locals)
  if (locals && typeof locals === 'object' && !Array.isArray(locals)) {
    try {
      if (locals.env && typeof locals.env === 'object') {
        sources.push(locals.env);
      }
    } catch {}
    try {
      if (locals.runtime?.env && typeof locals.runtime.env === 'object') {
        sources.push(locals.runtime.env);
      }
    } catch {}
    // Direct binding fallbacks attached to locals
    const directBindings: Record<string, any> = {};
    if (locals.DB) directBindings.DB = locals.DB;
    if (locals.SESSION) directBindings.SESSION = locals.SESSION;
    if (locals.CONTACT_EMAIL) directBindings.CONTACT_EMAIL = locals.CONTACT_EMAIL;
    if (Object.keys(directBindings).length > 0) {
      sources.push(directBindings);
    }
  }

  // 4. Explicit Cloudflare workers env object passed into resolver
  if (explicitCfEnv && typeof explicitCfEnv === 'object') {
    sources.push(explicitCfEnv);
  }

  // Return a safe composite Proxy that checks sources in priority order (latest source has precedence)
  return new Proxy({} as Record<string, any>, {
    get(_t, prop, receiver) {
      if (typeof prop !== 'string') {
        return Reflect.get(_t, prop, receiver);
      }
      for (let i = sources.length - 1; i >= 0; i--) {
        const source = sources[i];
        try {
          if (source && prop in source && source[prop] !== undefined) {
            return source[prop];
          }
        } catch {}
      }
      return undefined;
    },
    has(_t, prop) {
      if (typeof prop !== 'string') return false;
      for (let i = sources.length - 1; i >= 0; i--) {
        const source = sources[i];
        try {
          if (source && prop in source) return true;
        } catch {}
      }
      return false;
    },
    ownKeys() {
      const keys = new Set<string>();
      for (let i = sources.length - 1; i >= 0; i--) {
        const source = sources[i];
        try {
          if (source && typeof source === 'object') {
            Object.keys(source).forEach((k) => keys.add(k));
          }
        } catch {}
      }
      return Array.from(keys);
    },
    getOwnPropertyDescriptor(_t, prop) {
      if (typeof prop === 'string') {
        for (let i = sources.length - 1; i >= 0; i--) {
          const source = sources[i];
          try {
            if (source && prop in source) {
              return {
                enumerable: true,
                configurable: true,
                value: source[prop],
              };
            }
          } catch {}
        }
      }
      return undefined;
    },
  });
}
