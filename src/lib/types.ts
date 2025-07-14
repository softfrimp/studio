export interface CyclePrediction {
  // Dates are in 'yyyy-MM-dd' format
  menstruation: { start: string; end: string };
  follicular: { start: string; end: string };
  ovulation: { start: string; end: string }; // This is the most fertile window
  luteal: { start: string; end: string };
  nextMenstruationDate: string;
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
