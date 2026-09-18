import fs from 'fs';
import rawCalculators from '../src/data/calculators.json' with { type: 'json' };

async function checkAll80Tools() {
  const testLocales = ['es', 'de', 'ja'];
  for (const loc of testLocales) {
    console.log(`Checking 80 tools on dev server for ${loc}...`);
    let passed = 0;
    let failed = 0;
    for (const calc of rawCalculators) {
      const catSlug = calc.category.toLowerCase().replace(/\s+/g, '-');
      const url = `http://localhost:4321/${loc}/${catSlug}/${calc.slug}/`;
      try {
        const res = await fetch(url);
        if (res.status !== 200) { failed++; continue; }
        const html = await res.text();
        const proseMatch = html.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
        if (!proseMatch || proseMatch[1].length < 100) { failed++; continue; }
        passed++;
      } catch (err) { failed++; }
    }
    console.log(`${loc}: PASSED: ${passed}/80, FAILED: ${failed}`);
  }
}

checkAll80Tools();
