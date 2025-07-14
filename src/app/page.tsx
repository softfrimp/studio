'use client';

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';

import { Header } from '@/components/cyclewise/Header';
import { InitialPeriodInputForm } from '@/components/cyclewise/InitialPeriodInputForm';
import { CycleCalendarView } from '@/components/cyclewise/CycleCalendarView';
import { CyclePieChartView } from '@/components/cyclewise/CyclePieChartView';
import { InspirationalQuotesDisplay } from '@/components/cyclewise/InspirationalQuotesDisplay';
import { FunFactsDisplay } from '@/components/cyclewise/FunFactsDisplay';
import { SymptomLogger } from '@/components/cyclewise/SymptomLogger';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';


import { predictCycle } from '@/ai/flows/predict-cycle';
import { personalizeCyclePredictions } from '@/ai/flows/personalize-cycle-predictions';

import type { CyclePrediction, PersonalizedCyclePrediction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function CycleWisePage() {
  const [initialPeriodDate, setInitialPeriodDate] = useState<Date | null>(null);
  const [currentCycleLength, setCurrentCycleLength] = useState<number>(28);
  const [basicPrediction, setBasicPrediction] = useState<CyclePrediction | null>(null);
  const [personalizedPrediction, setPersonalizedPrediction] = useState<PersonalizedCyclePrediction | null>(null);
  const [isLoading, setIsLoading] = useState({
    basic: false,
    personalized: false,
  });

  const { toast } = useToast();
  const { user, loading, updateInitialPeriod } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until loading is false
    if (!user) {
      router.push('/login');
    } else if (user && user.lastPeriodDate && !initialPeriodDate) {
      const date = parseISO(user.lastPeriodDate);
      setInitialPeriodDate(date);
      const cycleLength = user.cycleLength || 28;
      setCurrentCycleLength(cycleLength);
      handleInitialPeriodSubmit(date, cycleLength, true); // Pass true to avoid loading spinner on initial load
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);


  const handleInitialPeriodSubmit = async (date: Date, length: number, fromEffect = false) => {
    if (!fromEffect) setIsLoading(prev => ({ ...prev, basic: true }));
    setInitialPeriodDate(date);
    setCurrentCycleLength(length);
    if(user) updateInitialPeriod(date, length);
    try {
      const predictionData = await predictCycle({ 
        startDate: format(date, 'yyyy-MM-dd'),
        cycleLength: length 
      });
      setBasicPrediction(predictionData);
      setPersonalizedPrediction(null);
      if (!fromEffect) toast({ title: 'Cycle Predicted', description: 'Basic cycle prediction is ready.' });
    } catch (error) {
      console.error("Error in handleInitialPeriodSubmit:", error);
      toast({ title: 'Prediction Error', description: 'Failed to predict cycle.', variant: 'destructive' });
    } finally {
      if (!fromEffect) setIsLoading(prev => ({ ...prev, basic: false }));
    }
  };

  const handleSymptomLogSubmit = async (symptoms: string, mood: string, cycleHistory: string, currentInitialDate: string) => {
    if (!initialPeriodDate) {
      toast({ title: 'Initial Date Needed', description: 'Please set your initial period date first.', variant: 'destructive' });
      return;
    }
    setIsLoading(prev => ({ ...prev, personalized: true }));
    try {
      const personalizedData = await personalizeCyclePredictions({
        symptoms,
        mood,
        cycleHistory, 
        initialPeriodDate: currentInitialDate, 
      });
      setPersonalizedPrediction(personalizedData);
      toast({ title: 'Predictions Refined', description: 'Your cycle predictions have been personalized.' });
    } catch (error) {
      console.error("Error in handleSymptomLogSubmit:", error);
      toast({ title: 'Personalization Error', description: 'Failed to personalize predictions.', variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, personalized: false }));
    }
  };
  
  const noPredictionsAvailable = !basicPrediction && !personalizedPrediction;

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <section className="lg:col-span-1 flex flex-col gap-6">
            <InitialPeriodInputForm 
              onSubmit={(date, length) => handleInitialPeriodSubmit(date, length)}
              initialDate={initialPeriodDate}
              cycleLength={currentCycleLength}
              isLoading={isLoading.basic}
            />
            <SymptomLogger 
              onSubmit={handleSymptomLogSubmit} 
              initialPeriodDate={initialPeriodDate}
              isLoading={isLoading.personalized}
            />
          </section>

          <section className="lg:col-span-2 flex flex-col gap-6">
            {noPredictionsAvailable ? (
                 <Card className="glass">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Welcome to CycleWise!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Begin by entering your last period's start date using the form on the left. 
                            This will help CycleWise predict your upcoming cycle phases. You can then log symptoms 
                            for more personalized insights.
                        </p>
                         <img src="https://placehold.co/600x300.png" alt="Placeholder for cycle tracking" data-ai-hint="wellness calendar" className="mt-4 rounded-md w-full h-auto object-cover"/>
                    </CardContent>
                </Card>
            ) : (
              <Tabs defaultValue="calendar" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-primary/20">
                  <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Calendar View</TabsTrigger>
                  <TabsTrigger value="piechart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Pie Chart View</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar">
                  <CycleCalendarView 
                    basicPrediction={basicPrediction} 
                    personalizedPrediction={personalizedPrediction}
                    initialDate={initialPeriodDate}
                  />
                </TabsContent>
                <TabsContent value="piechart">
                  <CyclePieChartView 
                    basicPrediction={basicPrediction} 
                    personalizedPrediction={personalizedPrediction}
                  />
                </TabsContent>
              </Tabs>
            )}

            <InspirationalQuotesDisplay />
            <FunFactsDisplay />
          </section>
        </div>
      </main>
    </div>
  );
}
