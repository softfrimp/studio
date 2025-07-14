
'use server';
/**
 * @fileOverview An AI Nurse assistant flow.
 *
 * - askAiNurse - A function to ask the AI nurse a question.
 * - AiNurseInput - The input type for the askAiNurse function.
 * - AiNurseOutput - The return type for the askAiNurse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiNurseInputSchema = z.string().describe('The user\'s question for the AI Nurse.');
export type AiNurseInput = z.infer<typeof AiNurseInputSchema>;

const AiNurseOutputSchema = z.object({
  answer: z.string().describe('The helpful and informative answer to the user\'s question.'),
});
export type AiNurseOutput = z.infer<typeof AiNurseOutputSchema>;

export async function askAiNurse(input: AiNurseInput): Promise<AiNurseOutput> {
  return aiNurseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiNursePrompt',
  input: { schema: AiNurseInputSchema },
  output: { schema: AiNurseOutputSchema },
  prompt: `You are an empathetic and knowledgeable AI Nurse specializing in women's health, menstrual cycles, and general wellness. Your goal is to provide clear, helpful, and safe information.

  User's question: {{{input}}}
  
  Please provide a supportive and informative answer to the user's question.
  - Break down complex topics into easy-to-understand points.
  - If the question is about symptoms, you can provide general information about common causes, but do not diagnose.
  - Always encourage the user to consult with a healthcare professional for personal medical advice.
  - Do not provide dosage information for any medication. You can mention types of over-the-counter medication if relevant (e.g., "pain relievers like ibuprofen"), but do not suggest amounts.
  - Keep your tone warm, reassuring, and professional.`,
});

const aiNurseFlow = ai.defineFlow(
  {
    name: 'aiNurseFlow',
    inputSchema: AiNurseInputSchema,
    outputSchema: AiNurseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
