import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const REQUIRED_LANGUAGES = ['hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const ALL_LANGUAGES = ['en', ...REQUIRED_LANGUAGES];

console.log('='.repeat(60));
console.log('  AIFreeCalculator - i18n & Multilingual Audit Validator');
console.log('='.repeat(60));

// 1. Scan actual project inventory from src/data/calculators.json
const calcsFilePath = path.join(rootDir, 'src', 'data', 'calculators.json');
if (!fs.existsSync(calcsFilePath)) {
  console.error('FATAL: src/data/calculators.json not found');
  process.exit(1);
}
const calculators = JSON.parse(fs.readFileSync(calcsFilePath, 'utf8'));
const totalCalculators = calculators.length;
console.log(`\n[1/5] Scanned calculator inventory: Found ${totalCalculators} calculators.`);

import { pathToFileURL } from 'url';

// 2. Load category translations
const categoriesUrl = pathToFileURL(path.join(rootDir, 'src', 'i18n', 'translations', 'categories.ts')).href;
const categoriesModule = await import(categoriesUrl);
const CATEGORY_TRANSLATIONS = categoriesModule.CATEGORY_TRANSLATIONS;
const CATEGORIES_LIST = categoriesModule.CATEGORIES_LIST || ['general', 'finance', 'construction', 'health', 'math'];

// 3. Load common translations
const commonUrl = pathToFileURL(path.join(rootDir, 'src', 'i18n', 'translations', 'common.ts')).href;
const commonModule = await import(commonUrl);
const COMMON_TRANSLATIONS = commonModule.COMMON_TRANSLATIONS;

// Tracking statistics
let missingTranslationsCount = 0;
let englishFallbackCount = 0;
let missingSeoCount = 0;
let missingCardTranslationsCount = 0;
let missingCategoryTranslationsCount = 0;
let missingCommonTranslationsCount = 0;
let incompletePagesCount = 0;
let fullyTranslatedPagesCount = 0;

const errorsList = [];

// 4. Audit Common Translations
console.log('\n[2/5] Auditing common translations across all 9 languages...');
const requiredCommonSections = [
  'formula', 'howItWorks', 'example', 'faq', 'relatedTools', 'popularTools', 'calculatorTools', 'moreCategoryTools'
];
const requiredCommonButtons = [
  'calculate', 'reset', 'share', 'copied', 'downloadPdf', 'viewAll', 'readMore'
];
const requiredCommonNav = [
  'home', 'categories', 'allCalculators', 'about', 'contact'
];
const requiredCommonDirectory = [
  'filterPlaceholder', 'allLabel', 'noResultsTitle', 'noResultsDesc', 'toolsCountBadge'
];
const requiredCommonFooter = [
  'quickLinks', 'categoriesTitle', 'legalTitle', 'privacy', 'terms', 'disclaimer', 'aboutUs', 'contactUs', 'allRightsReserved', 'freeNotice'
];

for (const lang of ALL_LANGUAGES) {
  const comm = COMMON_TRANSLATIONS[lang];
  if (!comm) {
    errorsList.push(`Common translations missing for language: ${lang}`);
    missingCommonTranslationsCount++;
    continue;
  }
  for (const s of requiredCommonSections) {
    if (!comm.sections || !comm.sections[s]) {
      errorsList.push(`Common translations [${lang}]: missing sections.${s}`);
      missingCommonTranslationsCount++;
    }
  }
  for (const b of requiredCommonButtons) {
    if (!comm.buttons || !comm.buttons[b]) {
      errorsList.push(`Common translations [${lang}]: missing buttons.${b}`);
      missingCommonTranslationsCount++;
    }
  }
  for (const n of requiredCommonNav) {
    if (!comm.nav || !comm.nav[n]) {
      errorsList.push(`Common translations [${lang}]: missing nav.${n}`);
      missingCommonTranslationsCount++;
    }
  }
  for (const d of requiredCommonDirectory) {
    if (!comm.directory || !comm.directory[d]) {
      errorsList.push(`Common translations [${lang}]: missing directory.${d}`);
      missingCommonTranslationsCount++;
    }
  }
  for (const f of requiredCommonFooter) {
    if (!comm.footer || !comm.footer[f]) {
      errorsList.push(`Common translations [${lang}]: missing footer.${f}`);
      missingCommonTranslationsCount++;
    }
  }
}

// 5. Audit Categories across all languages
console.log('\n[3/5] Auditing category translations across all 9 languages...');
for (const catKey of CATEGORIES_LIST) {
  const catData = CATEGORY_TRANSLATIONS[catKey];
  if (!catData) {
    errorsList.push(`Category "${catKey}" missing entirely from CATEGORY_TRANSLATIONS`);
    missingCategoryTranslationsCount++;
    continue;
  }
  for (const lang of ALL_LANGUAGES) {
    const locCat = catData[lang];
    if (!locCat) {
      errorsList.push(`Category "${catKey}" missing translation for language: ${lang}`);
      missingCategoryTranslationsCount++;
      continue;
    }
    if (!locCat.name || !locCat.metaTitle || !locCat.metaDescription || !locCat.h1 || !locCat.description) {
      errorsList.push(`Category "${catKey}" in [${lang}] has incomplete fields`);
      missingCategoryTranslationsCount++;
    }
    if (lang !== 'en' && catData.en) {
      if (locCat.metaTitle === catData.en.metaTitle) {
        errorsList.push(`Category "${catKey}" in [${lang}] has English fallback metaTitle`);
        englishFallbackCount++;
      }
      if (locCat.description === catData.en.description) {
        errorsList.push(`Category "${catKey}" in [${lang}] has English fallback description`);
        englishFallbackCount++;
      }
    }
  }
}

// 6. Audit Calculators
console.log('\n[4/5] Auditing all 61 calculators × 9 languages (549 variations)...');
const dataDir = path.join(rootDir, 'src', 'i18n', 'translations', 'calculators', 'data');

for (const calc of calculators) {
  const slug = calc.slug;
  const jsonPath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(jsonPath)) {
    errorsList.push(`Translation data file missing for calculator slug: ${slug} (${jsonPath})`);
    missingTranslationsCount += ALL_LANGUAGES.length;
    incompletePagesCount += REQUIRED_LANGUAGES.length;
    continue;
  }

  let calcData;
  try {
    calcData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch (err) {
    errorsList.push(`Invalid JSON syntax in ${jsonPath}: ${err.message}`);
    missingTranslationsCount += ALL_LANGUAGES.length;
    incompletePagesCount += REQUIRED_LANGUAGES.length;
    continue;
  }

  const enData = calcData.en;
  if (!enData) {
    errorsList.push(`English source data missing in ${slug}.json`);
  }

  for (const lang of REQUIRED_LANGUAGES) {
    const loc = calcData[lang];
    let pageHasError = false;

    if (!loc) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing language object entirely`);
      missingTranslationsCount++;
      missingCardTranslationsCount++;
      missingSeoCount++;
      incompletePagesCount++;
      continue;
    }

    // Check status
    if (loc.status !== 'translated') {
      errorsList.push(`[${lang}] Calculator "${slug}": status is "${loc.status}", expected "translated"`);
      pageHasError = true;
    }

    // Localized card title & description
    if (!loc.name || loc.name.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing card title (name)`);
      missingCardTranslationsCount++;
      pageHasError = true;
    }
    const shortDesc = loc.shortDescription || loc.description;
    if (!shortDesc || shortDesc.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing card description (shortDescription)`);
      missingCardTranslationsCount++;
      pageHasError = true;
    }

    // SEO fields
    if (!loc.metaTitle || loc.metaTitle.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing SEO metaTitle`);
      missingSeoCount++;
      pageHasError = true;
    }
    if (!loc.metaDescription || loc.metaDescription.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing SEO metaDescription`);
      missingSeoCount++;
      pageHasError = true;
    }
    if (!loc.h1 || loc.h1.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing H1 heading`);
      missingSeoCount++;
      pageHasError = true;
    }

    // Formula explanation
    if (!loc.formulaTitle || loc.formulaTitle.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing formulaTitle`);
      pageHasError = true;
    }
    if (!loc.formulaDescription || loc.formulaDescription.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing formulaDescription`);
      pageHasError = true;
    }
    if (!loc.formulaEquation || loc.formulaEquation.trim().length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing formulaEquation`);
      pageHasError = true;
    }

    // FAQ
    if (!Array.isArray(loc.faqs) || loc.faqs.length === 0) {
      errorsList.push(`[${lang}] Calculator "${slug}": missing FAQs`);
      pageHasError = true;
    } else {
      for (let i = 0; i < loc.faqs.length; i++) {
        const f = loc.faqs[i];
        if (!f.question || !f.answer) {
          errorsList.push(`[${lang}] Calculator "${slug}": FAQ #${i + 1} is missing question or answer`);
          pageHasError = true;
        }
      }
    }

    // Detect silent English fallback
    if (enData) {
      if (loc.metaTitle === enData.metaTitle) {
        errorsList.push(`[${lang}] Calculator "${slug}": metaTitle is identical to English (silent fallback)`);
        englishFallbackCount++;
        pageHasError = true;
      }
      if (loc.metaDescription === enData.metaDescription) {
        errorsList.push(`[${lang}] Calculator "${slug}": metaDescription is identical to English (silent fallback)`);
        englishFallbackCount++;
        pageHasError = true;
      }
      if (loc.h1 === enData.h1) {
        errorsList.push(`[${lang}] Calculator "${slug}": h1 is identical to English (silent fallback)`);
        englishFallbackCount++;
        pageHasError = true;
      }
    }

    if (pageHasError) {
      incompletePagesCount++;
    } else {
      fullyTranslatedPagesCount++;
    }
  }
}

