import fs from 'fs';
import path from 'path';

const tools = [
  'image-compressor',
  'image-resizer',
  'jpg-to-png',
  'png-to-jpg',
  'qr-code-generator',
  'word-counter',
  'json-formatter',
  'json-validator',
  'password-generator',
  'pdf-merge'
];

for (const slug of tools) {
  const p = path.resolve(`src/pages/free-online-tools/${slug}.astro`);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, 'utf-8');
  const slotMatch = content.match(/<Fragment slot="content">([\s\S]*?)<\/Fragment>/);
  if (slotMatch) {
    const html = slotMatch[1].trim();
    console.log(`✓ ${slug}: Found slot="content" (${html.length} chars)`);
  } else {
    console.log(`❌ ${slug}: slot="content" NOT found!`);
  }
}
