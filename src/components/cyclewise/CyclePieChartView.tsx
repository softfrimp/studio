
'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PieChartDataPoint } from '@/lib/types';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

const getDays = (start: string, end: string) => differenceInDays(parseISO(end), parseISO(start)) + 1;

export function CyclePieChartView({ prediction }: CyclePieChartViewProps) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);

  useEffect(() => {
    if (!prediction) return;
    
    const data: PieChartDataPoint[] = [];

    (Object.keys(prediction.phases) as PhaseName[]).forEach(phaseName => {
        const phase = prediction.phases[phaseName];
        if (phase) {
            const phaseInfo = getPhaseInfo(phaseName);
            data.push({
                name: phaseInfo.name,
                value: getDays(phase.start, phase.end),
                fill: `hsl(var(${phaseInfo.chartColor}))`
            });
        }
    });

    const cycleLength = prediction.cycleLength;
    setTotalCycleLength(cycleLength);
    
    // Combine the two "Possible to Conceive" phases for a cleaner chart
    const combinedData: PieChartDataPoint[] = [];
    const possibleToConceivePhases = data.filter(d => d.name.includes('Possible to Conceive'));

    if (possibleToConceivePhases.length > 0) {
        const totalValue = possibleToConceivePhases.reduce((acc, p) => acc + p.value, 0);
        combinedData.push({
            name: 'Possible to Conceive',
            value: totalValue,
            fill: possibleToConceivePhases[0].fill
        });
    }

    // Add other phases
    data.forEach(d => {
        if (!d.name.includes('Possible to Conceive')) {
            combinedData.push(d);
        }
    });
    
    // Sort for consistent order
    const phaseOrder = ['Menstruation', 'Possible to Conceive', 'Ovulation', 'Unlikely to Conceive'];
    combinedData.sort((a, b) => phaseOrder.indexOf(a.name) - phaseOrder.indexOf(b.name));


    setPieData(combinedData.filter(d => d.value > 0));

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

type CyclePieChartViewProps = {
  prediction: CyclePrediction | null;
};
