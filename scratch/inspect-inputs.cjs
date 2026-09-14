const fs = require('fs');
const path = require('path');

const targetFiles = [
  'src/pages/general/percentage-calculator.astro',
  'src/pages/math/fraction-calculator.astro',
  'src/pages/math/gpa-calculator.astro',
  'src/pages/math/exponential-function-calculator.astro',
  'src/pages/math/scientific-calculator.astro',
  'src/pages/math/random-number-generator-calculator.astro',
  'src/pages/math/volume-calculator.astro'
];

for (const rel of targetFiles) {
  const filePath = path.resolve(rel);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log(`=== ${rel} ===`);
  lines.forEach((line, idx) => {
    if (line.includes('<input') && /value=["'][^"']+["']/.test(line)) {
      if (!line.includes('type="radio"') && !line.includes('type="checkbox"') && !line.includes('type="hidden"') && !line.includes('type="submit"') && !line.includes('type="button"')) {
        console.log(`  Line ${idx + 1}: ${line.trim()}`);
      }
    }
  });
  console.log('');
}
