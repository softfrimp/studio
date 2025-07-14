
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
          const key = phaseInfo.name.replace(/\s+/g, '-').toLowerCase();
          modifiers[key] = { from: parseISO(phase.start), to: parseISO(phase.end) };
          modifiersClassNames[key] = `${phaseInfo.color} ${phaseInfo.textColor}`;
        }
      });
  }
  
  const legendItems = [
    getPhaseInfo('menstruation'),
    getPhaseInfo('possibleToConceive1'),
    getPhaseInfo('ovulation'),
    getPhaseInfo('unlikelyToConceive'),
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
             <Badge key={item.name} variant="outline" className={`px-2 py-1 ${item.color} ${item.textColor} border-foreground/20`}>
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
            day: "h-9 w-9 p-0 font-normal",
            day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
            day_today: 'bg-accent text-accent-foreground rounded-full',
            day_outside: "text-muted-foreground opacity-50",
          }}
        />
      </CardContent>
    </Card>
  );
}
