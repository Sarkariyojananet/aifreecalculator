const fs = require('fs');
const path = require('path');

const mathDir = path.resolve('src/pages/math');
const files = fs.readdirSync(mathDir).filter(f => f.endsWith('.astro'));

// Also include general/percentage-calculator.astro
files.push(path.resolve('src/pages/general/percentage-calculator.astro'));

console.log('Inspecting math pages & percentage-calculator:\n');

for (const f of files) {
  const filePath = path.resolve(mathDir, f);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check redirect
  if (content.includes('Astro.redirect')) {
    console.log(`[REDIRECT] ${f}`);
    continue;
  }
  
  // Check calc-action-bar-container mentions
  const barMentions = (content.match(/calc-action-bar-container/g) || []).length;
  
  // Check slot="content"
  const hasSlotContent = content.includes('slot="content"');
  
  // Check input values
  const inputMatches = [...content.matchAll(/<input[^>]+>/gi)].map(m => m[0]);
  const hardcodedInputs = [];
  for (const inp of inputMatches) {
    // ignore hidden, submit, button, radio, checkbox, date picker defaults if appropriate
    const typeMatch = inp.match(/type=["']([^"']+)["']/i);
    const type = typeMatch ? typeMatch[1] : 'text';
    const valMatch = inp.match(/value=["']([^"']*)["']/i);
    const val = valMatch ? valMatch[1] : null;
    const idMatch = inp.match(/id=["']([^"']+)["']/i);
    const id = idMatch ? idMatch[1] : 'unknown';
    
    if (val !== null && val !== '' && type !== 'hidden' && type !== 'submit' && type !== 'button' && type !== 'radio' && type !== 'checkbox') {
      hardcodedInputs.push({ id, type, val });
    }
  }
  
  // Look for result containers
  const resultCards = [...content.matchAll(/id=["']([^"']*(?:result|res-)[^"']*)["']/gi)].map(m => m[1]);

  console.log(`PAGE: ${f}`);
  console.log(` - Has slot="content": ${hasSlotContent}`);
  console.log(` - barMentions in script: ${barMentions}`);
  console.log(` - Result container IDs: ${resultCards.join(', ')}`);
  console.log(` - Hardcoded input values count: ${hardcodedInputs.length}`);
  if (hardcodedInputs.length > 0) {
    console.log(`   Examples:`, hardcodedInputs.slice(0, 5));
  }
  console.log('');
}
