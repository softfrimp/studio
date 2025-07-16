
import type { PhaseName } from './cycle-calculator';
import type { Novel } from './novels';

export type PhaseData = { start: string; end: string };

export interface CyclePrediction {
  cycleLength: number;
  // Dates are in 'yyyy-MM-dd' format
  phases: Record<PhaseName, PhaseData | null>;
  nextMenstruationWindow: { start: string; end: string; };
}


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

export interface BarChartDataPoint {
  name: string;
  chance: number;
  fill: string;
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

// Novel Types
export type { Novel };
