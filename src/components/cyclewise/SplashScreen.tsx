// src/components/cyclewise/SplashScreen.tsx
import { Droplets } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background animate-pulse-slow bg-hero-pattern">
      <div className="flex flex-col items-center justify-center gap-4">
        <Droplets className="h-16 w-16 text-primary" />
        <h1 className="text-5xl font-headline font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          CycleWise
        </h1>
        <p className="text-muted-foreground">Track with wisdom and care.</p>
      </div>
    </div>
  );
}
