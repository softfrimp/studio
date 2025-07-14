'use client';

import { useState, useEffect } from 'react';
import { addDays, differenceInDays, format, parseISO, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CyclePrediction, CyclePhase } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type CycleCalendarViewProps = {
  prediction: CyclePrediction | null;
  initialDate?: Date | null;
};

export function CycleCalendarView({ prediction, initialDate }: CycleCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate || new Date());
  const [phases, setPhases] = useState<CyclePhase[]>([]);

  useEffect(() => {
    setCurrentMonth(initialDate || new Date());
  }, [initialDate])

  useEffect(() => {
    let activePhases: CyclePhase[] = [];
    
    if (prediction) {
      const menstruationStart = parseISO(prediction.predictedMenstruationStartDate);
      activePhases.push({ name: 'Menstruation', startDate: menstruationStart, endDate: addDays(menstruationStart, 4), color: 'bg-destructive/20 text-destructive-foreground' }); // Assuming 5 days

      const ovulationStart = parseISO(prediction.ovulationStartDate);
      const ovulationEnd = parseISO(prediction.ovulationEndDate);
      activePhases.push({ name: 'Ovulation', startDate: ovulationStart, endDate: ovulationEnd, color: 'bg-accent/30 text-accent-foreground' });
      
      const safeStart = parseISO(prediction.safePeriodStart);
      const safeEnd = parseISO(prediction.safePeriodEnd);
      activePhases.push({ name: 'Safe Period', startDate: safeStart, endDate: safeEnd, color: 'bg-green-500/20 text-green-700' });

      const dangerousStart = parseISO(prediction.dangerousPeriodStart);
      const dangerousEnd = parseISO(prediction.dangerousPeriodEnd);
      activePhases.push({ name: 'Fertile Window', startDate: dangerousStart, endDate: dangerousEnd, color: 'bg-orange-500/20 text-orange-700' });
    }
    
    setPhases(activePhases);
    if (activePhases.length > 0 && activePhases[0].startDate) {
      setCurrentMonth(activePhases[0].startDate);
    } else if (initialDate) {
      setCurrentMonth(initialDate);
    }

  }, [prediction, initialDate]);

  const modifiers = phases.reduce((acc, phase) => {
    acc[phase.name.toLowerCase().replace(/\s+/g, '-')] = { from: phase.startDate, to: phase.endDate };
    return acc;
  }, {} as Record<string, { from: Date, to: Date } | Date>);

  modifiers['today'] = new Date();

  const modifiersClassNames = phases.reduce((acc, phase) => {
    acc[phase.name.toLowerCase().replace(/\s+/g, '-')] = phase.color;
    return acc;
  }, {} as Record<string, string>);

  modifiersClassNames['today'] = 'border-2 border-primary rounded-md';


  if (phases.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Cycle Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enter your period details to see your cycle calendar.</p>
          <Calendar
            mode="single"
            selected={initialDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="p-0 mt-4"
            classNames={{
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground rounded-md",
            }}
          />
        </CardContent>
      </Card>
    );
  }
  
  const legendItems = phases.map(p => ({name: p.name, color: p.color.split(' ')[0] })).filter((value, index, self) => 
    index === self.findIndex((t) => (t.name === value.name && t.color === value.color))
  );


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
            {legendItems.map(item => (
                <Badge key={item.name} variant="outline" className={`px-2 py-1 ${item.color} border-none`}>
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
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                 day_today: `${modifiersClassNames['today']} bg-transparent`, // Keep today distinct if not part of another phase
            }}
        />
      </CardContent>
    </Card>
  );
}
