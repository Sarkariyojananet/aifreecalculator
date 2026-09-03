/**
 * Comprehensive Date & Time Calculation Engine
 * Pure TypeScript calculation functions for all date and time operations
 */

// 1. Basic Time Add / Subtract
export interface TimeOperationInput {
  h1: number;
  m1: number;
  s1?: number;
  operation: 'add' | 'subtract';
  h2: number;
  m2: number;
  s2?: number;
}

export interface TimeOperationResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  totalMinutes: number;
  totalHoursDecimal: number;
  formatted: string;
  isNegative: boolean;
}

export function calculateTimeOperation(input: TimeOperationInput): TimeOperationResult {
  const s1 = (input.h1 || 0) * 3600 + (input.m1 || 0) * 60 + (input.s1 || 0);
  const s2 = (input.h2 || 0) * 3600 + (input.m2 || 0) * 60 + (input.s2 || 0);

  let finalSec = input.operation === 'add' ? s1 + s2 : s1 - s2;
  const isNegative = finalSec < 0;
  finalSec = Math.abs(finalSec);

  const hours = Math.floor(finalSec / 3600);
  const minutes = Math.floor((finalSec % 3600) / 60);
  const seconds = finalSec % 60;

  const totalMinutes = Number((finalSec / 60).toFixed(2));
  const totalHoursDecimal = Number((finalSec / 3600).toFixed(4));
  const sign = isNegative ? '-' : '';
  const formatted = `${sign}${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  return {
    hours: isNegative ? -hours : hours,
    minutes,
    seconds,
    totalSeconds: isNegative ? -finalSec : finalSec,
    totalMinutes: isNegative ? -totalMinutes : totalMinutes,
    totalHoursDecimal: isNegative ? -totalHoursDecimal : totalHoursDecimal,
    formatted,
    isNegative,
  };
}

// 2. Add Multiple Times
export interface TimeEntry {
  hours: number;
  minutes: number;
  seconds?: number;
}

export function addMultipleTimes(entries: TimeEntry[]): TimeOperationResult {
  let totalSec = 0;
  entries.forEach((e) => {
    totalSec += (e.hours || 0) * 3600 + (e.minutes || 0) * 60 + (e.seconds || 0);
  });

  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const totalMinutes = Number((totalSec / 60).toFixed(2));
  const totalHoursDecimal = Number((totalSec / 3600).toFixed(4));
  const formatted = `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds: totalSec,
    totalMinutes,
    totalHoursDecimal,
    formatted,
    isNegative: false,
  };
}

// 3. Work Time Calculator with Shift & Breaks
export interface WorkTimeInput {
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  breakDurationMinutes: number;
  secondBreakMinutes?: number;
  overtimeThresholdHours?: number; // default 8
}

export interface WorkTimeResult {
  totalShiftHours: number;
  totalShiftMinutes: number;
  totalBreakMinutes: number;
  netWorkHours: number;
  netWorkMinutes: number;
  netWorkHoursDecimal: number;
  overtimeHoursDecimal: number;
  isOvernight: boolean;
  formattedNetWork: string;
}

export function calculateWorkTime(input: WorkTimeInput): WorkTimeResult {
  const [startH, startM] = input.startTime.split(':').map(Number);
  const [endH, endM] = input.endTime.split(':').map(Number);

  const startTotalMinutes = startH * 60 + startM;
  let endTotalMinutes = endH * 60 + endM;

  let isOvernight = false;
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60; // Crosses midnight
    isOvernight = true;
  }

  const shiftTotalMinutes = endTotalMinutes - startTotalMinutes;
  const totalBreakMinutes = (input.breakDurationMinutes || 0) + (input.secondBreakMinutes || 0);
  const netMinutes = Math.max(0, shiftTotalMinutes - totalBreakMinutes);

  const shiftH = Math.floor(shiftTotalMinutes / 60);
  const shiftM = shiftTotalMinutes % 60;

  const netH = Math.floor(netMinutes / 60);
  const netM = netMinutes % 60;

  const netWorkHoursDecimal = Number((netMinutes / 60).toFixed(2));
  const otThreshold = input.overtimeThresholdHours || 8;
  const overtimeHoursDecimal = netWorkHoursDecimal > otThreshold ? Number((netWorkHoursDecimal - otThreshold).toFixed(2)) : 0;

  return {
    totalShiftHours: shiftH,
    totalShiftMinutes: shiftM,
    totalBreakMinutes,
    netWorkHours: netH,
    netWorkMinutes: netM,
    netWorkHoursDecimal,
    overtimeHoursDecimal,
    isOvernight,
    formattedNetWork: `${netH} Hours ${netM} Minutes`,
  };
}

