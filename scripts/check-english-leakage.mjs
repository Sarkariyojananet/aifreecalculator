import fs from 'fs';
import path from 'path';

const tools = [
  'image-compressor', 'image-resizer', 'jpg-to-png', 'png-to-jpg', 
  'qr-code-generator', 'word-counter', 'json-formatter', 'json-validator', 
  'password-generator', 'pdf-merge', 'age-calculator', 'gratuity-calculator', 
  'ppf-calculator', 'swp-calculator', 'xirr-calculator'
];
const locales = ['hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];

let leakedCount = 0;
for (const tool of tools) {
  const file = path.resolve('src/i18n/translations/calculators/data', `${tool}.json`);
  if (!fs.existsSync(file)) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const loc of locales) {
    const entry = data[loc];
    if (!entry) {
      console.log(`[${tool}] [${loc}] MISSING ENTRY`);
      leakedCount++;
      continue;
    }
    const q1 = entry.faqs && entry.faqs[0] ? entry.faqs[0].question : '';
    // Check for actual English interrogative / common phrases
    const englishPatterns = [
      /^What is/i, /^How to/i, /^Can I/i, /^Why /i, /^How do/i, 
      /^Which /i, /^Are my/i, /^Is this/i, /^Does /i, /^How much/i
    ];
    const isEnglishQ1 = englishPatterns.some(p => p.test(q1));
    if (isEnglishQ1 && loc !== 'en') {
      console.log(`[${tool}] [${loc}] REAL ENGLISH LEAK: "${q1}"`);
      leakedCount++;
    }
  }
}

console.log(`\nTotal leaked non-English entries with English FAQs: ${leakedCount}`);
