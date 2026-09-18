async function test() {
  const urls = [
    'http://localhost:4321/general/bmi-calculator/',
    'http://localhost:4321/hi/general/bmi-calculator/',
    'http://localhost:4321/es/general/bmi-calculator/',
    'http://localhost:4321/de/general/bmi-calculator/',
    'http://localhost:4321/ja/general/bmi-calculator/'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      const proseMatch = text.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
      const proseContent = proseMatch ? proseMatch[1] : 'PROSE NOT FOUND';
      console.log('\n=========================================');
      console.log('URL:', url, 'STATUS:', res.status);
      console.log('Prose snippet (first 250 chars):');
      console.log(proseContent.replace(/\s+/g, ' ').trim().slice(0, 250));
    } catch (e) {
      console.log('URL:', url, 'ERROR:', e.message);
    }
  }
}
test();
