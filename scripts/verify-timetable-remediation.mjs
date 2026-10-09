import fs from 'fs';
import path from 'path';

const distClient = path.resolve('dist/client');
const redirectsFile = path.join(distClient, '_redirects');

const retainedSlugs = [
  'timetable-maker',
  'weekly-timetable-maker',
  'daily-timetable-maker',
  'study-timetable-maker',
  'work-shift-schedule-maker',
  'monthly-time-table-maker',
  'workout-timetable-maker',
  'meal-timetable-planner',
  'cute-timetable-maker'
];

const consolidatedMap = {
  'exam-timetable-maker': 'study-timetable-maker',
  'student-timetable-maker': 'study-timetable-maker',
  'school-timetable-maker': 'study-timetable-maker',
  'college-timetable-maker': 'study-timetable-maker',
  'university-timetable-maker': 'study-timetable-maker',
  'class-timetable-generator': 'study-timetable-maker',
  'class-schedule-maker': 'study-timetable-maker',
  'teacher-timetable-maker': 'study-timetable-maker',
  'kids-timetable-maker': 'daily-timetable-maker',
  'kids-daily-routine-planner': 'daily-timetable-maker',
  'boys-daily-routine-planner': 'daily-timetable-maker',
  'girls-daily-routine-planner': 'daily-timetable-maker',
  'personal-timetable-maker': 'daily-timetable-maker',
  'home-routine-planner': 'weekly-timetable-maker',
  'employee-work-timetable': 'work-shift-schedule-maker',
  'printable-timetable-maker': 'timetable-maker',
  'smart-timetable-generator': 'timetable-maker'
};

const languages = ['hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];

let errors = [];
let passedChecks = 0;

console.log('--- STARTING TIMETABLE REMEDIATION VERIFICATION ---');

// 1. Verify _redirects file
if (!fs.existsSync(redirectsFile)) {
  errors.push(`Missing _redirects file at ${redirectsFile}`);
} else {
  const redirectsContent = fs.readFileSync(redirectsFile, 'utf8');
  for (const [source, dest] of Object.entries(consolidatedMap)) {
    const regex = new RegExp(`\\/time-table-tools\\/${source}\\/?\\s+\\/time-table-tools\\/${dest}\\/\\s+301`);
    if (!regex.test(redirectsContent)) {
      errors.push(`_redirects missing rule for: /time-table-tools/${source} -> /time-table-tools/${dest}/`);
    } else {
      passedChecks++;
    }
  }
}

// 2. Verify English canonical routes exist and have content
for (const slug of retainedSlugs) {
  const pagePath = path.join(distClient, 'time-table-tools', slug, 'index.html');
  if (!fs.existsSync(pagePath)) {
    errors.push(`English canonical page missing: ${pagePath}`);
  } else {
    const content = fs.readFileSync(pagePath, 'utf8');
    // Ensure it does not have meta refresh (i.e. is not a redirect)
    if (content.includes('http-equiv="refresh"')) {
      errors.push(`English canonical page appears to be a redirect: ${slug}`);
    }
    // Check that none of the 17 consolidated slugs are linked
    for (const deprecatedSlug of Object.keys(consolidatedMap)) {
      if (content.includes(`/time-table-tools/${deprecatedSlug}/`)) {
        errors.push(`Canonical page ${slug} links to deprecated slug: ${deprecatedSlug}`);
      }
    }
    passedChecks++;
  }
}

// 3. Verify English redirected routes produce 301 redirect html
for (const [source, dest] of Object.entries(consolidatedMap)) {
  const pagePath = path.join(distClient, 'time-table-tools', source, 'index.html');
  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    if (!content.includes(`/time-table-tools/${dest}/`)) {
      errors.push(`English redirect page ${source} does not redirect to ${dest}`);
    } else {
      passedChecks++;
    }
  }
}

// 4. Verify Multilingual routes
for (const lang of languages) {
  // Check retained canonical pages exist
  for (const slug of retainedSlugs) {
    const pagePath = path.join(distClient, lang, 'time-table-tools', slug, 'index.html');
    if (!fs.existsSync(pagePath)) {
      errors.push(`Localized canonical page missing: ${lang}/${slug}`);
    } else {
      passedChecks++;
    }
  }

  // Check consolidated pages redirect to localized target
  for (const [source, dest] of Object.entries(consolidatedMap)) {
    const pagePath = path.join(distClient, lang, 'time-table-tools', source, 'index.html');
    if (!fs.existsSync(pagePath)) {
      errors.push(`Localized redirect page missing: ${lang}/${source}`);
    } else {
      const content = fs.readFileSync(pagePath, 'utf8');
      const expectedTarget = `/${lang}/time-table-tools/${dest}/`;
      if (!content.includes(expectedTarget)) {
        errors.push(`Localized redirect ${lang}/${source} does not point to ${expectedTarget}`);
      } else {
        passedChecks++;
      }
    }
  }
}

// 5. Verify sitemaps do not contain deprecated slugs
const sitemapFiles = fs.readdirSync(distClient).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
for (const sFile of sitemapFiles) {
  const sContent = fs.readFileSync(path.join(distClient, sFile), 'utf8');
  for (const deprecatedSlug of Object.keys(consolidatedMap)) {
    if (sContent.includes(`time-table-tools/${deprecatedSlug}`)) {
      errors.push(`Sitemap ${sFile} contains deprecated slug: ${deprecatedSlug}`);
    }
  }
}

// 6. Verify calculators.json count
const calculatorsData = JSON.parse(fs.readFileSync('src/data/calculators.json', 'utf8'));
const timetableTools = calculatorsData.filter(c => c.category === 'Time Table Tools');
if (timetableTools.length !== 9) {
  errors.push(`calculators.json contains ${timetableTools.length} timetable tools instead of 9!`);
} else {
  passedChecks++;
}

console.log(`Verification completed!`);
console.log(`Passed checks: ${passedChecks}`);
if (errors.length > 0) {
  console.error(`FAILED: Found ${errors.length} errors:`);
  errors.slice(0, 20).forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log(`ALL VERIFICATION CHECKS PASSED! Clean 301 redirects, no broken links, and sitemaps are completely clean.`);
}
