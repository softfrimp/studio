'use server';

/**
 * @fileOverview An AI voice assistant for the CycleWise app.
 *
 * - aiVoiceAssistant - A function that handles voice commands and provides cycle information and assistance.
 * - AiVoiceAssistantInput - The input type for the aiVoiceAssistant function.
 * - AiVoiceAssistantOutput - The return type for the aiVoiceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiVoiceAssistantInputSchema = z.object({
  voiceCommand: z.string().describe('The voice command from the user.'),
  cycleStartDate: z.string().optional().describe('The user provided cycle start date'),
});
export type AiVoiceAssistantInput = z.infer<typeof AiVoiceAssistantInputSchema>;

const AiVoiceAssistantOutputSchema = z.object({
  responseText: z.string().describe('The response text from the AI assistant.'),
  cycleVisualization: z.string().optional().describe('A description of the cycle visualization for display.'),
  comfortingMessage: z.string().optional().describe('A comforting message for the user.'),
});
export type AiVoiceAssistantOutput = z.infer<typeof AiVoiceAssistantOutputSchema>;

export async function aiVoiceAssistant(input: AiVoiceAssistantInput): Promise<AiVoiceAssistantOutput> {
  return aiVoiceAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiVoiceAssistantPrompt',
  input: {schema: AiVoiceAssistantInputSchema},
  output: {schema: AiVoiceAssistantOutputSchema},
  prompt: `You are a helpful and friendly AI voice assistant for the CycleWise app, designed to provide information and support related to menstrual cycles.

You should:

1.  Understand and respond to voice commands related to cycle tracking, predictions, and general assistance.
2.  If the user asks about their cycle, and the cycleStartDate is provided, use that date to provide information about predicted menstruation, safe, ovulation, and dangerous periods.
3.  Offer comforting and supportive messages when appropriate, especially if the user expresses negative feelings or discomfort.
4.  If asked to display a cycle visualization, describe the visualization in a way that can be rendered in a pie chart and calendar format. Always include a description of the different periods to be displayed.
5.  Be concise and easy to understand in your responses.

Voice Command: {{{voiceCommand}}}
{{~#if cycleStartDate}}
Cycle Start Date: {{{cycleStartDate}}}
{{~/if}}

Response: {
  "responseText": "",
  "cycleVisualization": "",
  "comfortingMessage": ""
}
`,
});

const aiVoiceAssistantFlow = ai.defineFlow(
  {
    name: 'aiVoiceAssistantFlow',
    inputSchema: AiVoiceAssistantInputSchema,
    outputSchema: AiVoiceAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
