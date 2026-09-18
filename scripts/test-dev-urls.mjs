async function check() {
  const urls = [
    'http://localhost:4321/hi/general/age-calculator/',
    'http://localhost:4321/es/general/age-calculator/',
    'http://localhost:4321/hi/finance/gratuity-calculator/',
    'http://localhost:4321/es/finance/gratuity-calculator/',
    'http://localhost:4321/hi/finance/ppf-calculator/',
    'http://localhost:4321/hi/finance/swp-calculator/',
    'http://localhost:4321/hi/finance/xirr-calculator/',
    'http://localhost:4321/hi/free-online-tools/image-compressor/',
    'http://localhost:4321/es/free-online-tools/image-compressor/',
    'http://localhost:4321/hi/free-online-tools/word-counter/',
    'http://localhost:4321/es/free-online-tools/word-counter/'
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      console.log('====================================');
      console.log(`URL: ${u} (status ${res.status})`);
      
      // Find what is inside the prose section
      const m = text.match(/<div class="prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
      if (m) {
        // Strip tags to see actual text
        const snippet = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
        console.log(`PROSE CONTENT: "${snippet}"`);
      } else {
        console.log('No prose content match found.');
      }
    } catch (e) {
      console.error(`Error fetching ${u}:`, e.message);
    }
  }
}

check();
