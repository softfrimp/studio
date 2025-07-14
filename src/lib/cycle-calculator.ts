// src/lib/cycle-calculator.ts
import { addDays, subDays, format } from 'date-fns';
import type { CyclePrediction } from './types';

interface CalculationInput {
  startDate: string; // ISO format YYYY-MM-DD
  cycleLength: number;
}

/**
 * Calculates menstrual cycle phases based on the start date and cycle length.
 * @param input - The start date of the last period and the cycle length.
 * @returns An object containing the predicted dates for various cycle phases.
 */
export function calculateCyclePhases(input: CalculationInput): CyclePrediction {
  const { startDate, cycleLength } = input;
  const lastPeriodDate = new Date(startDate);

  // 1. Next Menstruation Start Date
  const predictedMenstruationStartDate = addDays(lastPeriodDate, cycleLength);

  // 2. Ovulation Date (typically 14 days before next period)
  const ovulationDate = subDays(predictedMenstruationStartDate, 14);

  // 3. Fertile Window (Dangerous Period)
  // Usually starts 5 days before ovulation and ends on ovulation day.
  const dangerousPeriodStart = subDays(ovulationDate, 5);
  const dangerousPeriodEnd = ovulationDate;
  
  // Ovulation period is typically the 24-48 hours around ovulation.
  const ovulationStartDate = subDays(ovulationDate, 1);
  const ovulationEndDate = ovulationDate;


  // 4. Safe Period
  // This is split into two parts: from the end of menstruation to the start of the fertile window,
  // and from the day after ovulation to the day before the next menstruation.
  
  // Assuming menstruation lasts 5 days for this calculation
  const menstruationEnd = addDays(lastPeriodDate, 4);

  // The first safe period is after menstruation and before the fertile window
  const safePeriodStart = addDays(menstruationEnd, 1);
  const safePeriodEnd = subDays(dangerousPeriodStart, 1);

  // For simplicity in the return object, we can represent the safe period as the days
  // outside the fertile window and menstruation. The UI can then parse this.
  // The second safe period starts after ovulation.
  const secondSafePeriodStart = addDays(ovulationDate, 1);
  const secondSafePeriodEnd = subDays(predictedMenstruationStartDate, 1);

  // For the purpose of the CyclePrediction object, let's return the first safe period range.
  // The calendar UI will handle coloring all non-fertile/non-menstruation days correctly.

  return {
    predictedMenstruationStartDate: format(predictedMenstruationStartDate, 'yyyy-MM-dd'),
    safePeriodStart: format(safePeriodStart, 'yyyy-MM-dd'),
    safePeriodEnd: format(secondSafePeriodEnd, 'yyyy-MM-dd'), // Combining both for a full range representation
    ovulationStartDate: format(ovulationStartDate, 'yyyy-MM-dd'),
    ovulationEndDate: format(ovulationEndDate, 'yyyy-MM-dd'),
    dangerousPeriodStart: format(dangerousPeriodStart, 'yyyy-MM-dd'),
    dangerousPeriodEnd: format(dangerousPeriodEnd, 'yyyy-MM-dd'),
  };
}
