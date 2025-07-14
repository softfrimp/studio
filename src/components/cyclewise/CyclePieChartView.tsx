'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PieChartDataPoint } from '@/lib/types';

const COLORS = {
  menstruation: 'hsl(var(--chart-1))', 
  fertile: 'hsl(var(--chart-3))',    
  luteal: 'hsl(var(--chart-4))',       
  other: 'hsl(var(--chart-5))',        
};


export function CyclePieChartView({ prediction }: CyclePieChartViewProps) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);

  useEffect(() => {
    if (!prediction) return;
    
    const data: PieChartDataPoint[] = [];

    const getDays = (start: string, end: string) => differenceInDays(parseISO(end), parseISO(start)) + 1;

    data.push({ name: 'Menstruation', value: getDays(prediction.menstruation.start, prediction.menstruation.end), fill: COLORS.menstruation });
    data.push({ name: 'Fertile Window', value: getDays(prediction.fertile.start, prediction.fertile.end), fill: COLORS.fertile });
    data.push({ name: 'Luteal Phase', value: getDays(prediction.luteal.start, prediction.luteal.end), fill: COLORS.luteal });

    const accountedDays = data.reduce((sum, p) => sum + p.value, 0);
    const cycleLength = accountedDays > 0 ? accountedDays : 28;

    if (accountedDays < cycleLength) {
        data.push({ name: 'Other', value: cycleLength - accountedDays, fill: COLORS.other });
    }

    setPieData(data.filter(d => d.value > 0));
    setTotalCycleLength(cycleLength);

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
