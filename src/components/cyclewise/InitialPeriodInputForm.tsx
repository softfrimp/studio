'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  initialDate: z.date({
    required_error: 'Your last period start date is required.',
  }),
  cycleLength: z.coerce
    .number()
    .min(15, { message: 'Cycle length must be at least 15 days.' })
    .max(60, { message: 'Cycle length must be at most 60 days.' })
    .default(28),
});

type InitialPeriodInputFormProps = {
  onSubmit: (date: Date, length: number) => Promise<void>;
  initialDate?: Date | null;
  cycleLength?: number;
};

export function InitialPeriodInputForm({ onSubmit, initialDate, cycleLength }: InitialPeriodInputFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cycleLength: cycleLength || 28,
      initialDate: initialDate || undefined
    },
  });

  useEffect(() => {
    // When the props from the parent component update, reset the form
    form.reset({
      initialDate: initialDate || undefined,
      cycleLength: cycleLength || 28,
    });
  }, [initialDate, cycleLength, form]);


  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await onSubmit(data.initialDate, data.cycleLength);
    } catch (error) {
      console.error('Error predicting cycle:', error);
      toast({
        title: 'Error',
        description: 'Could not generate cycle prediction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Start Your Journey</CardTitle>
        <CardDescription>Enter your last period start date and typical cycle length.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="initialDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Period Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cycleLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typical Cycle Length (days)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 28" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Predict My Cycle
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
