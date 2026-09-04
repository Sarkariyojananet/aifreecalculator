import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outputDir = path.resolve(process.cwd(), 'public', 'og');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  {
    filename: 'default.png',
    badge: '⚡ 42+ ACCURATE ONLINE ENGINES',
    badgeColor: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'rgba(56, 189, 248, 0.3)',
    title: 'AI Free Calculator',
    subtitle: 'Free Online Engineering, Financial, Health & Scientific Calculation Tools',
    glowColor1: '#2563eb',
    glowColor2: '#38bdf8',
    highlights: ['Civil Construction', 'Loans & Tax Slabs', 'Health & BMI', 'Scientific Math'],
  },
  {
    filename: 'finance.png',
    badge: '💰 FINANCIAL & INVESTMENT SUITE',
    badgeColor: '#34d399',
    badgeBg: 'rgba(52, 211, 153, 0.12)',
    badgeBorder: 'rgba(52, 211, 153, 0.3)',
    title: 'Finance, Loan & Tax Calculators',
    subtitle: 'Accurate EMI, SIP, Indian Income Tax (New vs Old), GST, Salary & Retirement Tools',
    glowColor1: '#059669',
    glowColor2: '#10b981',
    highlights: ['Exact EMI & Amortization', 'SIP Wealth Growth', 'FY 2025-26 Tax Slabs', '100% Free'],
  },
  {
    filename: 'construction.png',
    badge: '🏗️ CIVIL ENGINEERING & BOQ SUITE',
    badgeColor: '#fbbf24',
    badgeBg: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'rgba(251, 191, 36, 0.3)',
    title: 'Civil Construction Calculators',
    subtitle: 'RCC Slab/Beam/Column Steel, Concrete Mix (M20/M25), Brickwork & Plaster Estimators',
    glowColor1: '#d97706',
    glowColor2: '#f59e0b',
    highlights: ['IS 456 Standards', 'Steel BBS & D²/162', 'Dry Volume 1.54 Factor', 'Material BOQ'],
  },
  {
    filename: 'health.png',
    badge: '❤️ HEALTH & FITNESS METRICS',
    badgeColor: '#fb7185',
    badgeBg: 'rgba(251, 113, 133, 0.12)',
    badgeBorder: 'rgba(251, 113, 133, 0.3)',
    title: 'Health & Fitness Calculators',
    subtitle: 'WHO-Standard BMI, BMR, Daily Calorie Deficit, Body Fat & Health Calculators',
    glowColor1: '#e11d48',
    glowColor2: '#f43f5e',
    highlights: ['WHO Body Mass Index', 'Mifflin-St Jeor BMR', 'Calorie & Macro Deficit', 'Instant Results'],
  },
  {
    filename: 'math.png',
    badge: '📐 MATHEMATICS & SCIENCE',
    badgeColor: '#a78bfa',
    badgeBg: 'rgba(167, 139, 250, 0.12)',
    badgeBorder: 'rgba(167, 139, 250, 0.3)',
    title: 'Math & Scientific Calculators',
    subtitle: 'Precision Scientific Computing, Fraction Operations, GPA & Statistical Generators',
    glowColor1: '#7c3aed',
    glowColor2: '#8b5cf6',
    highlights: ['Fraction Step-by-Step', 'GPA Semester Scoring', 'Trigonometric & Logs', 'Random Generators'],
  },
  {
    filename: 'general.png',
    badge: '⏱️ DAILY UTILITIES & TOOLS',
    badgeColor: '#60a5fa',
    badgeBg: 'rgba(96, 165, 250, 0.12)',
    badgeBorder: 'rgba(96, 165, 250, 0.3)',
    title: 'Everyday Utility Calculators',
    subtitle: 'Instant Age & DOB, Date Differences, Percentage, Time Durations & Height Conversions',
    glowColor1: '#2563eb',
    glowColor2: '#60a5fa',
    highlights: ['Exact Age to Seconds', 'Date Interval Counter', 'Percentage Growth/Cut', 'Zero Sign-up'],
  },
];

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSvg(item) {
  const highlightsSvg = item.highlights
    .map((text, i) => {
      const x = 90 + i * 260;
      return `
        <g transform="translate(${x}, 475)">
          <rect width="240" height="46" rx="10" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.2"/>
          <circle cx="24" cy="23" r="5" fill="${item.badgeColor}"/>
          <text x="38" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#e2e8f0">${escapeXml(text)}</text>
        </g>
      `;
    })
    .join('');

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="60%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#080c14" />
    </linearGradient>

    <!-- Radial Glow 1 (Top Right) -->
    <radialGradient id="glowTop" cx="85%" cy="20%" r="45%">
      <stop offset="0%" stop-color="${item.glowColor1}" stop-opacity="0.32" />
      <stop offset="100%" stop-color="${item.glowColor1}" stop-opacity="0" />
    </radialGradient>

    <!-- Radial Glow 2 (Bottom Left) -->
    <radialGradient id="glowBottom" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="${item.glowColor2}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${item.glowColor2}" stop-opacity="0" />
    </radialGradient>

    <!-- Card Border Gradient -->
    <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.18)" />
      <stop offset="50%" stop-color="rgba(255, 255, 255, 0.04)" />
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.12)" />
    </linearGradient>

    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.025)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Base Canvas Background -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glowTop)" />
  <rect width="1200" height="630" fill="url(#glowBottom)" />

  <!-- Outer Framing Card -->
  <rect x="36" y="36" width="1128" height="558" rx="24" fill="rgba(15, 23, 42, 0.55)" stroke="url(#cardBorder)" stroke-width="1.5" />

  <!-- Top Bar: Brand Identity -->
  <g transform="translate(90, 80)">
    <!-- Logo Icon Box -->
    <rect width="48" height="48" rx="12" fill="#2563eb" />
    <text x="24" y="33" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" fill="#ffffff">🧮</text>

    <!-- Brand Name -->
    <text x="64" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      AI Free Calculator
    </text>
    <text x="64" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="500" fill="#94a3b8" letter-spacing="0.5">
      aifreecalculator.com
    </text>
  </g>

  <!-- Top Right Category Badge -->
  <g transform="translate(730, 82)">
    <rect width="380" height="42" rx="21" fill="${item.badgeBg}" stroke="${item.badgeBorder}" stroke-width="1.2"/>
    <text x="190" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="${item.badgeColor}" letter-spacing="1">
      ${escapeXml(item.badge)}
    </text>
  </g>

  <!-- Main Headline Title -->
  <text x="90" y="245" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="50" font-weight="900" fill="#ffffff" letter-spacing="-1.5">
    ${escapeXml(item.title)}
  </text>

  <!-- Description / Subtitle -->
  <text x="90" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#cbd5e1">
    ${escapeXml(item.subtitle)}
  </text>

  <!-- Highlights Pills -->
  ${highlightsSvg}

  <!-- Footer Verification / Trust Bar -->
  <g transform="translate(90, 545)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#64748b">
      ✓ Verified Formulas &amp; Logic
    </text>
    <text x="240" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#64748b">
      ✓ 100% Free &amp; Unlimited
    </text>
    <text x="470" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#64748b">
      ✓ Client-Side Instant Calculations
    </text>
    <text x="760" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#64748b">
      ✓ Zero Signup Required
    </text>
  </g>
</svg>
`;
}

async function run() {
  console.log('Generating high-resolution 1200x630 OG PNG banners...');
  for (const item of images) {
    const svg = buildSvg(item);
    const dest = path.join(outputDir, item.filename);
    await sharp(Buffer.from(svg))
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(dest);
    const stat = fs.statSync(dest);
    console.log(`✓ Generated ${item.filename} (1200x630, ${(stat.size / 1024).toFixed(1)} KB)`);
  }
  console.log('All OG images successfully generated!');
}

run().catch(console.error);
