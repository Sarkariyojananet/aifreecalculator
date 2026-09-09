import fs from 'node:fs';

const content = fs.readFileSync('src/pages/construction/brickwork-calculator.astro', 'utf8');
const scriptStart = content.indexOf('<script>');
const scriptEnd = content.lastIndexOf('</script>');

if (scriptStart !== -1 && scriptEnd !== -1) {
  const code = content.slice(scriptStart + 8, scriptEnd);
  console.log('Script length:', code.length);

  // Check for syntax errors by parsing with Function
  try {
    new Function(code);
    console.log('JavaScript syntax is VALID!');
  } catch (err) {
    console.error('Syntax Error in script:', err);
  }
}
