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

const phaseInfo = {
  menstruation: { name: 'Menstruation', color: 'bg-red-400/30 text-red-900 border-red-400/50' },
  follicular: { name: 'Follicular', color: 'bg-pink-400/30 text-pink-900 border-pink-400/50' },
  ovulation: { name: 'Ovulation', color: 'bg-green-400/30 text-green-900 border-green-400/50' },
  luteal: { name: 'Luteal', color: 'bg-blue-400/30 text-blue-900 border-blue-400/50' },
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
      activePhases.push({ 
        name: phaseInfo.menstruation.name, 
        startDate: parseISO(prediction.menstruation.start), 
        endDate: parseISO(prediction.menstruation.end), 
        color: phaseInfo.menstruation.color 
      });
      activePhases.push({ 
        name: phaseInfo.follicular.name, 
        startDate: parseISO(prediction.follicular.start), 
        endDate: parseISO(prediction.follicular.end), 
        color: phaseInfo.follicular.color 
      });
      activePhases.push({ 
        name: phaseInfo.ovulation.name, 
        startDate: parseISO(prediction.ovulation.start), 
        endDate: parseISO(prediction.ovulation.end), 
        color: phaseInfo.ovulation.color 
      });
      activePhases.push({ 
        name: phaseInfo.luteal.name, 
        startDate: parseISO(prediction.luteal.start), 
        endDate: parseISO(prediction.luteal.end), 
        color: phaseInfo.luteal.color
      });
    }
    
    setPhases(activePhases);
    if (activePhases.length > 0 && activePhases[0].startDate) {
      setCurrentMonth(activePhases[0].startDate);
    } else if (initialDate) {
      setCurrentMonth(initialDate);
    }

  }, [prediction, initialDate]);

  const modifiers = phases.reduce((acc, phase) => {
    const key = phase.name.toLowerCase().replace(/\s+/g, '-');
    acc[key] = { from: phase.startDate, to: phase.endDate };
    return acc;
  }, {} as Record<string, { from: Date, to: Date } | Date>);

  modifiers['today'] = new Date();

  const modifiersClassNames = phases.reduce((acc, phase) => {
    const key = phase.name.toLowerCase().replace(/\s+/g, '-');
    acc[key] = phase.color.replace(/border-[\w-\/]+/, ''); // Remove border for background
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
  
  const legendItems = [
    phaseInfo.menstruation,
    phaseInfo.follicular,
    phaseInfo.ovulation,
    phaseInfo.luteal
  ];


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
            {legendItems.map(item => (
                <Badge key={item.name} variant="outline" className={`px-2 py-1 ${item.color}`}>
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
