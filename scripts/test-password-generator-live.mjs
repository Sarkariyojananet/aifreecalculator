async function test() {
  const res = await fetch('http://localhost:4321/hi/free-online-tools/password-generator/');
  const text = await res.text();
  const proseMatch = text.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
  if (proseMatch) {
    const clean = proseMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('STATUS:', res.status);
    console.log('HI Password Generator clean length:', clean.length);
    console.log('Sample text (first 300 chars):');
    console.log(clean.slice(0, 300));
  } else {
    console.log('Prose match not found');
  }

  const resEs = await fetch('http://localhost:4321/es/free-online-tools/password-generator/');
  const textEs = await resEs.text();
  const proseMatchEs = textEs.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
  if (proseMatchEs) {
    const cleanEs = proseMatchEs[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('\nES Password Generator clean length:', cleanEs.length);
    console.log('Sample text (first 300 chars):');
    console.log(cleanEs.slice(0, 300));
  }
}
test();
