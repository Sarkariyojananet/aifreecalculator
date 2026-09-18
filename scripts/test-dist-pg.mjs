import fs from 'fs';

const html = fs.readFileSync('dist/client/hi/free-online-tools/password-generator/index.html', 'utf8');
const proseMatch = html.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
if (proseMatch) {
  const clean = proseMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('DIST HI Password Generator length:', clean.length);
  console.log('Sample text (first 300 chars):');
  console.log(clean.slice(0, 300));
} else {
  console.log('Not found in dist');
}

const htmlEs = fs.readFileSync('dist/client/es/free-online-tools/password-generator/index.html', 'utf8');
const proseMatchEs = htmlEs.match(/<div class="prose[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- FAQs/);
if (proseMatchEs) {
  const cleanEs = proseMatchEs[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('\nDIST ES Password Generator length:', cleanEs.length);
  console.log('Sample text (first 300 chars):');
  console.log(cleanEs.slice(0, 300));
}
