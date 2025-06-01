import type { PredictCycleOutput } from '@/ai/flows/predict-cycle';
import type { PersonalizeCyclePredictionsOutput } from '@/ai/flows/personalize-cycle-predictions';
import type { AiVoiceAssistantOutput as AiVoiceAssistantFlowOutput } from '@/ai/flows/ai-voice-assistant';

export type CyclePrediction = PredictCycleOutput;
export type PersonalizedCyclePrediction = PersonalizeCyclePredictionsOutput;
export type AiVoiceAssistantOutput = AiVoiceAssistantFlowOutput;

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
