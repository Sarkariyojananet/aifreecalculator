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
  path: string;
}

export const calculators: Calculator[] = rawCalculators as Calculator[];

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

export function searchCalculators(query: string): Calculator[] {
  const q = query.toLowerCase().trim();
  if (!q) return calculators;
  return calculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q))
  );
}