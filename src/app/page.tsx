
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, LayoutDashboard, Loader2, Droplets, HeartPulse, Stethoscope } from 'lucide-react';
import Link from 'next/link';

import { Header } from '@/components/cyclewise/Header';
import { InitialPeriodInputForm } from '@/components/cyclewise/InitialPeriodInputForm';
import { CycleCalendarView } from '@/components/cyclewise/CycleCalendarView';
import { CyclePieChartView } from '@/components/cyclewise/CyclePieChartView';
import { PregnancyChanceBarChart } from '@/components/cyclewise/PregnancyChanceBarChart';
import { InspirationalQuotesDisplay } from '@/components/cyclewise/InspirationalQuotesDisplay';
import { FunFactsDisplay } from '@/components/cyclewise/FunFactsDisplay';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';


import type { CyclePrediction } from '@/lib/types';
import { calculateCyclePhases } from '@/lib/cycle-calculator';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};


export default function CycleWisePage() {
  const [initialPeriodDate, setInitialPeriodDate] = useState<Date | null>(null);
  const [currentCycleLength, setCurrentCycleLength] = useState<number>(28);
  const [prediction, setPrediction] = useState<CyclePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!fromEffect) setIsLoading(true);
    setInitialPeriodDate(date);
    setCurrentCycleLength(length);
    if(user) updateInitialPeriod(date, length);
    
    try {
      const predictionData = calculateCyclePhases({
        startDate: format(date, 'yyyy-MM-dd'),
        cycleLength: length
      });
      setPrediction(predictionData);

      if (!fromEffect) toast({ title: 'Cycle Predicted', description: 'Your cycle prediction is ready.' });
    } catch (error) {
      console.error("Error in handleInitialPeriodSubmit:", error);
      toast({ title: 'Prediction Error', description: 'Failed to predict cycle.', variant: 'destructive' });
    } finally {
       if (!fromEffect) {
         setTimeout(() => setIsLoading(false), 500);
       }
    }
  };
  
  const noPredictionsAvailable = !prediction;

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <Droplets className="h-7 w-7 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-primary-foreground">
                  CycleWise
                </h1>
              </div>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/games">
                    <Gamepad2 />
                    Games
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                      <Link href="/exercises">
                          <HeartPulse />
                          Exercises
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                      <Link href="/ai-nurse">
                          <Stethoscope />
                          AI Nurse
                      </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <motion.section 
               className="lg:col-span-1 flex flex-col gap-6"
               initial="hidden"
               animate="visible"
               variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
               }}
            >
              <motion.div variants={cardVariants} custom={0}>
                  <InitialPeriodInputForm 
                    onSubmit={(date, length) => handleInitialPeriodSubmit(date, length)}
                    initialDate={initialPeriodDate}
                    cycleLength={currentCycleLength}
                    isLoading={isLoading}
                  />
              </motion.div>
               <motion.div variants={cardVariants} custom={1}>
                  <InspirationalQuotesDisplay />
              </motion.div>
               <motion.div variants={cardVariants} custom={2}>
                  <FunFactsDisplay />
              </motion.div>
            </motion.section>

            <motion.section 
              className="lg:col-span-2 flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <AnimatePresence mode="wait">
                   <motion.div 
                      key={noPredictionsAvailable ? 'empty' : 'tabs'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      variants={cardVariants} 
                      custom={3}
                   >
                      {noPredictionsAvailable ? (
                          <Card className="glass">
                              <CardHeader>
                                  <CardTitle className="font-headline text-xl">Welcome to CycleWise!</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-muted-foreground">
                                      Begin by entering your last period's start date using the form on the left. 
                                      This will help CycleWise predict your upcoming cycle phases.
                                  </p>
                                  <img src="https://placehold.co/600x300.png" alt="Placeholder for cycle tracking" data-ai-hint="wellness calendar" className="mt-4 rounded-md w-full h-auto object-cover"/>
                              </CardContent>
                          </Card>
                      ) : (
                      <Tabs defaultValue="calendar" className="w-full">
                          <TabsList className="grid w-full grid-cols-3 bg-primary/20">
                            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Calendar</TabsTrigger>
                            <TabsTrigger value="piechart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Pie Chart</TabsTrigger>
                            <TabsTrigger value="barchart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bar Chart</TabsTrigger>
                          </TabsList>
                          <TabsContent value="calendar">
                            <CycleCalendarView 
                                prediction={prediction} 
                                initialDate={initialPeriodDate}
                            />
                          </TabsContent>
                          <TabsContent value="piechart">
                            <CyclePieChartView 
                              prediction={prediction}
                            />
                          </TabsContent>
                           <TabsContent value="barchart">
                            <PregnancyChanceBarChart 
                              prediction={prediction}
                            />
                          </TabsContent>
                      </Tabs>
                      )}
                   </motion.div>
              </AnimatePresence>
            </motion.section>
          </div>
        </main>
        </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
