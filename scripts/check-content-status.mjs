import fs from 'fs';
import path from 'path';

const TARGET_SLUGS = [
  'unit-converter',
  'age-calculator',
  'gratuity-calculator',
  'ppf-calculator',
  'swp-calculator',
  'xirr-calculator',
  'image-compressor',
  'image-resizer',
  'jpg-to-png',
  'png-to-jpg',
  'qr-code-generator',
  'word-counter',
  'json-formatter',
  'json-validator',
  'password-generator',
  'pdf-merge'
];

console.log('=== Checking contentHtml and faqs across 9 languages ===');
for (const slug of TARGET_SLUGS) {
  const jsonPath = path.resolve(`src/i18n/translations/calculators/data/${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`❌ ${slug}: JSON file missing!`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const locales = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  const faqCounts = locales.map(l => (data[l]?.faqs?.length || 0));
  const hasContentHtml = locales.map(l => (Boolean(data[l]?.contentHtml)));
  console.log(`${slug}:`);
  console.log(`  FAQs: ${locales.map((l, i) => `${l}=${faqCounts[i]}`).join(', ')}`);
  console.log(`  ContentHtml: ${locales.map((l, i) => `${l}=${hasContentHtml[i]}`).join(', ')}`);
}
