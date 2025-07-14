// src/lib/cycle-calculator.ts
import { addDays, subDays, format } from 'date-fns';
import type { CyclePrediction } from './types';

interface CalculationInput {
  startDate: string; // ISO format YYYY-MM-DD
  cycleLength: number;
}

/**
 * Calculates menstrual cycle phases based on a specific day-based model.
 * @param input - The start date of the last period and the cycle length.
 * @returns An object containing the predicted dates for various cycle phases.
 */
export function calculateCyclePhases(input: CalculationInput): CyclePrediction {
  const { startDate, cycleLength } = input;
  const lastPeriodDate = new Date(startDate);

  // Based on user-provided day ranges for a 28-day cycle.
  // We'll adjust for different cycle lengths if needed, but for now, we'll use these offsets.

  // Phase 1: Menstruation (Days 1-7)
  const menstruationStart = lastPeriodDate;
  const menstruationEnd = addDays(lastPeriodDate, 6); 

  // Phase 2: Fertile Window (Days 8-17) - Combining "Possible to conceive" and "Ovulation"
  const fertileStart = addDays(lastPeriodDate, 7);
  const fertileEnd = addDays(lastPeriodDate, 16);

  // Phase 3: Luteal Phase (Days 18-28, "Unlikely to conceive")
  const lutealStart = addDays(lastPeriodDate, 17);
  const nextMenstruationDate = addDays(lastPeriodDate, cycleLength);
  const lutealEnd = subDays(nextMenstruationDate, 1);

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  return {
    menstruation: { start: formatDate(menstruationStart), end: formatDate(menstruationEnd) },
    fertile: { start: formatDate(fertileStart), end: formatDate(fertileEnd) },
    luteal: { start: formatDate(lutealStart), end: formatDate(lutealEnd) },
    nextMenstruationDate: formatDate(nextMenstruationDate),
  };
}
