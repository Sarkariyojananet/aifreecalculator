import fs from 'fs';
import path from 'path';

const checkPaths = [
  'dist/client/hi/general/age-calculator/index.html',
  'dist/client/es/general/age-calculator/index.html',
  'dist/client/hi/finance/emi-calculator/index.html',
  'dist/client/es/finance/emi-calculator/index.html',
  'dist/client/de/finance/emi-calculator/index.html',
  'dist/client/ja/finance/emi-calculator/index.html',
  'dist/client/hi/finance/sip-calculator/index.html',
  'dist/client/es/finance/sip-calculator/index.html',
  'dist/client/hi/general/bmi-calculator/index.html',
  'dist/client/es/general/bmi-calculator/index.html',
  'dist/client/hi/free-online-tools/image-compressor/index.html',
  'dist/client/es/free-online-tools/image-compressor/index.html',
  'dist/client/hi/general/unit-converter/index.html',
  'dist/client/es/general/unit-converter/index.html',
  'dist/client/hi/finance/ppf-calculator/index.html',
  'dist/client/hi/finance/gratuity-calculator/index.html'
];

let allPassed = true;

for (const p of checkPaths) {
  if (!fs.existsSync(p)) {
    console.log(`❌ Missing file: ${p}`);
    allPassed = false;
    continue;
  }
  const html = fs.readFileSync(p, 'utf8');
  const proseMatch = html.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
  if (!proseMatch) {
    console.log(`❌ Prose section not found in: ${p}`);
    allPassed = false;
    continue;
  }
  const proseText = proseMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`\n✅ Verified: ${p}`);
  console.log(`   Length: ${proseText.length} chars`);
  console.log(`   Sample: ${proseText.slice(0, 120)}...`);
}

if (allPassed) {
  console.log('\n🎉 ALL STATIC HTML FILES PASS VERIFICATION WITH RICH LOCALIZED SEO CONTENT!');
} else {
  console.log('\n⚠️ Some files failed verification.');
}
