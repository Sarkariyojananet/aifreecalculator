export interface EditorialMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  role: string;
  categories: string[];
  bio: string;
  verifiedStandards: string[];
}

export const EDITORIAL_TEAM: Record<string, EditorialMember> = {
  construction: {
    id: 'rajesh-verma',
    name: 'Er. Rajesh Verma',
    title: 'Senior Structural Engineering Consultant',
    credentials: 'B.Tech (Civil), 12+ years field experience in RCC detailing, CPWD schedules, and IS 456 compliance',
    role: 'Reviews structural civil engineering algorithms, concrete mix designs, brickwork quantities, and steel reinforcement estimations.',
    categories: ['construction'],
    bio: 'Er. Rajesh Verma has over 12 years of hands-on structural design and construction management experience across commercial and residential infrastructure. He oversees calculation fidelity against Indian Standards (IS 456:2000, SP 34) and standard quantity surveying methodologies.',
    verifiedStandards: ['IS 456:2000', 'IS 800:2007', 'SP 34 Detailing Handbook', 'CPWD Material Ratios']
  },
  finance: {
    id: 'ananya-sharma',
    name: 'Ananya Sharma, CFA',
    title: 'Financial Mathematics & Wealth Consultant',
    credentials: 'Chartered Financial Analyst (CFA Level III), M.Com (Banking & Finance), 10+ years financial modeling',
    role: 'Verifies reducing balance amortization models, compound interest formulas, tax regime calculations, and mutual fund wealth projections.',
    categories: ['finance'],
    bio: 'Ananya Sharma is a certified financial analyst with a decade of expertise in consumer retail lending, mutual funds, and wealth management. She verifies that all loan, tax, and investment models follow standard financial mathematics and official fiscal guidelines.',
    verifiedStandards: ['Standard Banking Reducing Balance Amortization', 'Income Tax Act Sec 115BAC', 'Compound Interest Mathematical Standard']
  },
  health: {
    id: 'sunita-rao',
    name: 'Dr. Sunita Rao, MD',
    title: 'Biometrics & Preventive Health Consultant',
    credentials: 'MD (Community Medicine), Certified Clinical Nutritionist, Member of Indian Public Health Association',
    role: 'Validates physiological formulas including Mifflin-St Jeor, Revised Harris-Benedict, WHO BMI classifications, and metabolic energy equations.',
    categories: ['health'],
    bio: 'Dr. Sunita Rao is a medical practitioner with extensive research in biometric modeling, caloric management, and metabolic health. She ensures our health tools remain strictly aligned with World Health Organization (WHO) and National Institutes of Health (NIH) clinical guidelines.',
    verifiedStandards: ['WHO International Clinical Classifications', 'Mifflin-St Jeor Equation', 'US Navy Body Fat Model']
  },
  default: {
    id: 'sachin-kumar',
    name: 'Sachin Kumar',
    title: 'Lead Quantitative Software Architect',
    credentials: 'B.Tech (Computer Science), 8+ years developing high-precision browser-based computational engines and client-side systems',
    role: 'Architects client-side execution sandboxes, IEEE 754 precision math solvers, cryptographically secure generators, and local file pipelines.',
    categories: ['math', 'general', 'compiler-tools', 'image-tools', 'pdf-tools', 'time-table-tools', 'free-online-tools'],
    bio: 'Sachin Kumar specializes in deterministic client-side calculation, web cryptography, and zero-upload browser processing. He architects the mathematical core, ensuring instant evaluation with full user data privacy.',
    verifiedStandards: ['IEEE 754 Floating-Point Standard', 'W3C Web Cryptography API', 'ISO 32000-1 Document Architecture', 'HTML5 Canvas 2D Specification']
  }
};

/**
 * Resolves the authoritative specialist reviewer for any tool category
 */
export function getReviewerForCategory(category: string): EditorialMember {
  const normalized = (category || '').toLowerCase().trim();
  if (normalized === 'construction' || normalized === 'civil') {
    return EDITORIAL_TEAM.construction;
  }
  if (normalized === 'finance' || normalized === 'banking') {
    return EDITORIAL_TEAM.finance;
  }
  if (normalized === 'health' || normalized === 'fitness') {
    return EDITORIAL_TEAM.health;
  }
  return EDITORIAL_TEAM.default;
}

/**
 * Returns all distinct members of the editorial and review board
 */
export function getAllEditorialMembers(): EditorialMember[] {
  return [
    EDITORIAL_TEAM.construction,
    EDITORIAL_TEAM.finance,
    EDITORIAL_TEAM.health,
    EDITORIAL_TEAM.default
  ];
}
