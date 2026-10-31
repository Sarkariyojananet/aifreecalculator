/**
 * Comprehensive Negative Marking Calculation Engine
 * Accurate pure calculation functions for competitive exams and score projections
 */

export interface NegativeMarkingInput {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  positiveMarks: number;
  negativeMarks: number;
  unattemptedPenalty?: number;
}

export interface NegativeMarkingResult {
  totalQuestions: number;
  attempted: number;
  unattempted: number;
  correctAnswers: number;
  wrongAnswers: number;
  grossMarks: number;
  penaltyMarks: number;
  unattemptedPenaltyMarks: number;
  totalPenaltyMarks: number;
  netScore: number;
  maxPossibleMarks: number;
  percentage: number;
  accuracyRate: number;
  errorRate: number;
  marksLostPercentage: number;
}

export interface ExamPreset {
  id: string;
  name: string;
  totalQuestions: number;
  positiveMarks: number;
  negativeMarks: number; // e.g. 0.25, 0.3333, 0.5, 1.0
  negativeFractionLabel: string;
  maxMarks: number;
  description: string;
}

export const EXAM_PRESETS: ExamPreset[] = [
  {
    id: 'upsc-prelims-gs',
    name: 'UPSC CSE Prelims (Paper 1 - GS)',
    totalQuestions: 100,
    positiveMarks: 2.0,
    negativeMarks: 0.6667,
    negativeFractionLabel: '1/3rd (0.66)',
    maxMarks: 200,
    description: '100 Questions, +2.0 for correct, -0.66 (1/3rd) for wrong answer.',
  },
  {
    id: 'upsc-csat',
    name: 'UPSC CSAT (Paper 2)',
    totalQuestions: 80,
    positiveMarks: 2.5,
    negativeMarks: 0.8333,
    negativeFractionLabel: '1/3rd (0.83)',
    maxMarks: 200,
    description: '80 Questions, +2.5 for correct, -0.83 (1/3rd) for wrong answer (Qualifying 33%).',
  },
  {
    id: 'ssc-cgl-tier1',
    name: 'SSC CGL / CHSL (Tier 1)',
    totalQuestions: 100,
    positiveMarks: 2.0,
    negativeMarks: 0.5,
    negativeFractionLabel: '1/4th (0.50)',
    maxMarks: 200,
    description: '100 Questions, +2.0 for correct, -0.50 (1/4th) for wrong answer.',
  },
  {
    id: 'jee-main',
    name: 'JEE Main (MCQ Section)',
    totalQuestions: 75,
    positiveMarks: 4.0,
    negativeMarks: 1.0,
    negativeFractionLabel: '1/4th (-1)',
    maxMarks: 300,
    description: '75 Questions, +4.0 for correct, -1.0 for wrong answer.',
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    totalQuestions: 180,
    positiveMarks: 4.0,
    negativeMarks: 1.0,
    negativeFractionLabel: '1/4th (-1)',
    maxMarks: 720,
    description: '180 Questions attempted out of 200, +4.0 for correct, -1.0 for wrong.',
  },
  {
    id: 'gate-1mark',
    name: 'GATE (1-Mark MCQs)',
    totalQuestions: 30,
    positiveMarks: 1.0,
    negativeMarks: 0.3333,
    negativeFractionLabel: '1/3rd (0.33)',
    maxMarks: 30,
    description: '1-Mark MCQs, +1.0 for correct, -0.33 for wrong answer (NAT has 0 negative).',
  },
  {
    id: 'gate-2mark',
    name: 'GATE (2-Mark MCQs)',
    totalQuestions: 35,
    positiveMarks: 2.0,
    negativeMarks: 0.6667,
    negativeFractionLabel: '1/3rd (0.67)',
    maxMarks: 70,
    description: '2-Mark MCQs, +2.0 for correct, -0.67 for wrong answer.',
  },
  {
    id: 'bank-po',
    name: 'Bank PO / Clerk (IBPS / SBI)',
    totalQuestions: 100,
    positiveMarks: 1.0,
    negativeMarks: 0.25,
    negativeFractionLabel: '1/4th (0.25)',
    maxMarks: 100,
    description: '100 Questions, +1.0 for correct, -0.25 (1/4th) penalty per wrong answer.',
  },
  {
    id: 'cat-exam',
    name: 'CAT (IIM Entrance MCQs)',
    totalQuestions: 66,
    positiveMarks: 3.0,
    negativeMarks: 1.0,
    negativeFractionLabel: '1/3rd (-1)',
    maxMarks: 198,
    description: 'MCQs: +3.0 for correct, -1.0 for wrong answer. (TITA Non-MCQs have zero penalty).',
  },
  {
    id: 'nda-math',
    name: 'NDA (Mathematics)',
    totalQuestions: 120,
    positiveMarks: 2.5,
    negativeMarks: 0.8333,
    negativeFractionLabel: '1/3rd (0.83)',
    maxMarks: 300,
    description: '120 Questions, +2.5 for correct, -0.83 (1/3rd) for wrong answer.',
  },
];

