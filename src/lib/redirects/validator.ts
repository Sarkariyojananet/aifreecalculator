/**
 * Redirect Validation, Loop Prevention, and Chain Detection Engine
 */

import { calculators, categories } from '../../data/calculators';
import type { RedirectRule } from '../admin/content-store';
import type { RedirectChainWarning, RedirectLoopError } from './types';

// Standard static top-level routes
const STATIC_ROUTES = new Set([
  '/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/all-calculators/',
]);

/**
 * Normalizes a path string for redirect evaluation.
 */
export function normalizeRedirectPath(rawPath: string): string {
  if (!rawPath) return '/';
  let path = rawPath.trim();

  // If full URL on same domain, strip origin
  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const parsed = new URL(path);
      if (parsed.hostname === 'aifreecalculator.com' || parsed.hostname === 'www.aifreecalculator.com' || parsed.hostname === 'localhost') {
        path = parsed.pathname;
      } else {
        return path; // External redirect URL
      }
    }
  } catch {}

  // Ensure starts with /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Normalize duplicate slashes
  path = path.replace(/\/+/g, '/');

  // Strip query & hash
  const qIdx = path.indexOf('?');
  if (qIdx >= 0) path = path.slice(0, qIdx);
  const hIdx = path.indexOf('#');
  if (hIdx >= 0) path = path.slice(0, hIdx);

  // Maintain consistent trailing slash for paths without file extension
  if (!path.endsWith('/') && !path.includes('.')) {
    path = `${path}/`;
  }

  return path.toLowerCase();
}

/**
 * Validates whether an internal destination corresponds to an existing site page.
 */
export function isKnownSiteRoute(destination: string): { known: boolean; label?: string } {
  if (destination.startsWith('http://') || destination.startsWith('https://')) {
    return { known: true, label: 'External URL' };
  }

  const norm = normalizeRedirectPath(destination);

  // Check static pages
  if (STATIC_ROUTES.has(norm) || STATIC_ROUTES.has(norm.replace(/\/$/, '')) || STATIC_ROUTES.has(`${norm}/`)) {
    return { known: true, label: 'Standard Page' };
  }

  // Check category pages
  for (const cat of categories) {
    const catPath = `/${cat.name.toLowerCase()}/`;
    if (norm === catPath) {
      return { known: true, label: `${cat.name} Category` };
    }
  }

  // Check calculators
  for (const calc of calculators) {
    const calcPath = calc.path.endsWith('/') ? calc.path.toLowerCase() : `${calc.path.toLowerCase()}/`;
    if (norm === calcPath) {
      return { known: true, label: calc.name };
    }
  }

  return { known: false };
}

/**
 * Detects whether adding/updating a redirect rule creates a circular loop.
 * Supports arbitrary depth (A -> B -> C -> A).
 */
export function detectRedirectLoop(
  source: string,
  destination: string,
  existingRules: RedirectRule[],
  currentRuleId?: string
): RedirectLoopError | null {
  const normSource = normalizeRedirectPath(source);
  const normDest = normalizeRedirectPath(destination);

  // 1. Self-redirect loop
  if (normSource === normDest) {
    return {
      source: normSource,
      destination: normDest,
      cycle: [normSource, normDest],
    };
  }

  // Build adjacency graph of active rules
  const graph: Map<string, string> = new Map();
  for (const r of existingRules) {
    if (r.active !== false && r.id !== currentRuleId) {
      graph.set(normalizeRedirectPath(r.source), normalizeRedirectPath(r.destination));
    }
  }

  // Tentatively add the candidate rule
  graph.set(normSource, normDest);

  // Trace the path starting from normSource
  const visited: string[] = [];
  const visitedSet: Set<string> = new Set();
  let current: string | undefined = normSource;

  while (current && graph.has(current)) {
    if (visitedSet.has(current)) {
      // Loop found! Extract exact cycle
      const cycleStartIdx = visited.indexOf(current);
      const cycle = [...visited.slice(cycleStartIdx), current];
      return {
        source: normSource,
        destination: normDest,
        cycle,
      };
    }

    visited.push(current);
    visitedSet.add(current);
    current = graph.get(current);
  }

  return null;
}

/**
 * Audits a single candidate or all rules for redirect chains (e.g. A -> B -> C).
 */
export function detectRedirectChain(
  source: string,
  destination: string,
  existingRules: RedirectRule[],
  currentRuleId?: string
): RedirectChainWarning | null {
  const normSource = normalizeRedirectPath(source);
  const normDest = normalizeRedirectPath(destination);

  if (normDest.startsWith('http://') || normDest.startsWith('https://')) {
    return null; // External redirects cannot be further chained internally
  }

  const graph: Map<string, RedirectRule> = new Map();
  for (const r of existingRules) {
    if (r.active !== false && r.id !== currentRuleId) {
      graph.set(normalizeRedirectPath(r.source), r);
    }
  }

  // Does destination point to another redirect?
  let nextRule = graph.get(normDest);
  if (!nextRule) {
    return null;
  }

  const steps = [
    { from: normSource, to: normDest, statusCode: 301 },
    { from: normDest, to: normalizeRedirectPath(nextRule.destination), statusCode: nextRule.statusCode || 301 },
  ];

  let current = normalizeRedirectPath(nextRule.destination);
  const visited = new Set([normSource, normDest]);

  while (graph.has(current) && !visited.has(current)) {
    visited.add(current);
    const stepRule = graph.get(current)!;
    const nextHop = normalizeRedirectPath(stepRule.destination);
    steps.push({ from: current, to: nextHop, statusCode: stepRule.statusCode || 301 });
    current = nextHop;
  }

  const finalDestination = steps[steps.length - 1].to;

  return {
    source: normSource,
    currentDestination: normDest,
    finalDestination,
    steps,
    hopCount: steps.length,
    recommendedAction: `Update source redirect directly to "${finalDestination}" to eliminate ${steps.length - 1} extra hop(s).`,
  };
}

/**
 * Audits the entire set of active redirect rules for any chains or loops.
 */
export function auditAllRedirectRules(rules: RedirectRule[]): {
  chains: RedirectChainWarning[];
  loops: RedirectLoopError[];
} {
  const chains: RedirectChainWarning[] = [];
  const loops: RedirectLoopError[] = [];

  for (const rule of rules) {
    if (rule.active === false) continue;

    const chain = detectRedirectChain(rule.source, rule.destination, rules, rule.id);
    if (chain) {
      chains.push(chain);
    }

    const loop = detectRedirectLoop(rule.source, rule.destination, rules, rule.id);
    if (loop && !loops.some((l) => l.cycle.join('->') === loop.cycle.join('->'))) {
      loops.push(loop);
    }
  }

  return { chains, loops };
}
