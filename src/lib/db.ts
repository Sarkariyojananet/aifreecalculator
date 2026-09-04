/**
 * Cloudflare D1 Client Wrapper & Local Development Fallback
 * Provides safe database access across Cloudflare Workers / Pages and Node.js environments.
 */

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = Record<string, unknown>>(): Promise<{ results: T[]; success: boolean }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<{ success: boolean; meta: { changes: number; duration: number } }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
  exec(query: string): Promise<unknown>;
}

// In-Memory storage for local development & fallback
const inMemoryStats: Record<string, number> = {
  'bmi-calculator': 1420,
  'emi-calculator': 3890,
  'sip-calculator': 2750,
  'income-tax-calculator': 4920,
  'rcc-slab-steel': 1830,
  'brickwork': 1205,
  'age-calculator': 3100,
  'percentage-calculator': 2640,
  'gpa-calculator': 1560,
  'calorie-calculator': 2140,
};

const inMemorySettings: Record<string, string> = {};

let cloudflareEnv: any = null;

// Dynamically resolve cloudflare:workers if running in Cloudflare runtime
try {
  // @ts-ignore
  const cf = await import('cloudflare:workers');
  if (cf?.env) {
    cloudflareEnv = cf.env;
  }
} catch {
  // In Node / Vite dev environment without workerd
}

// Local filesystem persistence helper for Node/dev environment
let localFileCache: Record<string, string> | null = null;

async function getLocalFileStorage(): Promise<Record<string, string>> {
  if (localFileCache !== null) return localFileCache;
  localFileCache = { ...inMemorySettings };
  try {
    const p = typeof globalThis !== 'undefined' ? (globalThis as any).process : null;
    if (p?.cwd) {
      const fsMod = 'node:fs';
      const pathMod = 'node:path';
      const fs = await import(/* @vite-ignore */ fsMod);
      const path = await import(/* @vite-ignore */ pathMod);
      const filePath = path.join(p.cwd(), '.site-settings.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        localFileCache = { ...localFileCache, ...parsed };
      }
    }
  } catch {}
  return localFileCache;
}

async function writeLocalFileStorage(key: string, value: string): Promise<void> {
  if (localFileCache === null) {
    localFileCache = {};
  }
  localFileCache[key] = value;
  inMemorySettings[key] = value;
  try {
    const p = typeof globalThis !== 'undefined' ? (globalThis as any).process : null;
    if (p?.cwd) {
      const fsMod = 'node:fs';
      const pathMod = 'node:path';
      const fs = await import(/* @vite-ignore */ fsMod);
      const path = await import(/* @vite-ignore */ pathMod);
      const filePath = path.join(p.cwd(), '.site-settings.json');
      fs.writeFileSync(filePath, JSON.stringify(localFileCache, null, 2), 'utf-8');
    }
  } catch {}
}


/**
 * Get Cloudflare D1 Database binding or simulated DB
 */
export function getDb(locals?: any): D1Database {
  // 1. Check cloudflare:workers resolved env
  if (cloudflareEnv?.DB) {
    return cloudflareEnv.DB;
  }

  // 2. Check globalThis env bindings
  const g = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
  if (g?.env?.DB) {
    return g.env.DB;
  }
  if (g?.__env?.DB) {
    return g.__env.DB;
  }

  // 3. Direct DB binding on locals without touching deprecated runtime proxy
  if (locals && typeof locals === 'object' && !Array.isArray(locals)) {
    if (locals.DB) {
      return locals.DB;
    }
  }

  // Fallback simulator for development/Node
  return {
    prepare(query: string) {
      let boundValues: unknown[] = [];
      return {
        bind(...values: unknown[]) {
          boundValues = values;
          return this;
        },
        async all<T = Record<string, unknown>>() {
          if (query.includes('contact_messages')) {
            const store = await getLocalFileStorage();
            const raw = store['_contact_messages_list'] || '[]';
            try {
              return { results: JSON.parse(raw) as T[], success: true };
            } catch {
              return { results: [] as T[], success: true };
            }
          }
          if (query.includes('SELECT * FROM calculator_stats') || query.includes('stats')) {
            const results = Object.entries(inMemoryStats).map(([slug, views]) => ({
              slug,
              views,
              updated_at: new Date().toISOString(),
            })) as unknown as T[];
            return { results, success: true };
          }
          return { results: [], success: true };
        },
        async first<T = Record<string, unknown>>() {
          if (query.includes('site_settings')) {
            const key = (boundValues[0] as string) || '';
            const localStore = await getLocalFileStorage();
            const value = localStore[key] || inMemorySettings[key];
            return value ? ({ key, value } as unknown as T) : null;
          }
          if (query.includes('SELECT')) {
            const slug = (boundValues[0] as string) || '';
            const views = inMemoryStats[slug] || 0;
            return { slug, views, updated_at: new Date().toISOString() } as unknown as T;
          }
          return null;
        },
        async run() {
          if (query.includes('contact_messages')) {
            if (query.includes('INSERT')) {
              const msg: ContactMessage = {
                id: String(boundValues[0] || ''),
                name: String(boundValues[1] || ''),
                email: String(boundValues[2] || ''),
                category: String(boundValues[3] || 'General'),
                subject: String(boundValues[4] || ''),
                message: String(boundValues[5] || ''),
                status: (boundValues[6] as any) || 'new',
                created_at: String(boundValues[7] || new Date().toISOString()),
              };
              const store = await getLocalFileStorage();
              const raw = store['_contact_messages_list'] || '[]';
              let list: ContactMessage[] = [];
              try {
                list = JSON.parse(raw);
              } catch {}
              list.unshift(msg);
              await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
              return { success: true, meta: { changes: 1, duration: 2 } };
            }
            if (query.includes('UPDATE')) {
              const status = String(boundValues[0] || '');
              const id = String(boundValues[1] || '');
              const store = await getLocalFileStorage();
              const raw = store['_contact_messages_list'] || '[]';
              try {
                const list: ContactMessage[] = JSON.parse(raw);
                const item = list.find((m) => m.id === id);
                if (item) {
                  item.status = status as any;
                  await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
                }
              } catch {}
              return { success: true, meta: { changes: 1, duration: 2 } };
            }
            if (query.includes('DELETE')) {
              const id = String(boundValues[0] || '');
              const store = await getLocalFileStorage();
              const raw = store['_contact_messages_list'] || '[]';
              try {
                let list: ContactMessage[] = JSON.parse(raw);
                list = list.filter((m) => m.id !== id);
                await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
              } catch {}
              return { success: true, meta: { changes: 1, duration: 2 } };
            }
          }
          if (query.includes('site_settings')) {
            const key = boundValues[0] as string;
            const value = boundValues[1] as string;
            if (key && value) {
              await writeLocalFileStorage(key, value);
            }
            return { success: true, meta: { changes: 1, duration: 2 } };
          }
          if (query.includes('INSERT') || query.includes('UPDATE')) {
            const slug = boundValues[0] as string;
            if (slug) {
              inMemoryStats[slug] = (inMemoryStats[slug] || 0) + 1;
            }
          }
          return { success: true, meta: { changes: 1, duration: 2 } };
        },
      };
    },
    async batch(statements: D1PreparedStatement[]) {
      return Promise.all(statements.map((s) => s.run()));
    },
    async exec(query: string) {
      return { success: true, query };
    },
  };
}


