import fs from 'fs';
import path from 'path';

const TARGET_SLUGS = [
  { slug: 'unit-converter', file: 'src/pages/general/unit-converter.astro' },
  { slug: 'age-calculator', file: 'src/pages/general/age-calculator.astro' },
  { slug: 'gratuity-calculator', file: 'src/pages/finance/gratuity-calculator.astro' },
  { slug: 'ppf-calculator', file: 'src/pages/finance/ppf-calculator.astro' },
  { slug: 'swp-calculator', file: 'src/pages/finance/swp-calculator.astro' },
  { slug: 'xirr-calculator', file: 'src/pages/finance/xirr-calculator.astro' },
  { slug: 'image-compressor', file: 'src/pages/free-online-tools/image-compressor.astro' },
  { slug: 'image-resizer', file: 'src/pages/free-online-tools/image-resizer.astro' },
  { slug: 'jpg-to-png', file: 'src/pages/free-online-tools/jpg-to-png.astro' },
  { slug: 'png-to-jpg', file: 'src/pages/free-online-tools/png-to-jpg.astro' },
  { slug: 'qr-code-generator', file: 'src/pages/free-online-tools/qr-code-generator.astro' },
  { slug: 'word-counter', file: 'src/pages/free-online-tools/word-counter.astro' },
  { slug: 'json-formatter', file: 'src/pages/free-online-tools/json-formatter.astro' },
  { slug: 'json-validator', file: 'src/pages/free-online-tools/json-validator.astro' },
  { slug: 'password-generator', file: 'src/pages/free-online-tools/password-generator.astro' },
  { slug: 'pdf-merge', file: 'src/pages/free-online-tools/pdf-merge.astro' },
];

console.log('Target Slug Inventory:');
for (const item of TARGET_SLUGS) {
  const filePath = path.resolve(process.cwd(), item.file);
  const exists = fs.existsSync(filePath);
  const jsonPath = path.resolve(process.cwd(), `src/i18n/translations/calculators/data/${item.slug}.json`);
  const jsonExists = fs.existsSync(jsonPath);
  let jsonLocales = [];
  let enFaqCount = 0;
  if (jsonExists) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      jsonLocales = Object.keys(data);
      if (data.en && data.en.faqs) {
        enFaqCount = data.en.faqs.length;
      }
    } catch (e) {
      // error reading json
    }
  }
  console.log(`- ${item.slug}: Astro=${exists}, JSON=${jsonExists} (${jsonLocales.length} locales, en.faqs=${enFaqCount})`);
}
