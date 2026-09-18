import fs from 'fs';
import path from 'path';

function findAstroFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!file.startsWith('[')) results = results.concat(findAstroFiles(full));
    } else if (file.endsWith('.astro')) {
      results.push(full);
    }
  }
  return results;
}

const files = findAstroFiles('./src/pages');
const slotSizes = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/slot=["']content["'][^>]*>([\s\S]*?)<\/(?:Fragment|section|div|article)>/i);
  if (match) {
    slotSizes.push({ file: f.replace(/\\/g, '/'), length: match[1].trim().length });
  }
}

slotSizes.sort((a, b) => b.length - a.length);
console.log('Pages with custom content slot:', slotSizes.length);
for (const s of slotSizes.slice(0, 30)) {
  console.log(s.file.padEnd(65), s.length);
}
