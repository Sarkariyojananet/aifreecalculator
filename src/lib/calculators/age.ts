/**
 * Universal Age & Chronological Life Calculation Engine
 * High-precision calendar arithmetic, life statistics, zodiac profiles,
 * age difference comparison, and exam eligibility algorithms.
 */

export interface AgeInput {
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:MM (optional)
  targetDate?: string; // YYYY-MM-DD (default today)
  targetTime?: string; // HH:MM (optional)
}

export interface UpcomingBirthday {
  year: number;
  dateStr: string;
  dayOfWeek: string;
  isWeekend: boolean;
  turningAge: number;
}

export interface LifeMilestone {
  title: string;
  targetDate: string;
  isPassed: boolean;
  daysRemainingOrAgo: number;
}

export interface ZodiacInfo {
  sign: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
  traits: string;
}

export interface ChineseZodiacInfo {
  animal: string;
  emoji: string;
  element: string;
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  formattedExact: string; // e.g., "28 Years, 4 Months, 12 Days"
  decimalAge: number; // e.g., 28.362

  // Total elapsed equivalents
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;

  // Life Metrics Estimates
  approxHeartbeats: number; // ~75 bpm average
  approxBreaths: number; // ~16 breaths/min
  approxSleepYears: number; // ~33% of lifetime
  lifeProgressPercentage: number; // based on 80-year global benchmark

  // Birth Details & Profiles
  dayOfWeekBorn: string;
  zodiac: ZodiacInfo;
  chineseZodiac: ChineseZodiacInfo;
  generation: {
    name: string;
    range: string;
    description: string;
  };

  // Birthday Countdowns
  nextBirthday: {
    dateStr: string;
    daysRemaining: number;
    monthsRemaining: number;
    daysRemainder: number;
    dayOfWeek: string;
    turningAge: number;
    isToday: boolean;
  };
  halfBirthdayDate: string;
  upcomingBirthdays: UpcomingBirthday[];

  // Life Milestones
  milestones: LifeMilestone[];
}

export interface AgeDifferenceResult {
  person1Name: string;
  person2Name: string;
  olderPerson: 'person1' | 'person2' | 'same';
  differenceYears: number;
  differenceMonths: number;
  differenceDays: number;
  totalDifferenceDays: number;
  totalDifferenceWeeks: number;
  totalDifferenceHours: number;
  formattedDifference: string;
  doubleAgeDate?: string; // Date when older person was/will be 2x younger person's age
  doubleAgeOlderAge?: number;
  doubleAgeYoungerAge?: number;
}

export interface ExamEligibilityResult {
  dob: string;
  cutoffDate: string;
  ageOnCutoff: {
    years: number;
    months: number;
    days: number;
    formatted: string;
  };
  minAge: number;
  baseMaxAge: number;
  relaxationYears: number;
  effectiveMaxAge: number;
  status: 'ELIGIBLE' | 'UNDERAGE' | 'OVERAGE';
  statusMessage: string;
  marginText: string;
  yearsRemainingForExam: number;
}

/**
 * Western Zodiac Sign Determination
 */
export function getWesternZodiac(month: number, day: number): ZodiacInfo {
  // month is 1-indexed (1 = Jan, 12 = Dec)
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'Aries', symbol: '♈', element: 'Fire', dateRange: 'Mar 21 - Apr 19', traits: 'Courageous, energetic, willful, commanding, leading.' };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'Taurus', symbol: '♉', element: 'Earth', dateRange: 'Apr 20 - May 20', traits: 'Reliable, patient, practical, devoted, responsible.' };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'Gemini', symbol: '♊', element: 'Air', dateRange: 'May 21 - Jun 20', traits: 'Adaptable, outgoing, intelligent, curious, lively.' };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'Cancer', symbol: '♋', element: 'Water', dateRange: 'Jun 21 - Jul 22', traits: 'Intuitive, sentimental, compassionate, protective.' };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'Leo', symbol: '♌', element: 'Fire', dateRange: 'Jul 23 - Aug 22', traits: 'Passionate, generous, warm-hearted, cheerful, creative.' };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'Virgo', symbol: '♍', element: 'Earth', dateRange: 'Aug 23 - Sep 22', traits: 'Loyal, analytical, kind, hardworking, practical.' };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'Libra', symbol: '♎', element: 'Air', dateRange: 'Sep 23 - Oct 22', traits: 'Cooperative, diplomatic, gracious, fair-minded, social.' };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'Scorpio', symbol: '♏', element: 'Water', dateRange: 'Oct 23 - Nov 21', traits: 'Resourceful, brave, passionate, stubborn, a true friend.' };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'Sagittarius', symbol: '♐', element: 'Fire', dateRange: 'Nov 22 - Dec 21', traits: 'Generous, idealistic, great sense of humor, adventurous.' };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'Capricorn', symbol: '♑', element: 'Earth', dateRange: 'Dec 22 - Jan 19', traits: 'Responsible, disciplined, self-control, good managers.' };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'Aquarius', symbol: '♒', element: 'Air', dateRange: 'Jan 20 - Feb 18', traits: 'Progressive, original, independent, humanitarian.' };
  }
  return { sign: 'Pisces', symbol: '♓', element: 'Water', dateRange: 'Feb 19 - Mar 20', traits: 'Compassionate, artistic, intuitive, gentle, wise, musical.' };
}

