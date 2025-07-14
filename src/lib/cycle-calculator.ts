// src/lib/cycle-calculator.ts
import { addDays, subDays, format } from 'date-fns';
import type { CyclePrediction } from './types';

interface CalculationInput {
  startDate: string; // ISO format YYYY-MM-DD
  cycleLength: number;
}

/**
 * Calculates menstrual cycle phases based on the start date and cycle length.
 * Follows a 4-phase model: Menstruation, Follicular, Ovulation, Luteal.
 * @param input - The start date of the last period and the cycle length.
 * @returns An object containing the predicted dates for various cycle phases.
 */
export function calculateCyclePhases(input: CalculationInput): CyclePrediction {
  const { startDate, cycleLength } = input;
  const lastPeriodDate = new Date(startDate);

  // Key dates
  const ovulationDay = addDays(lastPeriodDate, cycleLength - 14);
  const nextMenstruationDate = addDays(lastPeriodDate, cycleLength);

  // Phase 1: Menstruation (Days 1-5, but let's use a fixed 5 days for this model)
  const menstruationStart = lastPeriodDate;
  const menstruationEnd = addDays(lastPeriodDate, 4); 

  // Phase 2: Follicular Phase (Post-menstruation, pre-ovulation)
  const follicularStart = addDays(menstruationEnd, 1);
  const follicularEnd = subDays(ovulationDay, 5); // Ends before the main fertile window

  // Phase 3: Ovulation (Most fertile window)
  const ovulationStart = subDays(ovulationDay, 4);
  const ovulationEnd = addDays(ovulationDay, 1);

  // Phase 4: Luteal Phase (Post-ovulation, pre-menstruation)
  const lutealStart = addDays(ovulationEnd, 1);
  const lutealEnd = subDays(nextMenstruationDate, 1);

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  return {
    menstruation: { start: formatDate(menstruationStart), end: formatDate(menstruationEnd) },
    follicular: { start: formatDate(follicularStart), end: formatDate(follicularEnd) },
    ovulation: { start: formatDate(ovulationStart), end: formatDate(ovulationEnd) },
    luteal: { start: formatDate(lutealStart), end: formatDate(lutealEnd) },
    nextMenstruationDate: formatDate(nextMenstruationDate),
  };
}
