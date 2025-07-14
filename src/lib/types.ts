import type { PredictCycleOutput } from '@/ai/flows/predict-cycle';
import type { PersonalizeCyclePredictionsOutput } from '@/ai/flows/personalize-cycle-predictions';

export type CyclePrediction = PredictCycleOutput;
export type PersonalizedCyclePrediction = PersonalizeCyclePredictionsOutput;

export interface CyclePhase {
  name: string;
  startDate: Date;
  endDate: Date;
  color: string; // CSS color or Tailwind class
}

export interface PieChartDataPoint {
  name: string;
  value: number; // duration in days
  fill: string; // HSL variable for chart color
}

// Auth Types
export interface SignUpData {
  email: string;
  password?: string;
  lastPeriodDate: string; // ISO string
  cycleLength: number;
  periodDuration: number;
}

export interface LoginData {
    email: string;
    password?: string;
}
