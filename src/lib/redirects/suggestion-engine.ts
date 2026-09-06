/**
 * Smart Redirect Suggestion Engine
 * Rule-based destination recommendation system matching 404 paths to existing site routes.
 * 
 * CRITICAL RULE: Every suggestion requires admin approval. Suggestions NEVER auto-redirect.
 */

import { calculators, categories, type Calculator } from '../../data/calculators';
import type { SmartSuggestion } from './types';

// Built-in aliases for smart search matching
const CALCULATOR_ALIASES: Record<string, string[]> = {
  'rcc-slab-steel-calculator': ['slab steel', 'rcc slab', 'sariya calculator', 'sariya weight', 'rebar calculator', 'steel quantity', 'bar bending schedule', 'bbs slab'],
  'rcc-beam-steel-calculator': ['beam steel', 'rcc beam', 'beam sariya', 'beam stirrups', 'rings calculator', 'beam rebar'],
  'rcc-column-steel-calculator': ['column steel', 'column sariya', 'pillar steel', 'pillar sariya', 'column ties', 'column rebar'],
  'rcc-footing-steel-calculator': ['footing steel', 'foundation steel', 'footing mesh', 'mat rebar', 'foundation sariya'],
  'steel-weight-calculator': ['sariya weight', 'd2/162', 'tmt bar weight', 'steel rod weight', 'steel kg per meter', 'rebar weight'],
  'concrete-material-breakup-calculator': ['concrete ratio', 'cement sand aggregate', 'm20 concrete', 'm25 mix', 'concrete bags', 'mortar mix', '1.54 multiplier'],
  'brickwork-calculator': ['brick calculator', 'number of bricks', 'eent calculator', 'wall bricks', 'masonry estimator'],
  'plaster-calculator': ['plaster cement sand', 'plaster ratio', 'plastering estimator', 'wall plaster'],
  'emi-calculator': ['loan emi', 'home loan emi', 'car loan emi', 'kist calculator', 'monthly payment', 'installment calculator'],
  'sip-calculator': ['mutual fund sip', 'sip returns', 'step up sip', 'wealth calculator', 'crorepati calculator'],
  'income-tax-calculator': ['tax calculator', 'new tax regime', 'old tax regime', 'itr calculator', 'income tax india', 'salary tax'],
  'gst-calculator': ['gst tax', 'gst add remove', 'reverse gst', 'cgst sgst igst', 'gst 18%'],
  'bmi-calculator': ['body mass index', 'weight height ratio', 'healthy weight', 'obesity calculator', 'fat check'],
  'age-calculator': ['exact age', 'date of birth calculator', 'dob calculator', 'birthday count', 'umra calculator'],
  'percentage-calculator': ['percent calc', 'marks percentage', 'discount percent', 'cgpa to percentage', 'pratishat'],
  'simple-interest-calculator': ['si calculator', 'sadharan byaj', 'interest rate calculation'],
  'compound-interest-calculator': ['ci calculator', 'chakravriddhi byaj', 'compounding calculator', 'annual interest'],
};

// Common non-discriminating stop words
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'free', 'online', 'tool', 'tools', 'best', 'top', 'simple', 'easy', 'new', 'old'
]);

/**
 * Normalizes and extracts meaningful keyword tokens from a URL path.
 */
function tokenizePath(path: string): string[] {
  return path
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

/**
 * Computes Levenshtein edit distance between two strings.
 */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row: number[] = [];
  for (let i = 0; i <= b.length; i++) row[i] = i;

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      let val: number;
      if (a[i - 1] === b[j - 1]) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }
  return row[b.length];
}

/**
 * Generates a rule-based smart redirect suggestion for a given 404 path.
 */
