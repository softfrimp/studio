
'use client';

import { format, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Info } from 'lucide-react';

import type { CyclePrediction } from '@/lib/types';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

type CycleInfoSummaryProps = {
  prediction: CyclePrediction | null;
};

const formatDateRange = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    if (format(startDate, 'LLLL') === format(endDate, 'LLLL')) {
        return `${format(startDate, 'LLLL d')} - ${format(endDate, 'd, yyyy')}`;
    }
    return `${format(startDate, 'LLL d')} - ${format(endDate, 'LLL d, yyyy')}`;
};

export function CycleInfoSummary({ prediction }: CycleInfoSummaryProps) {
  if (!prediction) {
    return null;
  }

  const { phases, nextMenstruationDate } = prediction;

  const summaryItems = [
    { name: 'Menstruation', phase: phases.menstruation, info: getPhaseInfo('menstruation') },
    { name: 'Fertile Window', phase: phases.possibleToConceive1, info: getPhaseInfo('possibleToConceive1') },
    { name: 'Ovulation', phase: phases.ovulation, info: getPhaseInfo('ovulation') },
  ];

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
          <Info className="h-5 w-5 text-accent-foreground/80" />
          Cycle Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {summaryItems.map(item => (
            item.phase && (
              <li key={item.name} className="flex flex-col text-sm">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{item.name}</span>
                    <Badge variant="outline" className={`px-2 py-1 text-xs ${item.info.color} ${item.info.textColor} border-foreground/20`}>
                        {formatDateRange(item.phase.start, item.phase.end)}
                    </Badge>
                </div>
              </li>
            )
          ))}
        </ul>
        <div className="border-t border-border pt-4 flex flex-col text-sm">
           <div className="flex items-center justify-between">
             <span className="font-semibold flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Next Period
             </span>
             <Badge className="text-sm">
                {format(parseISO(nextMenstruationDate), 'MMMM d, yyyy')}
             </Badge>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
