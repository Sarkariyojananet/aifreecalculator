import fs from 'fs';

const tools = [
  'image-resizer.astro',
  'jpg-to-png.astro',
  'png-to-jpg.astro',
  'qr-code-generator.astro',
  'json-formatter.astro',
  'json-validator.astro',
  'pdf-merge.astro'
];

for (const t of tools) {
  const content = fs.readFileSync('./src/pages/free-online-tools/' + t, 'utf8');
  const slotMatch = content.match(/<Fragment slot=["']content["']>([\s\S]*?)<\/Fragment>/i);
  if (slotMatch) {
    const h2s = (slotMatch[1].match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
    console.log(`=== ${t} (Length: ${slotMatch[1].length}) ===`);
    console.log('H2s:', h2s);
  }
}
