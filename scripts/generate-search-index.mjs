import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const calcsPath = path.join(rootDir, 'src', 'data', 'calculators.json');
const dataDir = path.join(rootDir, 'src', 'i18n', 'translations', 'calculators', 'data');
const outputPath = path.join(rootDir, 'src', 'data', 'search-index.json');

const locales = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const calcs = JSON.parse(fs.readFileSync(calcsPath, 'utf8'));

// Read translations per slug
const transBySlug = {};
if (fs.existsSync(dataDir)) {
  for (const f of fs.readdirSync(dataDir)) {
    if (f.endsWith('.json')) {
      const slug = f.replace('.json', '');
      try {
        transBySlug[slug] = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));
      } catch (e) {
        console.warn(`[search-index] Failed to parse ${f}:`, e.message);
      }
    }
  }
}

function getLocalizedPath(rawPath, loc) {
  let clean = rawPath.trim().replace(/\/+/g, '/');
  if (!clean.startsWith('/')) clean = '/' + clean;
  if (!clean.endsWith('/') && !clean.includes('.')) clean = clean + '/';
  if (loc === 'en') return clean;
  return '/' + loc + clean;
}

const searchIndex = {};
for (const loc of locales) {
  searchIndex[loc] = calcs.map((c) => {
    const t = transBySlug[c.slug]?.[loc];
    return {
      name: t?.name || c.name,
      category: t?.categoryLabel || c.category,
      desc: t?.shortDescription || c.description,
      icon: c.icon,
      path: getLocalizedPath(c.path, loc),
      keywords: c.keywords || [],
    };
  });
}

fs.writeFileSync(outputPath, JSON.stringify(searchIndex), 'utf8');
const sizeKb = (Buffer.byteLength(JSON.stringify(searchIndex), 'utf8') / 1024).toFixed(2);
console.log(`[search-index] Generated ${outputPath} (${sizeKb} KB) for ${calcs.length} tools across ${locales.length} languages.`);