export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

/**
 * Record a page visit or calculator calculation
 */
export async function trackCalculatorView(slug: string, db?: D1Database): Promise<void> {
  try {
    inMemoryStats[slug] = (inMemoryStats[slug] || 0) + 1;
    if (db) {
      await db
        .prepare('INSERT INTO calculator_stats (slug, views) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET views = views + 1')
        .bind(slug)
        .run();
    }
  } catch {
    // Fail silently so user calculator never breaks
  }
}

/**
 * Get all usage stats for admin dashboard
 */
export async function getCalculatorStats(): Promise<Record<string, number>> {
  return { ...inMemoryStats };
}

/**
 * Save incoming contact message
 */
export async function saveContactMessage(db: D1Database, msg: ContactMessage): Promise<void> {
  try {
    await db.exec(
      'CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, category TEXT, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT DEFAULT "new", created_at TEXT NOT NULL)'
    );
    await db
      .prepare(
        'INSERT INTO contact_messages (id, name, email, category, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(msg.id, msg.name, msg.email, msg.category, msg.subject, msg.message, msg.status || 'new', msg.created_at)
      .run();
  } catch (err) {
    // Fallback to local storage
    const store = await getLocalFileStorage();
    const raw = store['_contact_messages_list'] || '[]';
    let list: ContactMessage[] = [];
    try {
      list = JSON.parse(raw);
    } catch {}
    list.unshift(msg);
    await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
  }
}

/**
 * Get all contact messages for admin
 */
export async function getContactMessages(db?: D1Database): Promise<ContactMessage[]> {
  try {
    if (db) {
      await db.exec(
        'CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, category TEXT, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT DEFAULT "new", created_at TEXT NOT NULL)'
      );
      const res = await db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all<ContactMessage>();
      if (res?.results && res.results.length > 0) {
        return res.results;
      }
    }
  } catch (err) {
    // continue to local fallback
  }

  const store = await getLocalFileStorage();
  const raw = store['_contact_messages_list'] || '[]';
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Update status of contact message
 */
export async function updateContactMessageStatus(
  db: D1Database,
  id: string,
  status: 'new' | 'read' | 'replied' | 'archived'
): Promise<boolean> {
  try {
    if (db) {
      await db
        .prepare('UPDATE contact_messages SET status = ? WHERE id = ?')
        .bind(status, id)
        .run();
    }
  } catch {}

  const store = await getLocalFileStorage();
  const raw = store['_contact_messages_list'] || '[]';
  try {
    const list: ContactMessage[] = JSON.parse(raw);
    const item = list.find((m) => m.id === id);
    if (item) {
      item.status = status;
      await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
      return true;
    }
  } catch {}
  return true;
}

/**
 * Delete a contact message
 */
export async function deleteContactMessage(db: D1Database, id: string): Promise<boolean> {
  try {
    if (db) {
      await db.prepare('DELETE FROM contact_messages WHERE id = ?').bind(id).run();
    }
  } catch {}

  const store = await getLocalFileStorage();
  const raw = store['_contact_messages_list'] || '[]';
  try {
    let list: ContactMessage[] = JSON.parse(raw);
    list = list.filter((m) => m.id !== id);
    await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
    return true;
  } catch {}
  return true;
}
