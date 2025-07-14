
'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from "react-day-picker"
import { parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CyclePrediction } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

type CycleCalendarViewProps = {
  prediction: CyclePrediction | null;
  initialDate?: Date | null;
};

export function CycleCalendarView({ prediction, initialDate }: CycleCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate || new Date());
  
  useEffect(() => {
    if (initialDate) {
        setCurrentMonth(initialDate);
    }
  }, [initialDate, prediction]);
  
  const modifiers: Record<string, any> = {};
  const modifiersClassNames: Record<string, string> = {};

  if (prediction) {
      (Object.keys(prediction.phases) as PhaseName[]).forEach(phaseName => {
        const phase = prediction.phases[phaseName];
        if (phase) {
          const phaseInfo = getPhaseInfo(phaseName);
          // Use a unique key for each phase to avoid conflicts
          const key = phaseName;
          modifiers[key] = { from: parseISO(phase.start), to: parseISO(phase.end) };
          modifiersClassNames[key] = phaseInfo.color;
        }
      });
  }
  
  const legendItems = [
    getPhaseInfo('menstruation'),
    getPhaseInfo('possibleToConceive1'), // Represents the Fertile Window
    getPhaseInfo('ovulation'),
    getPhaseInfo('unlikelyToConceive'), // Represents the Luteal Phase
  ];
  const uniqueLegendItems = legendItems.filter((item, index, self) =>
    index === self.findIndex((t) => t.name === item.name)
  );

  return (
    <Card className="glass shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {uniqueLegendItems.map((item) => (
             <Badge key={item.name} variant="outline" className={`px-2 py-1 ${item.color.replace('day_', '')} ${item.textColor} border-foreground/20`}>
              {item.name}
            </Badge>
          ))}
        </div>
        <Calendar
          mode="single"
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="p-0 rounded-md border"
          classNames={{
            day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
            day_today: 'bg-accent text-accent-foreground rounded-full',
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle: 'aria-selected:bg-accent/50',
            day: 'h-9 w-9 p-0 font-normal',
            day_menstruation: 'bg-red-400/50 text-red-900 rounded-md',
            day_possibleToConceive1: 'bg-primary/50 text-primary-foreground rounded-md',
            day_ovulation: 'bg-green-400/50 text-green-900 rounded-md',
            day_possibleToConceive2: 'bg-primary/50 text-primary-foreground rounded-md',
            day_unlikelyToConceive: 'bg-blue-300/50 text-blue-900 rounded-md'
          }}
        />
      </CardContent>
    </Card>
  );
}

