

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
    chartColor: string;
    pregnancyChance: number; // Percentage
    shortName: string;
}

// Storing UI-related info here to keep it coupled with the logic
const PHASE_INFO_MAP: Record<PhaseName, PhaseInfo> = {
    menstruation: { name: 'Menstruation', description: 'Days 1-7: Menstruation', color: 'bg-red-400/30 text-red-900 border-red-400/50', chartColor: '--chart-1', pregnancyChance: 1, shortName: 'Menstruation' },
    possibleToConceive1: { name: 'Possible to Conceive', description: 'Days 8-10: Possible to Conceive', color: 'bg-green-300/30 text-green-800 border-green-300/50', chartColor: '--chart-2', pregnancyChance: 30, shortName: 'Fertile' },
    ovulation: { name: 'Ovulation', description: 'Days 11-14: Ovulation (Fertile Window)', color: 'bg-green-500/40 text-green-900 border-green-500/60 font-bold', chartColor: '--chart-3', pregnancyChance: 90, shortName: 'Ovulation' },
    possibleToConceive2: { name: 'Possible to Conceive', description: 'Days 15-17: Possible to Conceive (Danger Zone)', color: 'bg-green-400/30 text-green-900 border-green-400/50', chartColor: '--chart-2', pregnancyChance: 25, shortName: 'Fertile' },
    unlikelyToConceive: { name: 'Luteal Phase', description: 'Days 18-28: Unlikely to Conceive (Safe Zone)', color: 'bg-blue-400/30 text-blue-900 border-blue-400/50', chartColor: '--chart-4', pregnancyChance: 1, shortName: 'Luteal' }
};

export function getPhaseInfo(phase: PhaseName): PhaseInfo {
    return PHASE_INFO_MAP[phase];
}


/**
 * Calculates menstrual cycle phases based on a specific day-based model.
 * @param input - The start date of the last period and the cycle length.
 * @returns An object containing the predicted dates for various cycle phases.
 */
export function calculateCyclePhases(input: CalculationInput): CyclePrediction {
  const { startDate, cycleLength } = input;
  const lastPeriodDate = new Date(startDate.replace(/-/g, '/')); // Use / to avoid timezone issues

  const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

  // Day 1-7: Menstruation
  const menstruationStart = lastPeriodDate;
  const menstruationEnd = addDays(lastPeriodDate, 6);

  // Day 8-10: Possible to Conceive
  const possibleToConceive1Start = addDays(lastPeriodDate, 7);
  const possibleToConceive1End = addDays(lastPeriodDate, 9);
  
  // Day 11-14: Ovulation
  const ovulationStart = addDays(lastPeriodDate, 10);
  const ovulationEnd = addDays(lastPeriodDate, 13);
  
  // Day 15-17: Possible to Conceive (Danger Zone)
  const possibleToConceive2Start = addDays(lastPeriodDate, 14);
  const possibleToConceive2End = addDays(lastPeriodDate, 16);

  // Day 18-28: Unlikely to Conceive (Safe Zone)
  const unlikelyToConceiveStart = addDays(lastPeriodDate, 17);
  // The end of this phase is the day before the next period starts
  const unlikelyToConceiveEnd = addDays(lastPeriodDate, cycleLength - 1);


  return {
    cycleLength,
    phases: {
      menstruation: { start: formatDate(menstruationStart), end: formatDate(menstruationEnd) },
      possibleToConceive1: { start: formatDate(possibleToConceive1Start), end: formatDate(possibleToConceive1End) },
      ovulation: { start: formatDate(ovulationStart), end: formatDate(ovulationEnd) },
      possibleToConceive2: { start: formatDate(possibleToConceive2Start), end: formatDate(possibleToConceive2End) },
      unlikelyToConceive: { start: formatDate(unlikelyToConceiveStart), end: formatDate(unlikelyToConceiveEnd) },
    },
    nextMenstruationDate: formatDate(addDays(lastPeriodDate, cycleLength)),
  };
}