export function findSmartRedirectSuggestion(rawPath: string): SmartSuggestion | null {
  if (!rawPath) return null;

  const normalized = rawPath.toLowerCase().trim().replace(/\/+/g, '/');
  const tokens = tokenizePath(normalized);

  if (tokens.length === 0) return null;

  // 1. Check direct category page requests (e.g. /finance-calculators, /financial, /maths)
  for (const cat of categories) {
    const catNameLower = cat.name.toLowerCase();
    const catSlug = catNameLower;
    if (
      normalized === `/${catSlug}` ||
      normalized === `/${catSlug}/` ||
      tokens.includes(catSlug) ||
      tokens.includes(`${catSlug}s`)
    ) {
      if (tokens.length === 1 || (tokens.length === 2 && tokens.includes('calculator'))) {
        return {
          destination: `/${catSlug}/`,
          title: `${cat.name} Calculators`,
          category: cat.name,
          confidence: 95,
          reason: `Exact category match for "${cat.name}".`,
        };
      }
    }
  }

  // 2. Evaluate all registered calculators
  interface CandidateMatch {
    calc: Calculator;
    score: number;
    reason: string;
  }

  const candidates: CandidateMatch[] = [];

  for (const calc of calculators) {
    let score = 0;
    const reasons: string[] = [];

    const calcSlug = calc.slug.toLowerCase();
    const calcCleanSlug = calcSlug.replace(/-calculator$/, '');
    const calcCategoryLower = calc.category.toLowerCase();
    const calcTokens = tokenizePath(`${calc.name} ${calc.slug}`);

    // A. Check if the 404 path contains the exact slug
    if (normalized.includes(calcSlug)) {
      score += 85;
      reasons.push('exact slug match');
    } else if (normalized.includes(calcCleanSlug)) {
      score += 75;
      reasons.push('base slug match');
    }

    // B. Check category containment
    if (normalized.startsWith(`/${calcCategoryLower}/`) || tokens.includes(calcCategoryLower)) {
      score += 10;
      reasons.push('category alignment');
    }

    // C. Check Aliases (Hindi/popular terms)
    const aliases = CALCULATOR_ALIASES[calc.slug] || [];
    for (const alias of aliases) {
      const aliasNormalized = alias.toLowerCase();
      if (normalized.includes(aliasNormalized.replace(/\s+/g, '-')) || normalized.includes(aliasNormalized.replace(/\s+/g, ''))) {
        score += 40;
        reasons.push(`matches alias "${alias}"`);
        break;
      }
    }

    // D. Token Overlap (Jaccard-like score)
    let matchingTokens = 0;
    for (const t of tokens) {
      if (t === 'calculator') continue; // generic token
      if (calcTokens.includes(t)) {
        matchingTokens++;
      } else if (calc.keywords.some((kw) => kw.toLowerCase().includes(t))) {
        matchingTokens += 0.5;
      }
    }

    if (matchingTokens > 0) {
      const tokenScore = Math.min(35, matchingTokens * 15);
      score += tokenScore;
      reasons.push(`${matchingTokens} matching keyword(s)`);
    }

    // E. Levenshtein distance on primary slug
    const pathSlugPart = tokens.filter((t) => t !== calcCategoryLower).join('-');
    if (pathSlugPart) {
      const dist = levenshtein(pathSlugPart, calcCleanSlug);
      const maxLen = Math.max(pathSlugPart.length, calcCleanSlug.length);
      const similarity = 1 - dist / maxLen;
      if (similarity > 0.75) {
        score += Math.round(similarity * 25);
        reasons.push(`high slug similarity (${Math.round(similarity * 100)}%)`);
      }
    }

    if (score >= 40) {
      candidates.push({
        calc,
        score: Math.min(98, score), // cap below 100% to ensure admin review
        reason: reasons.join(', '),
      });
    }
  }

  // Sort candidates by score descending
  candidates.sort((a, b) => b.score - a.score);

  if (candidates.length === 0 || candidates[0].score < 45) {
    return null; // No Safe Suggestion
  }

  const best = candidates[0];
  return {
    destination: best.calc.path.endsWith('/') ? best.calc.path : `${best.calc.path}/`,
    title: best.calc.name,
    category: best.calc.category,
    confidence: best.score,
    reason: `Confidence ${best.score}%: ${best.reason.charAt(0).toUpperCase() + best.reason.slice(1)}.`,
  };
}
