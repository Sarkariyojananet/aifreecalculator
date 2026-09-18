import fs from 'fs';
import path from 'path';

const files = [
  'image-resizer.astro',
  'jpg-to-png.astro',
  'png-to-jpg.astro',
  'qr-code-generator.astro',
  'json-formatter.astro',
  'json-validator.astro',
  'password-generator.astro',
  'pdf-merge.astro'
];

for (const f of files) {
  const p = path.resolve('src/pages/free-online-tools', f);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf-8');
  
  // extract faqs array if present in frontmatter
  const faqMatch = content.match(/const faqs = (\[[\s\S]*?\]);/);
  const faqCount = faqMatch ? (faqMatch[1].match(/question:/g) || []).length : 0;
  
  // count h2s in content slot
  const h2s = (content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
  
  console.log(`=== ${f} ===`);
  console.log(`FAQ Count in Astro: ${faqCount}`);
  console.log(`H2 Headings (${h2s.length}):`);
  h2s.forEach(h => console.log(`  - ${h}`));
  console.log('');
}