/**
 * Chinese Lunar Zodiac Determination
 */
export function getChineseZodiac(year: number): ChineseZodiacInfo {
  const animals = [
    { animal: 'Rat', emoji: '🐀', element: 'Water' },
    { animal: 'Ox', emoji: '🐂', element: 'Earth' },
    { animal: 'Tiger', emoji: '🐅', element: 'Wood' },
    { animal: 'Rabbit', emoji: '🐇', element: 'Wood' },
    { animal: 'Dragon', emoji: '🐉', element: 'Earth' },
    { animal: 'Snake', emoji: '🐍', element: 'Fire' },
    { animal: 'Horse', emoji: '🐎', element: 'Fire' },
    { animal: 'Goat', emoji: '🐐', element: 'Earth' },
    { animal: 'Monkey', emoji: '🐒', element: 'Metal' },
    { animal: 'Rooster', emoji: '🐓', element: 'Metal' },
    { animal: 'Dog', emoji: '🐕', element: 'Earth' },
    { animal: 'Pig', emoji: '🐖', element: 'Water' },
  ];
  const index = Math.abs((year - 1900) % 12);
  return animals[index];
}

/**
 * Demographic Generation Determination
 */
export function getGeneration(birthYear: number): { name: string; range: string; description: string } {
  if (birthYear >= 2025) {
    return { name: 'Gen Beta', range: '2025 - 2039', description: 'The AI-native generation born into hyper-connected smart ecosystems.' };
  }
  if (birthYear >= 2013) {
    return { name: 'Gen Alpha', range: '2013 - 2024', description: 'First generation born entirely in the 21st century with mobile & AI ubiquity.' };
  }
  if (birthYear >= 1997) {
    return { name: 'Gen Z (Zoomers)', range: '1997 - 2012', description: 'Digital natives, socially conscious, innovative, and entrepreneurial.' };
  }
  if (birthYear >= 1981) {
    return { name: 'Millennials (Gen Y)', range: '1981 - 1996', description: 'Tech pioneers bridging the analog and digital revolutions, valuing experiences.' };
  }
  if (birthYear >= 1965) {
    return { name: 'Generation X', range: '1965 - 1980', description: 'Resourceful, independent, self-reliant, and adaptable workforces.' };
  }
  if (birthYear >= 1946) {
    return { name: 'Baby Boomers', range: '1946 - 1964', description: 'Post-WWII generation characterized by strong work ethic and cultural transformation.' };
  }
  if (birthYear >= 1928) {
    return { name: 'Silent Generation', range: '1928 - 1945', description: 'Resilient and disciplined builders of modern civil infrastructure.' };
  }
  return { name: 'Greatest Generation', range: '1901 - 1927', description: 'The generation that endured the Great Depression and World War II.' };
}

/**
 * Helper to parse YYYY-MM-DD into a clean local midnight Date
 */
export function parseDateLocal(dateStr: string, timeStr?: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  let hours = 0;
  let minutes = 0;
  if (timeStr) {
    const [th, tm] = timeStr.split(':').map(Number);
    if (!isNaN(th)) hours = th;
    if (!isNaN(tm)) minutes = tm;
  }
  return new Date(y, m - 1, d, hours, minutes, 0, 0);
}

