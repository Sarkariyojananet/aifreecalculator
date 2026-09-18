import fs from 'fs';
import path from 'path';

const p = path.resolve('dist/client/hi/free-online-tools/image-compressor/index.html');
const content = fs.readFileSync(p, 'utf-8');

console.log('File size:', content.length);
console.log('Includes "इमेज कंप्रेसर":', content.includes('इमेज कंप्रेसर'));
console.log('Includes "मुफ्त":', content.includes('मुफ्त'));
console.log('Includes "Free Image Compressor":', content.includes('Free Image Compressor'));

// Let's find all H2 tags in this file
const h2s = content.match(/<h2[^>]*>[\s\S]*?<\/h2>/g) || [];
console.log('\nH2 tags in dist/client/hi/free-online-tools/image-compressor/index.html:');
h2s.forEach(h => console.log(' - ', h.replace(/<[^>]+>/g, '').trim()));
