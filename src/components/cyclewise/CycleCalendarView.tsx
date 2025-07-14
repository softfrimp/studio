
'use client';

import { useState, useEffect } from 'react';
import { addDays, differenceInDays, format, parseISO, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CyclePrediction, CyclePhase } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

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
      (Object.keys(prediction.phases) as PhaseName[]).forEach(phaseName => {
        const phase = prediction.phases[phaseName];
        if (phase) {
          const phaseInfo = getPhaseInfo(phaseName);
          activePhases.push({ 
            name: phaseInfo.name,
            description: phaseInfo.description,
            startDate: parseISO(phase.start), 
            endDate: parseISO(phase.end), 
            color: phaseInfo.color 
          });
        }
      });
    }
    
    setPhases(activePhases);
    if (activePhases.length > 0 && activePhases[0].startDate) {
      setCurrentMonth(activePhases[0].startDate);
    } else if (initialDate) {
      setCurrentMonth(initialDate);
    }

  }, [prediction, initialDate]);

  const modifiers: Record<string, any> = {
    today: new Date(),
  };
  const modifiersClassNames: Record<string, string> = {
    today: 'border-2 border-primary rounded-md',
  };

  phases.forEach((phase) => {
    const key = phase.description.toLowerCase().replace(/[^a-z0-9]/g, '-');
    modifiers[key] = { from: phase.startDate, to: phase.endDate };
    // Remove border styles to only apply background color for the day cell
    modifiersClassNames[key] = phase.color.replace(/border-[\w-\/]+/, '');
  });


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
  
  const legendItems = [
    getPhaseInfo('menstruation'),
    getPhaseInfo('possibleToConceive1'),
    getPhaseInfo('ovulation'),
    getPhaseInfo('possibleToConceive2'),
    getPhaseInfo('unlikelyToConceive'),
  ];


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
            {legendItems.map(item => (
                <Badge key={item.description} variant="outline" className={`px-2 py-1 ${item.color}`}>
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
