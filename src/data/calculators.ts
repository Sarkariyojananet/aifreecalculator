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
  additionalCategories?: CalculatorCategory[];
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
  'emi-calculator': ['loan emi', 'home loan emi', 'car loan emi', 'personal loan calculator', 'personal loan emi', 'personal loan', 'kist calculator', 'monthly payment', 'installment calculator'],
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
  'credit-card-payoff-calculator': ['credit card payoff', 'credit card debt', 'debt snowball', 'pay off credit card', 'credit card interest', 'minimum payment calculator'],
  'land-area-converter': ['land area converter', 'bigha to sq ft', 'gaj to sq ft', 'bigha in acre', 'guntha to sq ft', 'jameen napne ka calculator', 'cent to sq ft', 'plot size converter', 'biswa to sq ft'],
  'sukanya-samriddhi-yojana-calculator': [
    'ssy calculator',
    'sukanya samriddhi yojana calculator',
    'sbi sukanya samriddhi yojana calculator',
    'post office sukanya samriddhi yojana calculator',
    'sukanya samriddhi yojana calculator sbi',
    'sukanya samriddhi yojana calculator post office',
    'sukanya samriddhi',
    'sukanya yojana',
    'ssy maturity',
    'ssy interest 8.2',
    'post office ssy',
    'beti bachao beti padhao yojana'
  ],
  'epf-calculator': ['epf calculator', 'pf calculator', 'provident fund calculator', 'epfo interest', 'pf balance', 'epf corpus', 'vpf calculator'],
  'rd-calculator': ['rd calculator', 'recurring deposit', 'post office rd', 'sbi rd', 'quarterly compounding rd', 'bank rd interest'],
  'macro-calculator': ['macro calculator', 'iifym calculator', 'protein calculator', 'macronutrient calculator', 'keto macros', 'bodybuilding macros', 'macros for fat loss'],
  'map-calculator': ['map calculator', 'map calculator bp', 'bp map calculator', 'map calculator nursing', 'mean arterial pressure', 'arterial pressure', 'map bp', 'blood pressure map', 'icu map', 'perfusion pressure'],
  'margin-calculator': [
    'margin calculator',
    'profit margin',
    'profit margin calculator',
    'gross margin',
    'gross margin calculator',
    'gross profit',
    'gross profit calculator',
    'sales margin',
    'sales margin calculator',
    'markup vs margin',
    'margin vs markup',
    'profit calculator',
    'cogs calculator',
    'selling price calculator',
    'labh margin',
    'margin formula'
  ],
  'annual-income-calculator': [
    'annual income calculator',
    'yearly income calculator',
    'annual salary calculator',
    'yearly salary calculator',
    'hourly to salary',
    'hourly to annual',
    'salary to hourly',
    'varshik aay calculator',
    'wage to salary',
    'gross annual income',
    'net annual income',
    'take home pay',
    'income calculator'
  ],
  'exponential-form-calculator': [
    'exponential form',
    'exponential form calculator',
    'log to exponential',
    'exponential to log',
    'prime factorization exponential form',
    'exponential notation',
    'ghat roop',
    'ghatiya roop',
    'prime factors exponents',
    'base and exponent calculator'
  ],
  'exponential-function-calculator': [
    'exponential function calculator',
    'exponential function solver',
    'exponential function from two points',
    'solve exponential function',
    'exponential equation calculator',
    'exponential function formula',
    'evaluate exponential function',
    'exponential growth calculator',
    'exponential decay calculator',
    'ghatiya falan calculator',
    'falan calculator',
    'two point exponential',
    'find exponential equation from two points'
  ],
  'exponential-growth-calculator': [
    'exponential growth calculator',
    'exponential decay calculator',
    'growth rate calculator',
    'exponential growth formula',
    'exponential decay formula',
    'ghatiya vriddhi calculator',
    'ghatiya kshay calculator',
    'doubling time calculator',
    'half life calculator',
    'continuous growth calculator',
    'population growth calculator'
  ],
  'right-triangle-area-calculator': [
    'right triangle area calculator',
    'area of a right triangle',
    'right triangle calculator',
    'right angled triangle area',
    'samkon tribhuj ka kshetrafal',
    'right triangle area formula',
    'hypotenuse area calculator',
    '45 45 90 triangle area',
    'pythagorean triangle area',
    'triangle area with legs'
  ],
  'volume-of-a-cylinder-calculator': [
    'volume of a cylinder calculator',
    'cylinder volume calculator',
    'cylinder volume',
    'calculate cylinder volume',
    'cylinder volume formula',
    'volume of a cylinder',
    'hollow cylinder calculator',
    'cylindrical shell volume',
    'pipe volume calculator',
    'belan ka aayatan',
    'cylinder volume from diameter',
    'cylinder volume from radius and height',
    'find cylinder height from volume',
    'find cylinder radius from volume',
    'oblique cylinder volume'
  ],
  'slope-calculator': [
    'slope calculator',
    'slope percentage calculator',
    'roof slope calculator',
    'roof pitch calculator',
    'wheelchair ramp slope calculator',
    'ramp slope calculator',
    'rise over run calculator',
    'dhalan calculator',
    'pitch to angle calculator',
    'slope angle calculator',
    'slope percentage to degrees',
    'degrees to slope percentage',
    'rafter length calculator',
    'calculate ramp length',
    'grade percentage calculator'
  ],
  'fuel-cost-calculator': [
    'fuel cost calculator',
    'fuel cost calculator india',
    'fuel cost calculator km india',
    'trip fuel cost calculator india',
    'fuel cost calculator uk',
    'journey fuel cost calculator',
    'petrol cost calculator',
    'diesel cost calculator',
    'fuel cost per km',
    'fuel cost per mile',
    'trip fuel cost',
    'journey fuel cost',
    'car fuel cost calculator',
    'road trip fuel cost calculator',
    'fuel consumption calculator',
    'petrol kharch calculator',
    'diesel kharcha',
    'fuel budget calculator'
  ]
};