/**
 * Primary Chronological Age Calculation Engine
 */
export function calculateAge(input: AgeInput): AgeResult {
  const birth = parseDateLocal(input.birthDate, input.birthTime);
  const target = input.targetDate
    ? parseDateLocal(input.targetDate, input.targetTime)
    : new Date();

  if (isNaN(birth.getTime())) {
    throw new Error('Invalid birth date provided.');
  }

  if (birth > target) {
    throw new Error('Birth date cannot be in the future.');
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();
  let hours = target.getHours() - birth.getHours();
  let minutes = target.getMinutes() - birth.getMinutes();

  if (minutes < 0) {
    hours--;
    minutes += 60;
  }

  if (hours < 0) {
    days--;
    hours += 24;
  }

  if (days < 0) {
    months--;
    // Days in the month immediately preceding target month
    const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = target.getTime() - birth.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMonths = years * 12 + months;
  const decimalAge = Number((years + months / 12 + days / 365.2425).toFixed(4));

  // Day of week born
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekBorn = daysOfWeek[birth.getDay()];

  // Zodiacs
  const zodiac = getWesternZodiac(birth.getMonth() + 1, birth.getDate());
  const chineseZodiac = getChineseZodiac(birth.getFullYear());
  const generation = getGeneration(birth.getFullYear());

  // Next Birthday Calculation
  const birthMonth = birth.getMonth();
  const birthDateNum = birth.getDate();
  let nextBdayYear = target.getFullYear();
  let nextBdayDate = new Date(nextBdayYear, birthMonth, birthDateNum);

  // Check if birthday has passed this year
  const isToday =
    target.getFullYear() === nextBdayYear &&
    target.getMonth() === birthMonth &&
    target.getDate() === birthDateNum;

  if (nextBdayDate < target && !isToday) {
    nextBdayYear += 1;
    nextBdayDate = new Date(nextBdayYear, birthMonth, birthDateNum);
  }

  const nextBdayDiffMs = nextBdayDate.getTime() - target.getTime();
  const nextBirthdayDays = Math.ceil(nextBdayDiffMs / (1000 * 60 * 60 * 24));
  const turningAge = nextBdayYear - birth.getFullYear();

  // Next birthday months & days breakdown
  let bdayMonthsLeft = nextBdayDate.getMonth() - target.getMonth();
  let bdayDaysLeft = nextBdayDate.getDate() - target.getDate();
  if (bdayDaysLeft < 0) {
    bdayMonthsLeft--;
    const prevMonthDays = new Date(nextBdayDate.getFullYear(), nextBdayDate.getMonth(), 0).getDate();
    bdayDaysLeft += prevMonthDays;
  }
  if (bdayMonthsLeft < 0) {
    bdayMonthsLeft += 12;
  }

  // Next 5 upcoming birthdays
  const upcomingBirthdays: UpcomingBirthday[] = [];
  const startYear = isToday ? target.getFullYear() + 1 : nextBdayYear;
  for (let i = 0; i < 5; i++) {
    const uYear = startYear + i;
    const uDate = new Date(uYear, birthMonth, birthDateNum);
    const uDay = daysOfWeek[uDate.getDay()];
    const isWeekend = uDate.getDay() === 0 || uDate.getDay() === 6;
    upcomingBirthdays.push({
      year: uYear,
      dateStr: uDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
      dayOfWeek: uDay,
      isWeekend,
      turningAge: uYear - birth.getFullYear(),
    });
  }

  // Half Birthday Date (6 months from DOB in the current/next cycle)
  const halfBdayMonth = (birthMonth + 6) % 12;
  const halfBdayYear = birthMonth + 6 >= 12 ? nextBdayYear : nextBdayYear - 1;
  const halfBday = new Date(halfBdayYear, halfBdayMonth, birthDateNum);
  const halfBirthdayDate = halfBday.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  // Life Metrics Estimates
  const approxHeartbeats = Math.round(totalMinutes * 75);
  const approxBreaths = Math.round(totalMinutes * 16);
  const approxSleepYears = Number((years * 0.33).toFixed(1));
  const lifeProgressPercentage = Math.min(100, Number(((totalDays / (80 * 365.25)) * 100).toFixed(1)));

  // Milestones (e.g. 10,000 days, 15,000 days, 1 billion seconds, 50th birthday)
  const milestoneDays = [5000, 10000, 15000, 20000, 25000];
  const milestones: LifeMilestone[] = [];

  milestoneDays.forEach((targetDayCount) => {
    const mDate = new Date(birth.getTime() + targetDayCount * 24 * 60 * 60 * 1000);
    const isPassed = totalDays >= targetDayCount;
    const daysDiff = Math.abs(targetDayCount - totalDays);
    milestones.push({
      title: `${targetDayCount.toLocaleString()} Days Alive`,
      targetDate: mDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
      isPassed,
      daysRemainingOrAgo: daysDiff,
    });
  });

  // 1 Billion Seconds Milestone (~31.69 years)
  const oneBillionSecDate = new Date(birth.getTime() + 1000000000 * 1000);
  const isOneBillionPassed = totalSeconds >= 1000000000;
  milestones.push({
    title: '1 Billion Seconds Lived',
    targetDate: oneBillionSecDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    isPassed: isOneBillionPassed,
    daysRemainingOrAgo: Math.abs(Math.round((oneBillionSecDate.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))),
  });

  return {
    years,
    months,
    days,
    hours,
    minutes,
    formattedExact: `${years} Years, ${months} Months, ${days} Days`,
    decimalAge,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    approxHeartbeats,
    approxBreaths,
    approxSleepYears,
    lifeProgressPercentage,
    dayOfWeekBorn,
    zodiac,
    chineseZodiac,
    generation,
    nextBirthday: {
      dateStr: nextBdayDate.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
      daysRemaining: nextBirthdayDays,
      monthsRemaining: bdayMonthsLeft,
      daysRemainder: bdayDaysLeft,
      dayOfWeek: daysOfWeek[nextBdayDate.getDay()],
      turningAge,
      isToday,
    },
    halfBirthdayDate,
    upcomingBirthdays,
    milestones,
  };
}

/**
 * Calculate the exact age difference between two individuals
 */
export function calculateAgeDifference(
  dob1: string,
  dob2: string,
  person1Name: string = 'Person 1',
  person2Name: string = 'Person 2'
): AgeDifferenceResult {
  const d1 = parseDateLocal(dob1);
  const d2 = parseDateLocal(dob2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Please enter valid dates for both individuals.');
  }

  let olderPerson: 'person1' | 'person2' | 'same' = 'same';
  let olderDate = d1;
  let youngerDate = d2;

  if (d1 < d2) {
    olderPerson = 'person1';
    olderDate = d1;
    youngerDate = d2;
  } else if (d2 < d1) {
    olderPerson = 'person2';
    olderDate = d2;
    youngerDate = d1;
  }

  if (olderPerson === 'same') {
    return {
      person1Name,
      person2Name,
      olderPerson: 'same',
      differenceYears: 0,
      differenceMonths: 0,
      differenceDays: 0,
      totalDifferenceDays: 0,
      totalDifferenceWeeks: 0,
      totalDifferenceHours: 0,
      formattedDifference: '0 Years, 0 Months, 0 Days (Same Date)',
    };
  }

  // Exact calendar difference from olderDate to youngerDate
  let years = youngerDate.getFullYear() - olderDate.getFullYear();
  let months = youngerDate.getMonth() - olderDate.getMonth();
  let days = youngerDate.getDate() - olderDate.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = youngerDate.getTime() - olderDate.getTime();
  const totalDifferenceDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalDifferenceWeeks = Math.floor(totalDifferenceDays / 7);
  const totalDifferenceHours = totalDifferenceDays * 24;

  // Double Age Date: Date = youngerDate + (youngerDate - olderDate)
  const doubleAgeMs = youngerDate.getTime() + diffMs;
  const doubleAgeDateObj = new Date(doubleAgeMs);
  const doubleAgeDate = doubleAgeDateObj.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  const doubleAgeOlderAge = Number(((diffMs * 2) / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(1));
  const doubleAgeYoungerAge = Number((diffMs / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(1));

  return {
    person1Name,
    person2Name,
    olderPerson,
    differenceYears: years,
    differenceMonths: months,
    differenceDays: days,
    totalDifferenceDays,
    totalDifferenceWeeks,
    totalDifferenceHours,
    formattedDifference: `${years} Years, ${months} Months, ${days} Days`,
    doubleAgeDate,
    doubleAgeOlderAge,
    doubleAgeYoungerAge,
  };
}

/**
 * Competitive Exam & Govt Job Eligibility Age Checker
 */
export function checkExamEligibility(
  dobStr: string,
  cutoffDateStr: string,
  minAge: number,
  baseMaxAge: number,
  relaxationYears: number = 0
): ExamEligibilityResult {
  const birth = parseDateLocal(dobStr);
  const cutoff = parseDateLocal(cutoffDateStr);

  if (isNaN(birth.getTime()) || isNaN(cutoff.getTime())) {
    throw new Error('Invalid dates provided for eligibility check.');
  }

  const ageRes = calculateAge({ birthDate: dobStr, targetDate: cutoffDateStr });
  const effectiveMaxAge = baseMaxAge + relaxationYears;

  let status: 'ELIGIBLE' | 'UNDERAGE' | 'OVERAGE' = 'ELIGIBLE';
  let statusMessage = 'Congratulations! You meet the age criteria on the cutoff date.';
  let marginText = '';

  // Evaluate candidate age against bounds
  const exactYears = ageRes.years;
  const exactMonths = ageRes.months;
  const exactDays = ageRes.days;

  if (exactYears < minAge) {
    status = 'UNDERAGE';
    const underYears = minAge - 1 - exactYears;
    const underMonths = 11 - exactMonths;
    statusMessage = `Underage: You need to be at least ${minAge} years old on ${cutoffDateStr}.`;
    marginText = `Short by ${underYears} years and ${underMonths} months.`;
  } else if (exactYears > effectiveMaxAge || (exactYears === effectiveMaxAge && (exactMonths > 0 || exactDays > 0))) {
    status = 'OVERAGE';
    const overYears = exactYears - effectiveMaxAge;
    statusMessage = `Overage: The maximum permitted age limit is ${effectiveMaxAge} years.`;
    marginText = `Exceeded maximum limit by ${overYears} years, ${exactMonths} months.`;
  } else {
    const remainYears = effectiveMaxAge - 1 - exactYears;
    const remainMonths = 11 - exactMonths;
    marginText = `You have ${remainYears} years, ${remainMonths} months remaining before reaching the maximum age limit (${effectiveMaxAge} yrs).`;
  }

  const yearsRemainingForExam = Math.max(0, effectiveMaxAge - exactYears);

  return {
    dob: dobStr,
    cutoffDate: cutoffDateStr,
    ageOnCutoff: {
      years: exactYears,
      months: exactMonths,
      days: exactDays,
      formatted: ageRes.formattedExact,
    },
    minAge,
    baseMaxAge,
    relaxationYears,
    effectiveMaxAge,
    status,
    statusMessage,
    marginText,
    yearsRemainingForExam,
  };
}

/**
 * Calculate Date Offset from DOB (e.g. When will I turn 60?)
 */
export function calculateDateWhenTurningAge(dobStr: string, targetYears: number): string {
  const birth = parseDateLocal(dobStr);
  const targetYear = birth.getFullYear() + targetYears;
  const resDate = new Date(targetYear, birth.getMonth(), birth.getDate());
  return resDate.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Calculate Estimated Date of Birth from given Age on a reference date
 */
export function calculateDobFromAge(targetDateStr: string, years: number, months: number = 0, days: number = 0): string {
  const target = parseDateLocal(targetDateStr);
  let birthYear = target.getFullYear() - years;
  let birthMonth = target.getMonth() - months;
  let birthDay = target.getDate() - days;

  if (birthDay < 1) {
    birthMonth--;
    const prevMonthDays = new Date(birthYear, birthMonth + 1, 0).getDate();
    birthDay += prevMonthDays;
  }
  if (birthMonth < 0) {
    birthYear--;
    birthMonth += 12;
  }

  const estimatedDob = new Date(birthYear, birthMonth, birthDay);
  const y = estimatedDob.getFullYear();
  const m = String(estimatedDob.getMonth() + 1).padStart(2, '0');
  const d = String(estimatedDob.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
