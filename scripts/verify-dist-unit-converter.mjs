import fs from 'fs';
import path from 'path';

const LOCALES = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const results = [];

console.log('=== VERIFYING DIST/CLIENT HTML ARTIFACTS ===\n');

for (const loc of LOCALES) {
  const filePath = loc === 'en'
    ? path.resolve('dist/client/general/unit-converter/index.html')
    : path.resolve(`dist/client/${loc}/general/unit-converter/index.html`);

  if (!fs.existsSync(filePath)) {
    results.push({ loc, status: 'MISSING FILE', file: filePath });
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // Check 1: Empty initial input
  const hasEmptyInput = html.includes('id="unit-from-val" value=""') || html.includes('id="unit-from-val" step="any" value=""') || html.includes('value="" placeholder=');
  const hasPrefilledNumber = html.includes('id="unit-from-val" value="1"') || html.includes('id="unit-from-val" value="10"');

  // Check 2: All 14 FAQs rendered
  const faqDetailsCount = (html.match(/<details/g) || []).length;

  // Check 3: SEO content length & benchmarks table
  const hasBenchmarksTable = html.includes('Absolute Zero') || html.includes('परम शून्य') || html.includes('Cero Absoluto') || html.includes('絶対零度') || html.includes('Zéro Absolu') || html.includes('Absoluter Nullpunkt') || html.includes('Zero Absoluto') || html.includes('절대영도') || html.includes('Zero Assoluto');
  
  const fileSizeKb = (html.length / 1024).toFixed(1);

  results.push({
    loc,
    fileSizeKb,
    faqCount: faqDetailsCount,
    hasEmptyInput,
    hasPrefilledNumber,
    hasBenchmarksTable
  });

  console.log(`[${loc.toUpperCase()}] Size: ${fileSizeKb} KB | FAQ Details: ${faqDetailsCount} | Empty Input: ${hasEmptyInput} | Pre-filled: ${hasPrefilledNumber} | Benchmarks Table: ${hasBenchmarksTable}`);
}

const failed = results.filter(r => !r.hasEmptyInput || r.hasPrefilledNumber || r.faqCount < 14 || !r.hasBenchmarksTable);

if (failed.length > 0) {
  console.error('\nFAILED CHECKS:', failed);
  process.exit(1);
} else {
  console.log('\nALL 9 LOCALIZED HTML PAGES VERIFIED 100% PERFECT!');
  process.exit(0);
}
