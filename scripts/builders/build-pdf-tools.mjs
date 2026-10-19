// scripts/builders/build-pdf-tools.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pdfPart1 } from './pdf-part1.mjs';
import { pdfPart2 } from './pdf-part2.mjs';
import { pdfPart3 } from './pdf-part3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '..', 'definitions');

const allPdfTools = {
  ...pdfPart1,
  ...pdfPart2,
  ...pdfPart3
};

const toolKeys = Object.keys(allPdfTools);
console.log(`Total PDF tools assembled: ${toolKeys.length}`);

// Validate all 14 tools
const expectedTools = [
  'pdf-merge', 'pdf-split', 'pdf-compress', 'pdf-to-image', 'image-to-pdf',
  'protect-pdf', 'unlock-pdf', 'rotate-pdf', 'add-page-numbers-to-pdf', 'pdf-to-word',
  'word-to-pdf', 'delete-pages-from-pdf', 'reorder-pdf-pages', 'pdf-to-grayscale'
];

for (const t of expectedTools) {
  if (!allPdfTools[t]) {
    throw new Error(`Missing expected PDF tool: ${t}`);
  }
}

// Generate javascript export file
const header = `// scripts/definitions/pdf-tools.mjs
// Auto-assembled PDF tool definitions for all 14 tools across 9 locales

export const pdfToolsDefinitions = ${JSON.stringify(allPdfTools, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'pdf-tools.mjs'), header, 'utf-8');
console.log('Successfully wrote scripts/definitions/pdf-tools.mjs!');