export const calculators: Calculator[] = (rawCalculators as Calculator[])
  .filter((c, index, self) => index === self.findIndex((t) => t.slug === c.slug))
  .map((c) => {
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

// Cold-start O(1) Index Maps and Precomputed Lists
const calculatorBySlugMap = new Map<string, Calculator>();
for (const c of calculators) {
  calculatorBySlugMap.set(c.slug, c);
  const withoutSuffix = c.slug.replace('-calculator', '');
  if (!calculatorBySlugMap.has(withoutSuffix)) {
    calculatorBySlugMap.set(withoutSuffix, c);
  }
  if (!c.slug.endsWith('-calculator')) {
    calculatorBySlugMap.set(`${c.slug}-calculator`, c);
  }
}

const calculatorsByCategoryMap = new Map<string, Calculator[]>();
for (const cat of categories) {
  const catLower = cat.name.toLowerCase();
  const list = calculators.filter(
    (c) =>
      c.category.toLowerCase() === catLower ||
      (c.additionalCategories && c.additionalCategories.some((ac) => ac.toLowerCase() === catLower))
  );
  calculatorsByCategoryMap.set(catLower, list);
}

const featuredCalculatorsList = calculators.filter((c) => c.featured);

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  if (!slug) return undefined;
  const match = calculatorBySlugMap.get(slug);
  if (match) return match;
  return calculatorBySlugMap.get(slug.replace('-calculator', ''));
}

export function getCalculatorsByCategory(category: CalculatorCategory): Calculator[] {
  return calculatorsByCategoryMap.get(category.toLowerCase()) || [];
}

export function getFeaturedCalculators(): Calculator[] {
  return featuredCalculatorsList;
}

// Precomputed Popular Calculators List
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

const precomputedPopularCalculators: Calculator[] = [];
for (const slug of prioritySlugs) {
  const calc = getCalculatorBySlug(slug);
  if (calc && !precomputedPopularCalculators.some((m) => m.slug === calc.slug)) {
    precomputedPopularCalculators.push(calc);
  }
}
const extraPopular = calculators.filter((c) => c.isPopular && !precomputedPopularCalculators.some((m) => m.slug === c.slug));
precomputedPopularCalculators.push(...extraPopular);

export function getPopularCalculators(limit: number = 6): Calculator[] {
  return precomputedPopularCalculators.slice(0, limit);
}

// Precomputed Construction Spotlight Calculators List
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

const precomputedConstructionSpotlight: Calculator[] = [];
for (const slug of constructionPriority) {
  const calc = getCalculatorBySlug(slug);
  if (calc && !precomputedConstructionSpotlight.some((m) => m.slug === calc.slug)) {
    precomputedConstructionSpotlight.push(calc);
  }
}
const extraConstruction = calculators.filter((c) => c.category === 'Construction' && !precomputedConstructionSpotlight.some((m) => m.slug === c.slug));
precomputedConstructionSpotlight.push(...extraConstruction);

export function getConstructionSpotlightCalculators(limit: number = 8): Calculator[] {
  return precomputedConstructionSpotlight.slice(0, limit);
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

// Precomputed Homepage Category Pills with Live Counts (Zero per-request overhead)
const preferredCategoryOrder = ['Finance', 'Construction', 'Health', 'Math', 'General'];
export const PRECOMPUTED_CATEGORY_PILLS = [...categories]
  .sort((a, b) => {
    const idxA = preferredCategoryOrder.indexOf(a.name);
    const idxB = preferredCategoryOrder.indexOf(b.name);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  })
  .map((cat) => ({
    name: cat.name,
    path: cat.path,
    count: calculatorsByCategoryMap.get(cat.name.toLowerCase())?.length || 0,
  }));

// Precomputed Focused 8 Popular Calculators for Homepage
const homePopularSlugs = [
  'emi-calculator',
  'sip-calculator',
  'income-tax-calculator',
  'rcc-slab-steel-calculator',
  'bmi-calculator',
  'age-calculator',
  'percentage-calculator',
  'calorie-calculator',
];
export const PRECOMPUTED_HOME_POPULAR_CALCULATORS = homePopularSlugs
  .map((slug) => getCalculatorBySlug(slug))
  .filter(Boolean) as Calculator[];

// Pre-serialized client-side search dataset for instant zero-CPU inline delivery
export const STATIC_SEARCH_DATA_JSON = JSON.stringify(
  calculators.map((c) => ({
    name: c.name,
    category: c.category,
    desc: c.description,
    path: c.path,
    slug: c.slug,
    keywords: c.keywords || [],
    aliases: c.aliases || [],
  }))
);