// 7. Check codebase for silent fallback code patterns
console.log('\n[5/5] Scanning codebase files for silent English fallback anti-patterns...');
const forbiddenPatterns = [
  { pattern: /translation\[lang\]\s*\|\|\s*translation\.en/, desc: 'translation[lang] || translation.en' },
  { pattern: /translation\[lang\]\s*\?\?\s*translation\.en/, desc: 'translation[lang] ?? translation.en' },
  { pattern: /data\[lang\]\s*\|\|\s*data\.en/, desc: 'data[lang] || data.en' },
  { pattern: /data\[lang\]\s*\?\?\s*data\.en/, desc: 'data[lang] ?? data.en' },
  { pattern: /names\[lang\]\s*\|\|\s*cat\.name/, desc: 'CATEGORIES_CONFIG[...]?.names[lang] || cat.name' },
  { pattern: /descriptions\[lang\]\s*\|\|\s*cat\.description/, desc: 'CATEGORIES_CONFIG[...]?.descriptions[lang] || cat.description' },
  { pattern: /COMMON_TRANSLATIONS\[lang\]\s*\|\|\s*COMMON_TRANSLATIONS\.en/, desc: 'COMMON_TRANSLATIONS[lang] || COMMON_TRANSLATIONS.en' }
];

function scanFilesForPatterns(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.astro', 'dist', 'build', '.wrangler'].includes(entry.name)) {
        scanFilesForPatterns(fullPath);
      }
    } else if (/\.(astro|ts|tsx|js|mjs)$/.test(entry.name)) {
      const code = fs.readFileSync(fullPath, 'utf8');
      for (const { pattern, desc } of forbiddenPatterns) {
        if (pattern.test(code)) {
          const relPath = path.relative(rootDir, fullPath);
          errorsList.push(`Found forbidden fallback pattern "${desc}" in ${relPath}`);
          englishFallbackCount++;
        }
      }
    }
  }
}
scanFilesForPatterns(path.join(rootDir, 'src'));

