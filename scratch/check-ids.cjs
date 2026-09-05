const fs = require('fs');
const content = fs.readFileSync('src/pages/construction/plaster-calculator.astro', 'utf8');

const regex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const missing = [];
const found = [];

while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const hasId = content.includes('id="' + id + '"') || content.includes("id='" + id + "'");
  if (!hasId) {
    missing.push(id);
  } else {
    found.push(id);
  }
}

console.log('Found IDs count:', found.length);
console.log('Missing IDs:', missing);
