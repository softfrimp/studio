// src/lib/cycle-calculator.ts
import { addDays, subDays, format } from 'date-fns';
import type { CyclePrediction } from './types';

interface CalculationInput {
  startDate: string; // ISO format YYYY-MM-DD
  cycleLength: number;
}

export type PhaseName = 
  | 'menstruation' 
  | 'possibleToConceive1' 
  | 'ovulation' 
  | 'possibleToConceive2'
  | 'unlikelyToConceive';

interface PhaseInfo {
    name: string;
    description: string;
    color: string;
    textColor: string;
    chartColor: string;
    pregnancyChance: number; // Percentage
    shortName: string;
}

// Storing UI-related info here to keep it coupled with the logic
// Colors are based on the provided image: Red, Pink, Green, Blue
const PHASE_INFO_MAP: Record<PhaseName, PhaseInfo> = {
    menstruation: { name: 'Menstruation', description: 'Menstruation', color: 'bg-red-300/50', textColor: 'text-red-900', chartColor: '--chart-1', pregnancyChance: 1, shortName: 'Menstruation' },
    possibleToConceive1: { name: 'Fertile Window', description: 'Possible to Conceive', color: 'bg-pink-300/50', textColor: 'text-pink-900', chartColor: '--chart-5', pregnancyChance: 15, shortName: 'Fertile' },
    ovulation: { name: 'Ovulation', description: 'Ovulation (Most Fertile)', color: 'bg-green-400/50', textColor: 'text-green-900', chartColor: '--chart-3', pregnancyChance: 90, shortName: 'Ovulation' },
    possibleToConceive2: { name: 'Fertile Window', description: 'Possible to Conceive', color: 'bg-pink-300/50', textColor: 'text-pink-900', chartColor: '--chart-5', pregnancyChance: 15, shortName: 'Fertile' },
    unlikelyToConceive: { name: 'Luteal Phase', description: 'Unlikely to Conceive', color: 'bg-blue-300/50', textColor: 'text-blue-900', chartColor: '--chart-4', pregnancyChance: 1, shortName: 'Luteal' }
};

export function getPhaseInfo(phase: PhaseName): PhaseInfo {
    return PHASE_INFO_MAP[phase];
}


/**
 * Calculates menstrual cycle phases based on the user-provided model.
 * - Menstruation: Days 1-7
 * - Fertile (pre-ovulation): Days 8-10 (3 days)
 * - Ovulation: Days 11-14 (4 days)
 * - Fertile (post-ovulation): Days 15-17 (3 days)
 * - Luteal: Day 18 to end of cycle
 * @param input - The start date of the last period and the cycle length.
 * @returns An object containing the predicted dates for various cycle phases.
 */
export function calculateCyclePhases(input: CalculationInput): CyclePrediction {
  const { startDate, cycleLength } = input;
  const lastPeriodDate = new Date(startDate.replace(/-/g, '/')); // Use / to avoid timezone issues

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  // Day 1-7: Menstruation (7 days)
  const menstruationStart = lastPeriodDate;
  const menstruationEnd = addDays(lastPeriodDate, 6);

  // Day 8-10: Possible to Conceive (3 days)
  const possibleToConceive1Start = addDays(lastPeriodDate, 7);
  const possibleToConceive1End = addDays(lastPeriodDate, 9);
  
  // Day 11-14: Ovulation (4 days)
  const ovulationDayStart = addDays(lastPeriodDate, 10);
  const ovulationDayEnd = addDays(lastPeriodDate, 13);
  
  // Day 15-17: Possible to Conceive (3 days)
  const possibleToConceive2Start = addDays(lastPeriodDate, 14);
  const possibleToConceive2End = addDays(lastPeriodDate, 16);

  // Day 18 onwards: Unlikely to Conceive (Luteal Phase)
  const unlikelyToConceiveStart = addDays(lastPeriodDate, 17);
  // The end of this phase is the day before the next period starts
  const unlikelyToConceiveEnd = addDays(lastPeriodDate, cycleLength - 1);

  // Calculate the next period window (5-day range)
  const nextPeriodStart = addDays(lastPeriodDate, cycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, 4);


  return {
    cycleLength,
    phases: {
      menstruation: { start: formatDate(menstruationStart), end: formatDate(menstruationEnd) },
      possibleToConceive1: { start: formatDate(possibleToConceive1Start), end: formatDate(possibleToConceive1End) },
      ovulation: { start: formatDate(ovulationDayStart), end: formatDate(ovulationDayEnd) },
      possibleToConceive2: { start: formatDate(possibleToConceive2Start), end: formatDate(possibleToConceive2End) },
      unlikelyToConceive: { start: formatDate(unlikelyToConceiveStart), end: formatDate(unlikelyToConceiveEnd) },
    },
    nextMenstruationWindow: {
        start: formatDate(nextPeriodStart),
        end: formatDate(nextPeriodEnd)
    },
  };
}
