import fs from 'node:fs';

const content = fs.readFileSync('src/pages/construction/brickwork-calculator.astro', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('script')) {
    console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
