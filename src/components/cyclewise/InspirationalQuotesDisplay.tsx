'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, QuoteIcon } from 'lucide-react';
import { INSPIRATIONAL_QUOTES } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function InspirationalQuotesDisplay() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % INSPIRATIONAL_QUOTES.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + INSPIRATIONAL_QUOTES.length) % INSPIRATIONAL_QUOTES.length);
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextQuote();
    }, 7000); // Change quote every 7 seconds
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <QuoteIcon className="h-5 w-5 text-accent-foreground/80" />
          Daily Inspiration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center min-h-[100px] flex flex-col justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg italic text-foreground/80 mb-4"
          >
            "{INSPIRATIONAL_QUOTES[currentQuoteIndex]}"
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-center space-x-2 mt-2">
          <Button variant="outline" size="icon" onClick={prevQuote} aria-label="Previous quote">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextQuote} aria-label="Next quote">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