// 8. Generate final audit report
console.log('\n' + '='.repeat(60));
console.log('              FINAL I18N VALIDATION REPORT');
console.log('='.repeat(60));

const totalLanguages = ALL_LANGUAGES.length;
const expectedLocalizedPages = totalCalculators * REQUIRED_LANGUAGES.length;

console.log(`Total calculators: ${totalCalculators}`);
console.log(`Total languages: ${totalLanguages}`);
console.log(`Expected localized calculator pages: ${expectedLocalizedPages}`);
console.log(`Fully translated: ${fullyTranslatedPagesCount}`);
console.log(`Incomplete: ${incompletePagesCount}`);
console.log(`English fallback occurrences: ${englishFallbackCount}`);
console.log(`Missing SEO: ${missingSeoCount}`);
console.log(`Missing calculator card translations: ${missingCardTranslationsCount}`);
console.log(`Missing category translations: ${missingCategoryTranslationsCount}`);
console.log(`Missing common translations: ${missingCommonTranslationsCount}`);
console.log('='.repeat(60));

if (errorsList.length > 0) {
  console.error(`\nFAILED: Found ${errorsList.length} validation errors:`);
  errorsList.slice(0, 30).forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  if (errorsList.length > 30) {
    console.error(`  ... and ${errorsList.length - 30} more errors.`);
  }
  process.exit(1);
} else {
  console.log('\nSUCCESS: 100% of calculators and routes are fully localized with ZERO English fallbacks!');
  process.exit(0);
}
