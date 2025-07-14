
'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PieChartDataPoint } from '@/lib/types';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

const getDays = (start: string, end: string) => differenceInDays(parseISO(end), parseISO(start)) + 1;

export function CyclePieChartView({ prediction }: { prediction: CyclePrediction | null; }) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);

  useEffect(() => {
    if (!prediction) return;
    
    const data: PieChartDataPoint[] = [];
    let totalDays = 0;

    (Object.keys(prediction.phases) as PhaseName[]).forEach(phaseName => {
        const phase = prediction.phases[phaseName];
        if (phase) {
            const phaseInfo = getPhaseInfo(phaseName);
            const days = getDays(phase.start, phase.end);
            totalDays += days;
            data.push({
                name: phaseInfo.name,
                value: days,
                fill: `hsl(var(${phaseInfo.chartColor}))`
            });
        }
    });

    const cycleLength = prediction.cycleLength;
    setTotalCycleLength(cycleLength);
    
    // Sort for consistent order
    const phaseOrder = ['Menstruation', 'Possible to Conceive', 'Ovulation', 'Unlikely to Conceive'];
    data.sort((a, b) => {
      const aIndex = phaseOrder.findIndex(p => a.name.startsWith(p));
      const bIndex = phaseOrder.findIndex(p => b.name.startsWith(p));
      return aIndex - bIndex;
    });

    setPieData(data.filter(d => d.value > 0));

  }, [prediction]);

  if (pieData.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Cycle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enter your period details to see your cycle overview.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Overview</CardTitle>
        <CardDescription>Estimated {totalCycleLength}-day cycle breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name} (${value} days)`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number, name: string) => [`${value} days`, name]}/>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