// 4. Time Between Two Times
export function calculateTimeBetween(
  time1: string,
  time2: string,
  date1?: string,
  date2?: string
): {
  hours: number;
  minutes: number;
  totalMinutes: number;
  totalHoursDecimal: number;
  isNextDay: boolean;
} {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);

  let startMin = h1 * 60 + m1;
  let endMin = h2 * 60 + m2;
  let isNextDay = false;

  if (date1 && date2) {
    const d1 = new Date(`${date1}T${time1}:00`);
    const d2 = new Date(`${date2}T${time2}:00`);
    const diffMin = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60));
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return {
      hours: h,
      minutes: m,
      totalMinutes: diffMin,
      totalHoursDecimal: Number((diffMin / 60).toFixed(2)),
      isNextDay: d2.getDate() !== d1.getDate(),
    };
  }

  if (endMin < startMin) {
    endMin += 24 * 60;
    isNextDay = true;
  }

  const diffMin = endMin - startMin;
  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;

  return {
    hours,
    minutes,
    totalMinutes: diffMin,
    totalHoursDecimal: Number((diffMin / 60).toFixed(2)),
    isNextDay,
  };
}

// 5. Time in Hours & Reverse Conversion
export function convertTimeToHours(days: number, hours: number, minutes: number, seconds: number): {
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
} {
  const totalSec = (days || 0) * 86400 + (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
  return {
    totalHours: Number((totalSec / 3600).toFixed(4)),
    totalMinutes: Number((totalSec / 60).toFixed(2)),
    totalSeconds: totalSec,
  };
}

export function convertDecimalHoursToDhms(decimalHours: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  let totalSec = Math.round(Math.abs(decimalHours) * 3600);
  const days = Math.floor(totalSec / 86400);
  totalSec %= 86400;
  const hours = Math.floor(totalSec / 3600);
  totalSec %= 3600;
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  let formatted = '';
  if (days > 0) formatted += `${days} Days `;
  formatted += `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  return { days, hours, minutes, seconds, formatted };
}

// 6. Elapsed Time (Between Two Full DateTimes)
export function calculateElapsedDateTime(
  startStr: string,
  endStr: string
): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  formatted: string;
} {
  const d1 = new Date(startStr);
  const d2 = new Date(endStr);

  const isReverse = d2 < d1;
  const early = isReverse ? d2 : d1;
  const late = isReverse ? d1 : d2;

  const totalSec = Math.floor((late.getTime() - early.getTime()) / 1000);
  const totalDays = Math.floor(totalSec / 86400);
  const totalHours = Math.floor(totalSec / 3600);
  const totalMinutes = Math.floor(totalSec / 60);

  // Breakdown
  let years = late.getFullYear() - early.getFullYear();
  let months = late.getMonth() - early.getMonth();
  let days = late.getDate() - early.getDate();
  let hours = late.getHours() - early.getHours();
  let minutes = late.getMinutes() - early.getMinutes();
  let seconds = late.getSeconds() - early.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    months--;
    const prevMonthDays = new Date(late.getFullYear(), late.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  let parts = [];
  if (years > 0) parts.push(`${years} Year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} Month${months > 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days} Day${days > 1 ? 's' : ''}`);
  parts.push(`${hours} Hour${hours !== 1 ? 's' : ''}`);
  parts.push(`${minutes} Minute${minutes !== 1 ? 's' : ''}`);
  parts.push(`${seconds} Second${seconds !== 1 ? 's' : ''}`);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds: totalSec,
    formatted: parts.join(' '),
  };
}

// 7. Add / Subtract Duration to Date & Time
export function addSubtractDateTime(
  startDateTimeStr: string,
  operation: 'add' | 'subtract',
  dYears: number = 0,
  dMonths: number = 0,
  dWeeks: number = 0,
  dDays: number = 0,
  dHours: number = 0,
  dMinutes: number = 0,
  dSeconds: number = 0
): {
  resultDate: Date;
  formattedDate: string;
  formattedTime: string;
  formattedFull: string;
} {
  const d = new Date(startDateTimeStr);
  const factor = operation === 'add' ? 1 : -1;

  if (dYears) d.setFullYear(d.getFullYear() + factor * dYears);
  if (dMonths) d.setMonth(d.getMonth() + factor * dMonths);
  if (dWeeks) d.setDate(d.getDate() + factor * (dWeeks * 7));
  if (dDays) d.setDate(d.getDate() + factor * dDays);
  if (dHours) d.setHours(d.getHours() + factor * dHours);
  if (dMinutes) d.setMinutes(d.getMinutes() + factor * dMinutes);
  if (dSeconds) d.setSeconds(d.getSeconds() + factor * dSeconds);

  return {
    resultDate: d,
    formattedDate: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    formattedTime: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    formattedFull: d.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
  };
}

// 8. USPS Estimated Delivery Calculator
export interface UspsEstimateInput {
  shipDate: string; // YYYY-MM-DD
  serviceType: 'ground_advantage' | 'priority' | 'priority_express' | 'custom';
  customMinDays?: number;
  customMaxDays?: number;
  handlingDays?: number;
  includeSaturdayDelivery?: boolean;
}

export interface UspsEstimateResult {
  shipDateFormatted: string;
  dispatchDateFormatted: string;
  minEstimatedDelivery: string;
  maxEstimatedDelivery: string;
  estimatedWindowFormatted: string;
  serviceName: string;
  transitDaysText: string;
}

export function calculateUspsDelivery(input: UspsEstimateInput): UspsEstimateResult {
  const ship = new Date(input.shipDate + 'T12:00:00');
  const handling = Math.max(0, input.handlingDays || 0);

  // Add handling days (skipping Sundays)
  const dispatch = new Date(ship);
  let handlingAdded = 0;
  while (handlingAdded < handling) {
    dispatch.setDate(dispatch.getDate() + 1);
    if (dispatch.getDay() !== 0) { // Sunday = 0
      handlingAdded++;
    }
  }

  let minTransit = 2;
  let maxTransit = 5;
  let serviceName = 'USPS Ground Advantage';

  if (input.serviceType === 'priority') {
    minTransit = 1;
    maxTransit = 3;
    serviceName = 'USPS Priority Mail';
  } else if (input.serviceType === 'priority_express') {
    minTransit = 1;
    maxTransit = 2;
    serviceName = 'USPS Priority Mail Express';
  } else if (input.serviceType === 'custom') {
    minTransit = input.customMinDays || 2;
    maxTransit = input.customMaxDays || 5;
    serviceName = 'Custom Estimated Carrier Service';
  }

  function addTransitBusinessDays(baseDate: Date, days: number, allowSat: boolean = true): Date {
    const res = new Date(baseDate);
    let added = 0;
    while (added < days) {
      res.setDate(res.getDate() + 1);
      const day = res.getDay();
      // Skip Sunday always. Skip Saturday if not allowed.
      if (day === 0) continue;
      if (!allowSat && day === 6) continue;
      added++;
    }
    return res;
  }

  const allowSat = input.includeSaturdayDelivery !== false;
  const minDeliveryDate = addTransitBusinessDays(dispatch, minTransit, allowSat);
  const maxDeliveryDate = addTransitBusinessDays(dispatch, maxTransit, allowSat);

  const opt: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };

  return {
    shipDateFormatted: ship.toLocaleDateString('en-US', opt),
    dispatchDateFormatted: dispatch.toLocaleDateString('en-US', opt),
    minEstimatedDelivery: minDeliveryDate.toLocaleDateString('en-US', opt),
    maxEstimatedDelivery: maxDeliveryDate.toLocaleDateString('en-US', opt),
    estimatedWindowFormatted: `${minDeliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${maxDeliveryDate.toLocaleDateString('en-US', opt)}`,
    serviceName,
    transitDaysText: `${minTransit}–${maxTransit} Business Days`,
  };
}
