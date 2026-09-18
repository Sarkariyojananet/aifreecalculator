import { UNIT_CONVERTER_CONTENT } from '../src/data/content/unit-converter/index.ts';

const REQUIRED_LOCALES = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const EXPECTED_CATEGORIES_COUNT = 16;
const EXPECTED_FAQS_COUNT = 14;

let errors = [];

console.log('=== VALIDATING UNIT CONVERTER I18N DATA PARITY ===\n');

for (const loc of REQUIRED_LOCALES) {
  const content = UNIT_CONVERTER_CONTENT[loc];
  if (!content) {
    errors.push(`Missing locale content for "${loc}"`);
    continue;
  }

  // Check meta
  if (!content.meta.title || !content.meta.description || !content.meta.h1) {
    errors.push(`[${loc}] Missing metadata fields (title, description, or h1)`);
  }

  // Check categories count
  if (!content.categories || content.categories.length !== EXPECTED_CATEGORIES_COUNT) {
    errors.push(`[${loc}] Expected ${EXPECTED_CATEGORIES_COUNT} categories, found ${content.categories?.length || 0}`);
  }

  // Check article categories count
  if (!content.article?.categoriesList || content.article.categoriesList.length !== EXPECTED_CATEGORIES_COUNT) {
    errors.push(`[${loc}] Expected ${EXPECTED_CATEGORIES_COUNT} article category sections, found ${content.article?.categoriesList?.length || 0}`);
  }

  // Check benchmark rows
  if (!content.article?.benchmarksRows || content.article.benchmarksRows.length !== 5) {
    errors.push(`[${loc}] Expected 5 temperature benchmarks rows, found ${content.article?.benchmarksRows?.length || 0}`);
  }

  // Check use cases
  if (!content.article?.useCasesList || content.article.useCasesList.length !== 4) {
    errors.push(`[${loc}] Expected 4 use cases, found ${content.article?.useCasesList?.length || 0}`);
  }

  // Check limitations
  if (!content.article?.limitationsList || content.article.limitationsList.length !== 3) {
    errors.push(`[${loc}] Expected 3 limitations, found ${content.article?.limitationsList?.length || 0}`);
  }

  // Check FAQs count
  if (!content.faqs || content.faqs.length !== EXPECTED_FAQS_COUNT) {
    errors.push(`[${loc}] Expected ${EXPECTED_FAQS_COUNT} FAQs, found ${content.faqs?.length || 0}`);
  } else {
    content.faqs.forEach((faq, idx) => {
      if (!faq.question || faq.question.trim().length === 0) {
        errors.push(`[${loc}] FAQ #${idx + 1} has empty question`);
      }
      if (!faq.answer || faq.answer.trim().length === 0) {
        errors.push(`[${loc}] FAQ #${idx + 1} has empty answer`);
      }
    });
  }

  console.log(`✓ [${loc.toUpperCase()}] Verified: 16 Categories, 16 Guide Sections, 5 Benchmarks, 4 Use Cases, 3 Limits, 14 FAQs`);
}

console.log('\n----------------------------------------');
if (errors.length > 0) {
  console.error(`FAILED: ${errors.length} validation issues found:`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log(`SUCCESS: All 9 locales verified with strict content parity (14 FAQs & 16 Categories)!`);
  process.exit(0);
}
