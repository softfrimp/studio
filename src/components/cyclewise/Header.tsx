import { Droplets } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary/80 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-primary-foreground">
            CycleWise
          </h1>
        </div>
      </div>
    </header>
  );
}
