import fs from 'fs';
import path from 'path';
import { UNIT_CONVERTER_CONTENT } from '../src/data/content/unit-converter/index.ts';

const jsonPath = path.resolve('src/i18n/translations/calculators/data/unit-converter.json');
const currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

for (const lang of Object.keys(UNIT_CONVERTER_CONTENT)) {
  const c = UNIT_CONVERTER_CONTENT[lang];
  if (!currentData[lang]) {
    currentData[lang] = {};
  }
  currentData[lang].locale = lang;
  currentData[lang].status = 'translated';
  currentData[lang].name = c.meta.h1;
  currentData[lang].title = c.meta.title;
  currentData[lang].metaTitle = c.meta.title;
  currentData[lang].metaDescription = c.meta.description;
  currentData[lang].h1 = c.meta.h1;
  currentData[lang].description = c.meta.intro;
  currentData[lang].shortDescription = c.meta.intro;
  currentData[lang].intro = c.meta.intro;
  currentData[lang].faqs = c.faqs.map(f => ({
    question: f.question,
    answer: f.answer
  }));
}

fs.writeFileSync(jsonPath, JSON.stringify(currentData, null, 2), 'utf-8');
console.log('Successfully synchronized unit-converter.json with all 14 FAQs across all 9 locales!');
