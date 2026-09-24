import fs from 'fs';
import path from 'path';

const distClient = path.resolve('dist/client');

const testCases = [
  { url: 'hi/general/unit-converter/index.html', lang: 'hi', expectedText: 'इकाई परिवर्तक', expectedFaq: 'यह ऑनलाइन इकाई परिवर्तक कितना सटीक है' },
  { url: 'es/general/unit-converter/index.html', lang: 'es', expectedText: 'Conversor de Unidades', expectedFaq: '¿Qué tan preciso es este conversor de unidades online?' },
  { url: 'hi/general/age-calculator/index.html', lang: 'hi', expectedText: 'उम्र कैलकुलेटर', expectedFaq: 'मैं अपनी सही आयु की गणना कैसे करूँ' },
  { url: 'es/general/age-calculator/index.html', lang: 'es', expectedText: 'Calculadora de Edad', expectedFaq: '¿Cómo calculo mi edad exacta?' },
  { url: 'hi/finance/gratuity-calculator/index.html', lang: 'hi', expectedText: 'ग्रेच्युटी', expectedFaq: 'साधारण और उन्नत ग्रेच्युटी कैलकुलेटर में क्या अंतर है' },
  { url: 'hi/finance/ppf-calculator/index.html', lang: 'hi', expectedText: 'PPF', expectedFaq: 'वर्तमान में PPF की ब्याज दर कितनी है' },
  { url: 'hi/finance/swp-calculator/index.html', lang: 'hi', expectedText: 'SWP', expectedFaq: 'म्यूचुअल फंड में SWP की गणना कैसे की जाती है' },
  { url: 'hi/finance/xirr-calculator/index.html', lang: 'hi', expectedText: 'XIRR', expectedFaq: 'XIRR और IRR में क्या अंतर है' },
  { url: 'hi/free-online-tools/image-compressor/index.html', lang: 'hi', expectedText: 'इमेज कंप्रेसर', expectedFaq: 'इमेज कंप्रेसर (Image Compressor) क्या है' },
  { url: 'es/free-online-tools/image-compressor/index.html', lang: 'es', expectedText: 'Compresor de Imágenes', expectedFaq: '¿Qué es un compresor de imágenes?' },
  { url: 'fr/free-online-tools/image-resizer/index.html', lang: 'fr', expectedText: 'Redimensionneur', expectedFaq: 'Qu\'est-ce qu\'un redimensionneur d\'images' },
  { url: 'de/free-online-tools/word-counter/index.html', lang: 'de', expectedText: 'Wortzähler', expectedFaq: 'Was ist ein Wortzähler' },
  { url: 'ja/free-online-tools/qr-code-generator/index.html', lang: 'ja', expectedText: 'QRコード', expectedFaq: 'QRコードジェネレーターとは何ですか？' },
  { url: 'pt/free-online-tools/password-generator/index.html', lang: 'pt', expectedText: 'Gerador de Senhas', expectedFaq: 'O que é um gerador de senhas seguras?' },
  { url: 'ko/free-online-tools/pdf-merge/index.html', lang: 'ko', expectedText: 'PDF 병합', expectedFaq: 'PDF 병합(PDF Merge) 도구는 어떻게 작동하나요?' },
  { url: 'it/free-online-tools/json-formatter/index.html', lang: 'it', expectedText: 'Formattatore JSON', expectedFaq: 'Che cos\'è un formattatore JSON?' }
];

console.log('=== VERIFYING STATIC PRERENDERED HTML IN DIST/CLIENT ===\n');

let allPassed = true;
for (const tc of testCases) {
  const filePath = path.join(distClient, tc.url);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing static HTML file: ${tc.url}`);
    allPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  
  const hasExpectedText = html.includes(tc.expectedText);
  const hasFaq = html.includes(tc.expectedFaq);
  const hasHreflang = html.includes('hreflang="hi"') || html.includes('hreflang="es"');
  const hasMeta = html.includes('<title>') && html.includes('<meta name="description"');

  if (hasExpectedText && hasFaq && hasHreflang && hasMeta) {
    console.log(`✓ ${tc.url}: Passed (Found text, FAQ, hreflang, and metadata)`);
  } else {
    console.error(`❌ ${tc.url}: FAILED check! text=${hasExpectedText}, faq=${hasFaq}, hreflang=${hasHreflang}, meta=${hasMeta}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL DIST/CLIENT STATIC PRERENDERED HTML CHECKS PASSED!');
  process.exit(0);
} else {
  console.error('\n❌ SOME DIST CHECKS FAILED!');
  process.exit(1);
}
