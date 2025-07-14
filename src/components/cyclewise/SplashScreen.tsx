// src/components/cyclewise/SplashScreen.tsx
import { Droplets } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background animate-fade-out" style={{ animationFillMode: 'forwards', animationDuration: '2.5s' }}>
      <div className="flex flex-col items-center justify-center gap-4 animate-pulse-slow">
        <Droplets className="h-16 w-16 text-primary" />
        <h1 className="text-5xl font-headline font-bold text-primary-foreground">
          CycleWise
        </h1>
        <p className="text-muted-foreground">Track with wisdom and care.</p>
      </div>
    </div>
  );
}