/**
 * Calculates net score and detailed exam performance breakdown
 */
export function calculateNegativeMarking(input: NegativeMarkingInput): NegativeMarkingResult {
  const totalQuestions = Math.max(0, Math.floor(Number(input.totalQuestions) || 0));
  const correct = Math.max(0, Math.floor(Number(input.correctAnswers) || 0));
  const wrong = Math.max(0, Math.floor(Number(input.wrongAnswers) || 0));
  const posMark = Math.max(0, Number(input.positiveMarks) || 0);
  const negMark = Math.max(0, Number(input.negativeMarks) || 0);
  const unattPenalty = Math.max(0, Number(input.unattemptedPenalty) || 0);

  const attempted = correct + wrong;
  const unattempted = Math.max(0, totalQuestions - attempted);

  const grossMarks = Number((correct * posMark).toFixed(4));
  const penaltyMarks = Number((wrong * negMark).toFixed(4));
  const unattemptedPenaltyMarks = Number((unattempted * unattPenalty).toFixed(4));
  const totalPenaltyMarks = Number((penaltyMarks + unattemptedPenaltyMarks).toFixed(4));

  const netScore = Number((grossMarks - totalPenaltyMarks).toFixed(4));
  const maxPossibleMarks = Number((totalQuestions * posMark).toFixed(4));

  const percentage = maxPossibleMarks > 0 
    ? Number(((netScore / maxPossibleMarks) * 100).toFixed(2)) 
    : 0;

  const accuracyRate = attempted > 0 
    ? Number(((correct / attempted) * 100).toFixed(2)) 
    : 0;

  const errorRate = attempted > 0 
    ? Number(((wrong / attempted) * 100).toFixed(2)) 
    : 0;

  const marksLostPercentage = grossMarks > 0 
    ? Number(((totalPenaltyMarks / grossMarks) * 100).toFixed(2)) 
    : 0;

  return {
    totalQuestions,
    attempted,
    unattempted,
    correctAnswers: correct,
    wrongAnswers: wrong,
    grossMarks,
    penaltyMarks,
    unattemptedPenaltyMarks,
    totalPenaltyMarks,
    netScore,
    maxPossibleMarks,
    percentage,
    accuracyRate,
    errorRate,
    marksLostPercentage,
  };
}

/**
 * Target score solver: Calculates required attempts based on target score and expected accuracy
 */
export function calculateTargetAttempts(
  targetScore: number,
  expectedAccuracyPercent: number,
  positiveMarks: number,
  negativeMarks: number
): {
  requiredAttempts: number;
  expectedCorrect: number;
  expectedWrong: number;
  expectedNetScore: number;
  isFeasible: boolean;
} {
  const acc = Math.min(100, Math.max(1, expectedAccuracyPercent)) / 100;
  const pos = Math.max(0.1, positiveMarks);
  const neg = Math.max(0, negativeMarks);

  // Net Score = Attempts * (acc * pos - (1 - acc) * neg)
  const scorePerAttempt = acc * pos - (1 - acc) * neg;

  if (scorePerAttempt <= 0) {
    return {
      requiredAttempts: 0,
      expectedCorrect: 0,
      expectedWrong: 0,
      expectedNetScore: 0,
      isFeasible: false,
    };
  }

  const requiredAttempts = Math.ceil(targetScore / scorePerAttempt);
  const expectedCorrect = Math.round(requiredAttempts * acc);
  const expectedWrong = requiredAttempts - expectedCorrect;
  const expectedNetScore = Number((expectedCorrect * pos - expectedWrong * neg).toFixed(2));

  return {
    requiredAttempts,
    expectedCorrect,
    expectedWrong,
    expectedNetScore,
    isFeasible: true,
  };
}

/**
 * Expected Value (EV) calculation for guessing in negative marking
 */
export function calculateGuessingEV(
  optionsCount: number, // 4, 3, 2 (eliminated options)
  positiveMarks: number,
  negativeMarks: number
): {
  probability: number;
  expectedValue: number;
  verdict: 'favorable' | 'neutral' | 'unfavorable';
  recommendation: string;
} {
  const n = Math.max(2, Math.floor(optionsCount));
  const p = 1 / n;
  const ev = Number((p * positiveMarks - (1 - p) * negativeMarks).toFixed(4));

  let verdict: 'favorable' | 'neutral' | 'unfavorable' = 'neutral';
  let recommendation = '';

  if (ev > 0.05) {
    verdict = 'favorable';
    recommendation = `Statistically favorable (+${ev.toFixed(2)} pts/guess). Guessing between ${n} options has a positive long-term return.`;
  } else if (ev < -0.05) {
    verdict = 'unfavorable';
    recommendation = `Statistically unfavorable (${ev.toFixed(2)} pts/guess). Blind guessing here will reduce your net score over time.`;
  } else {
    verdict = 'neutral';
    recommendation = `Statistically neutral (~0 net return). The penalty perfectly offsets the random guess probability.`;
  }

  return {
    probability: Number((p * 100).toFixed(1)),
    expectedValue: ev,
    verdict,
    recommendation,
  };
}

