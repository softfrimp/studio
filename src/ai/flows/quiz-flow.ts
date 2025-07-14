
'use server';
/**
 * @fileOverview A quiz generation AI flow.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - QuizQuestion - The type for a single quiz question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).length(4).describe('A list of four possible answers.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The 0-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
});

const QuizOutputSchema = z.array(QuizQuestionSchema).length(5).describe('An array of 5 quiz questions.');

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function generateQuiz(topic: string): Promise<QuizQuestion[]> {
  return quizFlow(topic);
}

const quizPrompt = ai.definePrompt({
  name: 'quizPrompt',
  input: {schema: z.string()},
  output: {schema: QuizOutputSchema},
  prompt: `Generate a 5-question multiple-choice quiz about {{input}}.
    Each question should have 4 options.
    Provide the question, the options, the index of the correct answer, and a brief explanation for the correct answer.`,
});

const quizFlow = ai.defineFlow(
  {
    name: 'quizFlow',
    inputSchema: z.string(),
    outputSchema: QuizOutputSchema,
  },
  async (topic) => {
    const {output} = await quizPrompt(topic);
    return output || [];
  }
);
