// src/ai/flows/personalize-cycle-predictions.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for personalizing cycle predictions based on logged symptoms and mood.
 *
 * - personalizeCyclePredictions - A function that personalizes cycle predictions based on user data.
 * - PersonalizeCyclePredictionsInput - The input type for the personalizeCyclePredictions function.
 * - PersonalizeCyclePredictionsOutput - The return type for the personalizeCyclePredictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeCyclePredictionsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A comma-separated list of symptoms experienced by the user.'),
  mood: z.string().describe('The user\u2019s current mood.'),
  cycleHistory: z
    .string()
    .describe(
      'A string representing the user\u2019s cycle history, including past period dates.'
    ),
  initialPeriodDate: z
    .string()
    .describe('The user\'s initial period date in ISO format (YYYY-MM-DD).'),
});
export type PersonalizeCyclePredictionsInput = z.infer<
  typeof PersonalizeCyclePredictionsInputSchema
>;

const PersonalizeCyclePredictionsOutputSchema = z.object({
  predictedMenstruation: z
    .string()
    .describe('The predicted start date of the next menstruation.'),
  predictedSafePeriod: z
    .string()
    .describe('The predicted start and end dates of the safe period.'),
  predictedOvulation: z
    .string()
    .describe('The predicted date of ovulation.'),
  predictedDangerousPeriod: z
    .string()
    .describe('The predicted start and end dates of the dangerous period.'),
});
export type PersonalizeCyclePredictionsOutput = z.infer<
  typeof PersonalizeCyclePredictionsOutputSchema
>;

export async function personalizeCyclePredictions(
  input: PersonalizeCyclePredictionsInput
): Promise<PersonalizeCyclePredictionsOutput> {
  return personalizeCyclePredictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeCyclePredictionsPrompt',
  input: {schema: PersonalizeCyclePredictionsInputSchema},
  output: {schema: PersonalizeCyclePredictionsOutputSchema},
  prompt: `Given the user's logged symptoms, mood, cycle history, and initial period date, predict the user's upcoming cycle phases.

Symptoms: {{{symptoms}}}
Mood: {{{mood}}}
Cycle History: {{{cycleHistory}}}
Initial Period Date: {{{initialPeriodDate}}}

Consider how symptoms and mood might affect the cycle phases and adjust predictions accordingly. Return the predicted dates for menstruation, safe period, ovulation, and dangerous period.

Please provide the dates in ISO format (YYYY-MM-DD).

Ensure the predicted dates are realistic and logically consistent with the provided information. For example, the ovulation date should fall within the fertile window.
`,
});

const personalizeCyclePredictionsFlow = ai.defineFlow(
  {
    name: 'personalizeCyclePredictionsFlow',
    inputSchema: PersonalizeCyclePredictionsInputSchema,
    outputSchema: PersonalizeCyclePredictionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
