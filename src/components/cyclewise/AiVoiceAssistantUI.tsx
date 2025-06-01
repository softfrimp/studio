'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mic, Loader2, BotMessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { AiVoiceAssistantOutput } from '@/lib/types'; // Use the aliased type

const VoiceCommandSchema = z.object({
  command: z.string().min(3, { message: 'Please enter a command (min 3 characters).' }).max(200),
});

type AiVoiceAssistantUIProps = {
  onSubmit: (command: string, cycleStartDate?: string) => Promise<void>;
  currentCycleStartDate?: string | null; // Pass this from page state if available
};

export function AiVoiceAssistantUI({ onSubmit, currentCycleStartDate }: AiVoiceAssistantUIProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiVoiceAssistantOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof VoiceCommandSchema>>({
    resolver: zodResolver(VoiceCommandSchema),
  });

  async function handleSubmit(data: z.infer<typeof VoiceCommandSchema>) {
    setIsLoading(true);
    setAiResponse(null); 
    try {
      // The AI flow will handle the response, including visualization text
      await onSubmit(data.command, currentCycleStartDate || undefined);
      // The parent component (page.tsx) will receive the full AI response and update shared state
      // This component can show direct text responses or comforting messages.
      toast({
        title: 'AI Assistant Responded',
        description: 'Check the relevant sections for updates.',
      });
      form.reset({command: ''});
    } catch (error) {
      console.error('Error with AI Voice Assistant:', error);
      toast({
        title: 'AI Error',
        description: 'Could not get a response from the assistant. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary-foreground/80" />
          AI Voice Assistant
        </CardTitle>
        <CardDescription>Ask questions or get help with your cycle. (Text input for now)</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Command</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'What's my predicted period?' or 'Show my cycle'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ask AI
            </Button>
          </form>
        </Form>
        {/* Display direct text responses or comforting messages here if needed */}
        {/* The main cycle visualization updates will be handled by page.tsx */}
        {aiResponse && (aiResponse.responseText || aiResponse.comfortingMessage) && (
          <Card className="mt-4 bg-muted/50">
            <CardHeader>
                <CardTitle className="text-base font-headline flex items-center gap-2"><BotMessageSquare className="h-5 w-5" /> AI Response</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {aiResponse.responseText && <p>{aiResponse.responseText}</p>}
              {aiResponse.comfortingMessage && <p className="italic mt-2 text-primary-foreground/90">{aiResponse.comfortingMessage}</p>}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
