
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

const breathingCycle = [
  { text: 'Inhale', duration: 4000, scale: 1.5 },
  { text: 'Hold', duration: 4000, scale: 1.5 },
  { text: 'Exhale', duration: 6000, scale: 1 },
];

export function BreathingExercise() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cycleStep, setCycleStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setCycleStep((prevStep) => (prevStep + 1) % breathingCycle.length);
      }, breathingCycle[cycleStep].duration);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, cycleStep]);

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if(isAnimating) { // If it was playing, we reset on pause
        setCycleStep(0)
    }
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCycleStep(0);
  };

  const currentPhase = breathingCycle[cycleStep];

  return (
    <Card className="w-full max-w-md glass text-center">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Calm Breathing</CardTitle>
        <CardDescription>Follow the guide to relax your mind and body.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8 p-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full bg-primary/20 rounded-full"
            animate={{
              scale: isAnimating ? [1, 1.2, 1] : 1,
              opacity: isAnimating ? [0.8, 1, 0.8] : 0.5,
            }}
            transition={{
                duration: (breathingCycle[0].duration + breathingCycle[1].duration + breathingCycle[2].duration)/1000,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
          />
          <motion.div
            className="relative w-32 h-32 bg-primary rounded-full shadow-lg"
            animate={{ scale: isAnimating ? currentPhase.scale : 1 }}
            transition={{ duration: currentPhase.duration / 1000, ease: 'easeInOut' }}
          />
           <AnimatePresence mode="wait">
                <motion.span
                    key={cycleStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-2xl font-bold text-primary-foreground pointer-events-none"
                >
                    {isAnimating ? currentPhase.text : 'Start'}
                </motion.span>
            </AnimatePresence>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleToggleAnimation} size="lg" className="w-28">
            {isAnimating ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
            {isAnimating ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outline" size="icon" aria-label="Reset">
            <RefreshCw />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
