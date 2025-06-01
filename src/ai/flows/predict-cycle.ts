'use server';

/**
 * @fileOverview Predicts menstruation, safe, ovulation, and dangerous periods based on the entered start date.
 *
 * - predictCycle - A function that handles the cycle prediction process.
 * - PredictCycleInput - The input type for the predictCycle function.
 * - PredictCycleOutput - The return type for the predictCycle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictCycleInputSchema = z.object({
  startDate: z
    .string()
    .describe('The start date of the last menstruation cycle (ISO 8601 format).'),
  cycleLength: z
    .number()
    .optional()
    .default(28)
    .describe('The typical length of the cycle in days.'),
});
export type PredictCycleInput = z.infer<typeof PredictCycleInputSchema>;

const PredictCycleOutputSchema = z.object({
  predictedMenstruationStartDate: z
    .string()
    .describe('The predicted start date of the next menstruation (ISO 8601 format).'),
  safePeriodStart: z
    .string()
    .describe('The start date of the safe period (ISO 8601 format).'),
  safePeriodEnd: z.string().describe('The end date of the safe period (ISO 8601 format).'),
  ovulationStartDate: z
    .string()
    .describe('The start date of the ovulation period (ISO 8601 format).'),
  ovulationEndDate: z
    .string()
    .describe('The end date of the ovulation period (ISO 8601 format).'),
  dangerousPeriodStart: z
    .string()
    .describe('The start date of the dangerous period (ISO 8601 format).'),
  dangerousPeriodEnd: z
    .string()
    .describe('The end date of the dangerous period (ISO 8601 format).'),
});
export type PredictCycleOutput = z.infer<typeof PredictCycleOutputSchema>;

export async function predictCycle(input: PredictCycleInput): Promise<PredictCycleOutput> {
  return predictCycleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictCyclePrompt',
  input: {schema: PredictCycleInputSchema},
  output: {schema: PredictCycleOutputSchema},
  prompt: `You are an expert in predicting menstruation cycles.

  Based on the provided start date of the last menstruation and the typical cycle length, predict the following:

  - predictedMenstruationStartDate: The predicted start date of the next menstruation.
  - safePeriodStart: The start date of the safe period (less likely to conceive).
  - safePeriodEnd: The end date of the safe period.
  - ovulationStartDate: The start date of the ovulation period (most likely to conceive).
  - ovulationEndDate: The end date of the ovulation period.
  - dangerousPeriodStart: The start date of the dangerous period (high chance of conceiving).
  - dangerousPeriodEnd: The end date of the dangerous period.

  Start Date: {{{startDate}}}
  Cycle Length: {{{cycleLength}}}

  Format all dates in ISO 8601 format (YYYY-MM-DD).
  Return the output in JSON format.`,
});

const predictCycleFlow = ai.defineFlow(
  {
    name: 'predictCycleFlow',
    inputSchema: PredictCycleInputSchema,
    outputSchema: PredictCycleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
