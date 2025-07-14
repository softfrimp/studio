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
import { AiVoiceAssistantUI } from '@/components/cyclewise/AiVoiceAssistantUI';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';


import { predictCycle } from '@/ai/flows/predict-cycle';
import { personalizeCyclePredictions } from '@/ai/flows/personalize-cycle-predictions';
import { aiVoiceAssistant } from '@/ai/flows/ai-voice-assistant';

import type { CyclePrediction, PersonalizedCyclePrediction, AiVoiceAssistantOutput } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function CycleWisePage() {
  const [initialPeriodDate, setInitialPeriodDate] = useState<Date | null>(null);
  const [currentCycleLength, setCurrentCycleLength] = useState<number>(28); // Store the cycle length
  const [basicPrediction, setBasicPrediction] = useState<CyclePrediction | null>(null);
  const [personalizedPrediction, setPersonalizedPrediction] = useState<PersonalizedCyclePrediction | null>(null);
  const [aiVoiceResponse, setAiVoiceResponse] = useState<AiVoiceAssistantOutput | null>(null);
  const [isLoading, setIsLoading] = useState({
    basic: false,
    personalized: false,
    ai: false,
  });

  const { toast } = useToast();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  const handleInitialPeriodSubmit = async (date: Date, length: number) => {
    setIsLoading(prev => ({ ...prev, basic: true }));
    setInitialPeriodDate(date);
    setCurrentCycleLength(length); // Save the cycle length
    try {
      const predictionData = await predictCycle({ 
        startDate: format(date, 'yyyy-MM-dd'),
        cycleLength: length 
      });
      setBasicPrediction(predictionData);
      setPersonalizedPrediction(null); // Reset personalized if basic is updated
      setAiVoiceResponse(null); // Reset AI response
      toast({ title: 'Cycle Predicted', description: 'Basic cycle prediction is ready.' });
    } catch (error) {
      console.error("Error in handleInitialPeriodSubmit:", error);
      toast({ title: 'Prediction Error', description: 'Failed to predict cycle.', variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, basic: false }));
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
        cycleHistory, // This is a simplified string representation
        initialPeriodDate: currentInitialDate, 
      });
      setPersonalizedPrediction(personalizedData);
      setAiVoiceResponse(null); // Reset AI response if personalized prediction is made
      toast({ title: 'Predictions Refined', description: 'Your cycle predictions have been personalized.' });
    } catch (error) {
      console.error("Error in handleSymptomLogSubmit:", error);
      toast({ title: 'Personalization Error', description: 'Failed to personalize predictions.', variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, personalized: false }));
    }
  };

  const handleAiVoiceCommand = async (command: string, cycleStartDate?: string) => {
    setIsLoading(prev => ({ ...prev, ai: true }));
    try {
      const response = await aiVoiceAssistant({ 
        voiceCommand: command,
        cycleStartDate: cycleStartDate || (initialPeriodDate ? format(initialPeriodDate, 'yyyy-MM-dd') : undefined)
      });
      setAiVoiceResponse(response);
      // If AI provides visualization text, it will be passed to chart/calendar components
      // If AI provides other direct responses, they can be shown in AiVoiceAssistantUI or here
      if (response.responseText || response.comfortingMessage) {
         toast({ title: 'AI Assistant', description: response.responseText || response.comfortingMessage || "Responded." });
      }
      // If AI visualization implies new data, clear other predictions to give AI priority
      if(response.cycleVisualization) {
        // setBasicPrediction(null); // Optional: uncomment if AI viz should always override
        // setPersonalizedPrediction(null); // Optional: uncomment
      }
    } catch (error) {
      console.error("Error in handleAiVoiceCommand:", error);
      toast({ title: 'AI Assistant Error', description: 'Failed to get response from AI.', variant: 'destructive' });
    } finally {
      setIsLoading(prev => ({ ...prev, ai: false }));
    }
  };
  
  const noPredictionsAvailable = !basicPrediction && !personalizedPrediction && !(aiVoiceResponse?.cycleVisualization);

  if (loading || !user) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Inputs & Actions */}
          <section className="lg:col-span-1 flex flex-col gap-6">
            <InitialPeriodInputForm onSubmit={handleInitialPeriodSubmit} />
            <SymptomLogger 
              onSubmit={handleSymptomLogSubmit} 
              initialPeriodDate={initialPeriodDate} 
            />
            <AiVoiceAssistantUI 
              onSubmit={handleAiVoiceCommand} 
              currentCycleStartDate={initialPeriodDate ? format(initialPeriodDate, 'yyyy-MM-dd') : undefined}
            />
          </section>

          {/* Right Column: Visualizations & Info */}
          <section className="lg:col-span-2 flex flex-col gap-6">
            {noPredictionsAvailable ? (
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Welcome to CycleWise!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Begin by entering your last period's start date using the form on the left. 
                            This will help CycleWise predict your upcoming cycle phases. You can then log symptoms 
                            and use the AI assistant for more personalized insights.
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
                    aiVisualizationText={aiVoiceResponse?.cycleVisualization}
                    initialDate={initialPeriodDate}
                  />
                </TabsContent>
                <TabsContent value="piechart">
                  <CyclePieChartView 
                    basicPrediction={basicPrediction} 
                    personalizedPrediction={personalizedPrediction}
                    aiVisualizationText={aiVoiceResponse?.cycleVisualization}
                  />
                </TabsContent>
              </Tabs>
            )}
            
            {aiVoiceResponse?.responseText && (
              <Card className="shadow-lg bg-muted/30">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">AI Assistant Says:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{aiVoiceResponse.responseText}</p>
                  {aiVoiceResponse.comfortingMessage && <p className="italic mt-2 text-primary-foreground/90 text-sm">{aiVoiceResponse.comfortingMessage}</p>}
                </CardContent>
              </Card>
            )}

            <InspirationalQuotesDisplay />
            <FunFactsDisplay />
          </section>
        </div>
      </main>
    </div>
  );
}
