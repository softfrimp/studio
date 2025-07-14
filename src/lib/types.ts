export interface CyclePrediction {
  predictedMenstruationStartDate: string;
  safePeriodStart: string;
  safePeriodEnd: string;
  ovulationStartDate: string;
  ovulationEndDate: string;
  dangerousPeriodStart: string;
  dangerousPeriodEnd: string;
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
