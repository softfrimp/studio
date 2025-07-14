'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NotebookText, Smile, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const LogSchema = z.object({
  symptoms: z.string().min(3, { message: 'Please describe your symptoms (min 3 characters).' }).max(500),
  mood: z.string({ required_error: 'Please select your mood.' }),
  logDate: z.date().optional().default(() => new Date()), // For future use to log for specific date
});

type SymptomLoggerProps = {
  onSubmit: (symptoms: string, mood: string, cycleHistory: string, initialPeriodDate: string) => Promise<void>;
  initialPeriodDate: Date | null | undefined; // To be used as initialPeriodDate for personalization
  isLoading: boolean;
};

const moodOptions = ["Happy", "Sad", "Anxious", "Irritable", "Calm", "Energetic", "Tired", "Neutral"];

export function SymptomLogger({ onSubmit, initialPeriodDate, isLoading }: SymptomLoggerProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LogSchema>>({
    resolver: zodResolver(LogSchema),
  });

  async function handleSubmit(data: z.infer<typeof LogSchema>) {
    if (!initialPeriodDate) {
      toast({
        title: 'Missing Information',
        description: 'Please set your initial period date first to personalize predictions.',
        variant: 'destructive',
      });
      return;
    }
    
    // For 'cycleHistory', we're simplifying. A real app would build this over time.
    // Here, we'll just pass a placeholder or the initial period date as a very basic history.
    const cycleHistoryPlaceholder = `Initial period: ${format(initialPeriodDate, 'yyyy-MM-dd')}. Current log for ${format(data.logDate || new Date(), 'yyyy-MM-dd')}: Symptoms - ${data.symptoms}, Mood - ${data.mood}.`;
    const formattedInitialDate = format(initialPeriodDate, 'yyyy-MM-dd');

    await onSubmit(data.symptoms, data.mood, cycleHistoryPlaceholder, formattedInitialDate);
    form.reset({symptoms: '', mood: ''});
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <NotebookText className="h-5 w-5 text-primary-foreground/80" />
          Log Your Day
        </CardTitle>
        <CardDescription>Track symptoms and mood for personalized insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., mild cramps, headache" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Smile className="h-4 w-4" /> Mood
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {moodOptions.map(mood => (
                        <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || !initialPeriodDate}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log & Refine Predictions
            </Button>
            {!initialPeriodDate && (
              <p className="text-xs text-destructive text-center">Set your initial period date to enable logging.</p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
