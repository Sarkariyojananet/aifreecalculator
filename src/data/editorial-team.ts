export interface EditorialMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  location: string;
  role: string;
  categories: string[];
  bio: string;
  verifiedStandards: string[];
  sameAs: string[];
}

export const FOUNDER_PROFILE: EditorialMember = {
  id: 'sachin-jangra',
  name: 'Sachin Jangra',
  title: 'Founder, Sole Owner & Lead Developer',
  credentials: 'B.Sc. (Computer Science), CRM Jat College, Hisar',
  location: 'Hisar (125121), Haryana, India',
  role: 'Solely designs, develops, and maintains all mathematical, financial, construction, health, and browser-based utility tools on AI Free Calculator.',
  categories: [
    'construction',
    'finance',
    'health',
    'math',
    'general',
    'compiler-tools',
    'image-tools',
    'pdf-tools',
    'time-table-tools',
    'free-online-tools'
  ],
  bio: 'Sachin Jangra is the founder, sole owner, and developer of AI Free Calculator. A B.Sc. Computer Science graduate from CRM Jat College, Hisar (PIN 125121), Haryana, India, he builds fast, privacy-first, client-side calculation engines and utility tools that run directly in the browser without uploading user files or personal data.',
  verifiedStandards: [
    'IEEE 754 Floating-Point Precision',
    'Standard Financial & Banking Formulas',
    'IS 456 & Quantity Surveying Ratios',
    'WHO Biometric Classifications',
    'W3C Web Cryptography API'
  ],
  sameAs: [
    'https://www.facebook.com/sachin.jangra.56',
    'https://www.instagram.com/sachin.jangra.56'
  ]
};

export const EDITORIAL_TEAM: Record<string, EditorialMember> = {
  default: FOUNDER_PROFILE
};

/**
 * Resolves the authoritative reviewer/maintainer for any tool category
 */
export function getReviewerForCategory(_category: string): EditorialMember {
  return FOUNDER_PROFILE;
}

/**
 * Returns the sole owner and maintainer profile
 */
export function getAllEditorialMembers(): EditorialMember[] {
  return [FOUNDER_PROFILE];
}
