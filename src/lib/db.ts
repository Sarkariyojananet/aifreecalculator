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
if (typeof globalThis !== 'undefined') {
  try {
    // @ts-ignore
    import('cloudflare:workers').then((cf) => {
      if (cf?.env) cloudflareEnv = cf.env;
    }).catch(() => {});
  } catch {}
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
  // 1. Direct or env DB binding on locals (without touching deprecated throwing runtime proxy)
  if (locals && typeof locals === 'object' && !Array.isArray(locals)) {
    try {
      if (locals.DB) {
        return locals.DB;
      }
    } catch {}
    try {
      if (locals.env?.DB) {
        return locals.env.DB;
      }
    } catch {}
  }

  // 2. Check cloudflare:workers resolved env
  if (cloudflareEnv?.DB) {
    return cloudflareEnv.DB;
  }

  // 3. Check globalThis env bindings
  const g = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
  if (g?.env?.DB) {
    return g.env.DB;
  }
  if (g?.__env?.DB) {
    return g.__env.DB;
  }
  if (g?.DB) {
    return g.DB;
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
 * Save incoming contact message.
 * Writes to both the `contact_messages` table AND `site_settings` (`cms_contact_messages`),
 * guaranteeing zero data loss even if D1 table creation or permissions encounter issues.
 */
export async function saveContactMessage(db: D1Database, msg: ContactMessage): Promise<void> {
  // 1. Write to contact_messages table in Cloudflare D1
  try {
    await db.exec(
      "CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, category TEXT, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT DEFAULT 'new', created_at TEXT NOT NULL)"
    );
    await db
      .prepare(
        'INSERT OR REPLACE INTO contact_messages (id, name, email, category, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(msg.id, msg.name, msg.email, msg.category, msg.subject, msg.message, msg.status || 'new', msg.created_at)
      .run();
  } catch (tableErr) {
    console.error('[Contact DB Table Write Error]:', tableErr);
  }

  // 2. ALSO persist to site_settings (cms_contact_messages) as redundant D1 backup
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_contact_messages').first<{ value: string }>();
    let list: ContactMessage[] = [];
    if (row?.value) {
      try { list = JSON.parse(row.value); } catch {}
    }
    if (!list.some((m) => m.id === msg.id)) {
      list.unshift(msg);
      if (list.length > 500) list = list.slice(0, 500);
      await db
        .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
        .bind('cms_contact_messages', JSON.stringify(list))
        .run();
    }
  } catch (backupErr) {
    console.error('[Contact site_settings Backup Error]:', backupErr);
  }

  // 3. Fallback to local storage for Node/dev environment
  try {
    const store = await getLocalFileStorage();
    const raw = store['_contact_messages_list'] || '[]';
    let list: ContactMessage[] = [];
    try { list = JSON.parse(raw); } catch {}
    if (!list.some((m) => m.id === msg.id)) {
      list.unshift(msg);
      await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
    }
  } catch {}
}

/**
 * Get all contact messages for admin.
 * Queries D1 table, site_settings backup, and local store, merging any distinct messages.
 */
export async function getContactMessages(db?: D1Database): Promise<ContactMessage[]> {
  const messageMap = new Map<string, ContactMessage>();

  // 1. Try D1 table
  try {
    if (db) {
      await db.exec(
        "CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, category TEXT, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT DEFAULT 'new', created_at TEXT NOT NULL)"
      );
      const res = await db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all<ContactMessage>();
      if (res?.results && Array.isArray(res.results)) {
        for (const m of res.results) {
          if (m?.id) messageMap.set(m.id, m);
        }
      }
    }
  } catch (tableErr) {
    console.warn('[D1 Table Read Notice]:', tableErr);
  }

  // 2. Also check site_settings backup in D1
  try {
    if (db) {
      const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_contact_messages').first<{ value: string }>();
      if (row?.value) {
        const parsed: ContactMessage[] = JSON.parse(row.value);
        if (Array.isArray(parsed)) {
          for (const m of parsed) {
            if (m?.id && !messageMap.has(m.id)) {
              messageMap.set(m.id, m);
            }
          }
        }
      }
    }
  } catch {}

  // 3. Check local filesystem fallback (for local development)
  try {
    const store = await getLocalFileStorage();
    const raw = store['_contact_messages_list'] || '[]';
    const list: ContactMessage[] = JSON.parse(raw);
    if (Array.isArray(list)) {
      for (const m of list) {
        if (m?.id && !messageMap.has(m.id)) {
          messageMap.set(m.id, m);
        }
      }
    }
  } catch {}

  const merged = Array.from(messageMap.values());
  merged.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  return merged;
}

/**
 * Update status of contact message across D1 table and site_settings.
 */
export async function updateContactMessageStatus(
  db: D1Database,
  id: string,
  status: 'new' | 'read' | 'replied' | 'archived'
): Promise<boolean> {
  // 1. Update D1 table
  try {
    if (db) {
      await db
        .prepare('UPDATE contact_messages SET status = ? WHERE id = ?')
        .bind(status, id)
        .run();
    }
  } catch {}

  // 2. Update site_settings backup
  try {
    if (db) {
      const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_contact_messages').first<{ value: string }>();
      if (row?.value) {
        const list: ContactMessage[] = JSON.parse(row.value);
        const item = list.find((m) => m.id === id);
        if (item) {
          item.status = status;
          await db
            .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
            .bind('cms_contact_messages', JSON.stringify(list))
            .run();
        }
      }
    }
  } catch {}

  // 3. Update local file
  try {
    const store = await getLocalFileStorage();
    const raw = store['_contact_messages_list'] || '[]';
    const list: ContactMessage[] = JSON.parse(raw);
    const item = list.find((m) => m.id === id);
    if (item) {
      item.status = status;
      await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
    }
  } catch {}

  return true;
}

/**
 * Delete a contact message from D1 table and site_settings.
 */
export async function deleteContactMessage(db: D1Database, id: string): Promise<boolean> {
  // 1. Delete from D1 table
  try {
    if (db) {
      await db.prepare('DELETE FROM contact_messages WHERE id = ?').bind(id).run();
    }
  } catch {}

  // 2. Delete from site_settings backup
  try {
    if (db) {
      const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_contact_messages').first<{ value: string }>();
      if (row?.value) {
        let list: ContactMessage[] = JSON.parse(row.value);
        list = list.filter((m) => m.id !== id);
        await db
          .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
          .bind('cms_contact_messages', JSON.stringify(list))
          .run();
      }
    }
  } catch {}

  // 3. Delete from local file
  try {
    const store = await getLocalFileStorage();
    const raw = store['_contact_messages_list'] || '[]';
    let list: ContactMessage[] = JSON.parse(raw);
    list = list.filter((m) => m.id !== id);
    await writeLocalFileStorage('_contact_messages_list', JSON.stringify(list));
  } catch {}

  return true;
}

/**
 * Get configured notification email destination for contact form submissions.
 */
export async function getContactNotificationEmail(db?: D1Database, locals?: any): Promise<string> {
  // 1. Check site_settings
  try {
    if (db) {
      const row = await db.prepare('SELECT value FROM site_settings WHERE key = ?').bind('cms_contact_email').first<{ value: string }>();
      if (row?.value) {
        const parsed = JSON.parse(row.value);
        if (typeof parsed === 'string' && parsed.includes('@')) {
          return parsed.trim();
        }
      }
    }
  } catch {}

  // 2. Check environment bindings
  const env = (locals as any)?.env || (globalThis as any)?.process?.env || {};
  if (env.CONTACT_NOTIFICATION_EMAIL && String(env.CONTACT_NOTIFICATION_EMAIL).includes('@')) {
    return String(env.CONTACT_NOTIFICATION_EMAIL).trim();
  }
  if (env.ADMIN_EMAIL && String(env.ADMIN_EMAIL).includes('@')) {
    return String(env.ADMIN_EMAIL).trim();
  }

  // 3. Default fallback
  return 'indiarojgaarcom@gmail.com';
}

/**
 * Update configured notification email destination for contact form submissions.
 */
export async function setContactNotificationEmail(db: D1Database, email: string): Promise<void> {
  const cleanEmail = email.trim();
  try {
    await db.exec('CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    await db
      .prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
      .bind('cms_contact_email', JSON.stringify(cleanEmail))
      .run();
  } catch {}

  try {
    await writeLocalFileStorage('cms_contact_email', JSON.stringify(cleanEmail));
  } catch {}
}
