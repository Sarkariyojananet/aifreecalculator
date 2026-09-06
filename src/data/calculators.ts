import rawCalculators from './calculators.json';

export type CalculatorCategory =
  | 'General'
  | 'Construction'
  | 'Finance'
  | 'Health'
  | 'Math';

export interface Calculator {
  slug: string;
  name: string;
  category: CalculatorCategory;
  description: string;
  icon: string;
  keywords: string[];
  tags: string[];
  featured: boolean;
  isPopular?: boolean;
  aliases?: string[];
  path: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

// Built-in aliases for smart search matching (e.g. Hindi/Common terminology & alternative names)
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
  'swp-calculator': ['swp calculator', 'systematic withdrawal plan', 'swp with inflation', 'mutual fund swp', 'sbi swp calculator', 'swp planner', 'monthly withdrawal'],
  'xirr-calculator': ['xirr calculator', 'extended internal rate of return', 'sip xirr', 'mutual fund xirr', 'annualized return', 'irregular cash flow return', 'cagr vs xirr'],
  'ppf-calculator': ['ppf calculator', 'public provident fund', 'ppf interest', 'ppf maturity', 'ppf account', 'ppf scheme', 'ppf return', 'ppf 15 years', 'ppf tax free'],
  'income-tax-calculator': ['tax calculator', 'new tax regime', 'old tax regime', 'itr calculator', 'income tax india', 'salary tax'],
  'gratuity-calculator': ['gratuity calc', 'gratuity act 1972', 'gratuity calculation', 'retirement gratuity', 'service gratuity', 'gratuity rules', 'gratuity formula'],
  'gst-calculator': ['gst tax', 'gst add remove', 'reverse gst', 'cgst sgst igst', 'gst 18%'],
  'bmi-calculator': ['body mass index', 'weight height ratio', 'healthy weight', 'obesity calculator', 'fat check'],
  'age-calculator': ['exact age', 'date of birth calculator', 'dob calculator', 'birthday count', 'umra calculator'],
  'percentage-calculator': ['percent calc', 'marks percentage', 'discount percent', 'cgpa to percentage', 'pratishat'],
  'simple-interest-calculator': ['si calculator', 'sadharan byaj', 'interest rate calculation'],
  'compound-interest-calculator': ['ci calculator', 'chakravriddhi byaj', 'compounding calculator', 'annual interest'],
  'calorie-calculator': ['tdee calculator', 'daily calories', 'calorie intake', 'weight loss calories'],
  'bmr-calculator': ['basal metabolic rate', 'resting metabolism', 'mifflin st jeor'],
  'volume-calculator': ['volume calculator', 'tank volume', 'cylinder volume', 'pipe volume', 'pool volume', 'sphere volume', 'cone volume', 'prostate volume', 'water capacity', 'liters calculator', 'gallons to liters'],
};

export const calculators: Calculator[] = (rawCalculators as Calculator[]).map((c) => {
  const aliases = CALCULATOR_ALIASES[c.slug] || [];
  return {
    ...c,
    aliases,
    isPopular: Boolean(c.tags?.includes('Popular') || c.featured),
  };
});

export const categories: { name: CalculatorCategory; icon: string; description: string; path: string }[] = [
  {
    name: 'General',
    icon: '⚙️',
    description: 'Essential everyday calculators for age, date differences, percentage, time and unit conversions.',
    path: '/general/',
  },
  {
    name: 'Construction',
    icon: '🏗️',
    description: 'Civil engineering tools for RCC slabs, steel BBS, concrete mix design, brickwork, plaster, and BOQ estimates.',
    path: '/construction/',
  },
  {
    name: 'Finance',
    icon: '💰',
    description: 'Smart financial tools for loan EMI, SIP returns, Indian income tax slabs, GST, salary, and retirement.',
    path: '/finance/',
  },
  {
    name: 'Health',
    icon: '❤️',
    description: 'Health & fitness calculators for BMI, daily calories, BMR, and body fat percentage.',
    path: '/health/',
  },
  {
    name: 'Math',
    icon: '📐',
    description: 'Academic and scientific tools for GPA, standard deviation, fractions, scientific math, and RNG.',
    path: '/math/',
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find(
    (c) => c.slug === slug || c.slug === `${slug}-calculator` || c.slug.replace('-calculator', '') === slug.replace('-calculator', '')
  );
}

export function getCalculatorsByCategory(category: CalculatorCategory): Calculator[] {
  return calculators.filter((c) => c.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedCalculators(): Calculator[] {
  return calculators.filter((c) => c.featured);
}

export function getPopularCalculators(limit: number = 6): Calculator[] {
  // Ordered priority of high-value tools for user discovery
  const prioritySlugs = [
    'emi-calculator',
    'sip-calculator',
    'rcc-slab-steel-calculator',
    'income-tax-calculator',
    'bmi-calculator',
    'age-calculator',
    'percentage-calculator',
    'steel-weight-calculator',
  ];

  const matched: Calculator[] = [];
  for (const slug of prioritySlugs) {
    const calc = getCalculatorBySlug(slug);
    if (calc && !matched.some((m) => m.slug === calc.slug)) {
      matched.push(calc);
    }
  }

  if (matched.length < limit) {
    const others = calculators.filter((c) => c.isPopular && !matched.some((m) => m.slug === c.slug));
    matched.push(...others.slice(0, limit - matched.length));
  }

  return matched.slice(0, limit);
}

export function getConstructionSpotlightCalculators(limit: number = 8): Calculator[] {
  const constructionPriority = [
    'rcc-slab-steel-calculator',
    'rcc-beam-steel-calculator',
    'rcc-column-steel-calculator',
    'rcc-footing-steel-calculator',
    'steel-weight-calculator',
    'concrete-material-breakup-calculator',
    'brickwork-calculator',
    'plaster-calculator',
  ];

  const matched: Calculator[] = [];
  for (const slug of constructionPriority) {
    const calc = getCalculatorBySlug(slug);
    if (calc && !matched.some((m) => m.slug === calc.slug)) {
      matched.push(calc);
    }
  }

  if (matched.length < limit) {
    const others = calculators.filter((c) => c.category === 'Construction' && !matched.some((m) => m.slug === c.slug));
    matched.push(...others.slice(0, limit - matched.length));
  }

  return matched.slice(0, limit);
}

export function searchCalculators(query: string): Calculator[] {
  const q = query.toLowerCase().trim();
  if (!q) return calculators;
  return calculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q)) ||
      (c.aliases && c.aliases.some((a) => a.toLowerCase().includes(q)))
  );
}
