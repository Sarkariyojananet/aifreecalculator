/**
 * Complete P1 Task 1 Enrichment Script
 * Covers all 49 non-math tools across 9 locales: en, hi, es, ja, fr, de, pt, ko, it
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '..', 'src', 'i18n', 'translations', 'calculators', 'data');

const LOCALES = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];

// Import all group definitions
import { imageToolsDefinitions } from './definitions/image-tools.mjs';
import { pdfToolsDefinitions } from './definitions/pdf-tools.mjs';
import { compilerToolsDefinitions } from './definitions/compiler-tools.mjs';
import { utilityToolsDefinitions } from './definitions/utility-tools.mjs';
import { timetableToolsDefinitions } from './definitions/timetable-tools.mjs';

const allDefinitions = {
  ...imageToolsDefinitions,
  ...pdfToolsDefinitions,
  ...compilerToolsDefinitions,
  ...utilityToolsDefinitions,
  ...timetableToolsDefinitions,
};

const slugs = Object.keys(allDefinitions);
console.log(`Loaded definitions for ${slugs.length} non-math tools.`);

function getLocaleData(def, locale) {
  if (def[locale]) {
    return {
      formulaTitle: def[locale].formulaTitle || '',
      formulaDescription: def[locale].formulaDescription || '',
      stepByStep: def[locale].stepByStep || def[locale].steps || [],
      workedExample: def[locale].workedExample || null,
      faqs: def[locale].faqs || []
    };
  }
  // Schema B (e.g., pdfToolsDefinitions)
  return {
    formulaTitle: def.formulaTitle ? (def.formulaTitle[locale] || def.formulaTitle['en']) : '',
    formulaDescription: def.formulaDescription ? (def.formulaDescription[locale] || def.formulaDescription['en']) : '',
    stepByStep: def.steps ? (def.steps[locale] || def.steps['en']) : (def.stepByStep ? (def.stepByStep[locale] || def.stepByStep['en']) : []),
    workedExample: def.workedExample ? (def.workedExample[locale] || def.workedExample['en']) : null,
    faqs: (locale === 'en' && Array.isArray(def.faqs)) ? def.faqs : (def.faqs && def.faqs[locale] ? def.faqs[locale] : [])
  };
}

let updatedFiles = 0;
let errors = 0;

for (const slug of slugs) {
  const filePath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const toolJson = JSON.parse(rawData);
    const def = allDefinitions[slug];

    for (const locale of LOCALES) {
      if (!toolJson[locale]) {
        console.warn(`Locale ${locale} missing in ${slug}.json`);
        continue;
      }

      const localeData = getLocaleData(def, locale);

      // 1. Update stepByStep
      if (localeData.stepByStep && localeData.stepByStep.length > 0) {
        toolJson[locale].stepByStep = localeData.stepByStep;
      }

      // 2. Update workedExample
      if (localeData.workedExample) {
        toolJson[locale].workedExample = localeData.workedExample;
      }

      // 3. Update formulaTitle & formulaDescription
      if (localeData.formulaTitle) {
        toolJson[locale].formulaTitle = localeData.formulaTitle;
      }
      if (localeData.formulaDescription) {
        toolJson[locale].formulaDescription = localeData.formulaDescription;
      }

      // 4. Ensure non-math tools do NOT have fake equations or variables
      toolJson[locale].formulaEquation = '';
      toolJson[locale].variables = [];

      // 5. Update/enrich FAQs safely
      if (localeData.faqs && localeData.faqs.length > 0) {
        const existingFaqs = Array.isArray(toolJson[locale].faqs) ? toolJson[locale].faqs : [];
        const existingQuestions = new Set(existingFaqs.map(f => (f.question || '').toLowerCase().trim()));
        
        const mergedFaqs = [...existingFaqs];
        for (const newFaq of localeData.faqs) {
          const qNorm = (newFaq.question || '').toLowerCase().trim();
          if (!existingQuestions.has(qNorm)) {
            mergedFaqs.push(newFaq);
            existingQuestions.add(qNorm);
          }
        }
        toolJson[locale].faqs = mergedFaqs;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(toolJson, null, 2) + '\n', 'utf8');
    updatedFiles++;
  } catch (err) {
    console.error(`Error processing ${slug}:`, err);
    errors++;
  }
}

console.log(`\nEnrichment Summary:`);
console.log(`Successfully updated: ${updatedFiles} files`);
console.log(`Errors: ${errors}`);
