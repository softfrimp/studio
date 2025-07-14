'use server';
/**
 * @fileOverview A flow for generating quiz questions about menstrual health.
 *
 * - generateQuiz - A function that generates a set of quiz questions.
 * - QuizQuestion - The type for a single quiz question.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuizQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of four possible answers.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The index of the correct answer in the options array.'),
  explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

const QuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).length(5).describe('An array of 5 quiz questions.'),
});

type QuizOutput = z.infer<typeof QuizOutputSchema>;

const generateQuizPrompt = ai.definePrompt({
    name: 'generateQuizPrompt',
    input: { schema: z.object({ topic: z.string() }) },
    output: { schema: QuizOutputSchema },
    prompt: `You are an expert in health education, specializing in creating fun and informative quizzes.
  
    Generate a quiz with 5 multiple-choice questions about the specified topic: {{{topic}}}.
  
    For each question, provide:
    1.  The question text.
    2.  Four possible answers (options).
    3.  The index of the correct answer.
    4.  A brief, easy-to-understand explanation for the correct answer.
  
    Ensure the questions are suitable for a general audience, are factually accurate, and cover a range of concepts within the topic. Make the questions engaging and not overly technical.
    `,
  });
  

const quizFlow = ai.defineFlow(
    {
        name: 'quizFlow',
        inputSchema: z.object({ topic: z.string() }),
        outputSchema: QuizOutputSchema,
    },
    async (input) => {
        const { output } = await generateQuizPrompt(input);
        return output!;
    }
);

export async function generateQuiz(topic: string): Promise<QuizOutput> {
    return await quizFlow({ topic });
}
