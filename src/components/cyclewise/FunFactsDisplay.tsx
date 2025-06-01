'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { FUN_FACTS } from '@/lib/constants';
import { Button } from '../ui/button';

export function FunFactsDisplay() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const showNextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % FUN_FACTS.length);
  };
  
  useEffect(() => {
    // Initially pick a random fact
    setCurrentFactIndex(Math.floor(Math.random() * FUN_FACTS.length));
  }, []);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent-foreground/80" />
          Did You Know?
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[80px] flex flex-col justify-center items-start">
        <p className="text-foreground/80 mb-3">
          {FUN_FACTS[currentFactIndex]}
        </p>
        <Button variant="link" onClick={showNextFact} className="p-0 h-auto text-sm text-primary-foreground hover:text-accent-foreground">
          Show another fact
        </Button>
      </CardContent>
    </Card>
  );
}
