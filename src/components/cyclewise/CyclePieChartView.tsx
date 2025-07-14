'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { addDays, differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PieChartDataPoint } from '@/lib/types';

type CyclePieChartViewProps = {
  prediction: CyclePrediction | null;
};

const COLORS = {
  menstruation: 'var(--chart-1)', // Destructive-like (e.g., red/pink)
  safe: 'var(--chart-2)', // Green-like
  fertile: 'var(--chart-3)', // Accent-like (e.g., orange/yellow)
  ovulation: 'var(--chart-4)', // Special accent (e.g., bright pink/purple)
  other: 'var(--chart-5)', // Muted or neutral
};

export function CyclePieChartView({ prediction }: CyclePieChartViewProps) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);


  useEffect(() => {
    let data: PieChartDataPoint[] = [];
    let cycleLength = 28; // Default or calculated

    if (prediction) {
      const menstruationStart = parseISO(prediction.predictedMenstruationStartDate);
      const nextMenstruationGuess = addDays(menstruationStart, 28); // Guessing next cycle for length
      cycleLength = differenceInDays(nextMenstruationGuess, menstruationStart); // Approximate from prediction
      
      const menstruationDuration = 5; // Assuming 5 days for basic prediction display
      data.push({ name: 'Menstruation', value: menstruationDuration, fill: COLORS.menstruation });

      const dangerousStart = parseISO(prediction.dangerousPeriodStart);
      const dangerousEnd = parseISO(prediction.dangerousPeriodEnd);
      const dangerousDuration = differenceInDays(dangerousEnd, dangerousStart) + 1;
      data.push({ name: 'Fertile Window', value: dangerousDuration, fill: COLORS.fertile });
      
      // Safe period is split usually, sum them up
      const safePeriod1Start = parseISO(prediction.safePeriodStart); // before fertile
      const safePeriod1End = parseISO(prediction.ovulationStartDate); // ends before ovulation
      const safeDuration1 = differenceInDays(safePeriod1End, safePeriod1Start);

      const safePeriod2Start = parseISO(prediction.ovulationEndDate); // starts after ovulation
      const safePeriod2End = parseISO(prediction.predictedMenstruationStartDate); // ends before next period
      const safeDuration2 = differenceInDays(safePeriod2End, addDays(safePeriod2Start,1)); // +1 since end is exclusive for diff
      
      const totalSafeDuration = Math.max(0, safeDuration1) + Math.max(0, safeDuration2);
      if (totalSafeDuration > 0) {
        data.push({ name: 'Safe Period', value: totalSafeDuration, fill: COLORS.safe });
      }

      // Adjust for any remaining days to match calculated cycleLength
      const accountedDays = data.reduce((sum, p) => sum + p.value, 0);
      if (cycleLength > accountedDays) {
        data.push({ name: 'Other', value: cycleLength - accountedDays, fill: COLORS.other });
      } else if (accountedDays > cycleLength && data.find(d => d.name === 'Safe Period')) {
        // reduce safe period if over accounted
        const diff = accountedDays - cycleLength;
        const safeIdx = data.findIndex(d => d.name === 'Safe Period');
        data[safeIdx].value = Math.max(0, data[safeIdx].value - diff);
      }
      data = data.filter(d => d.value > 0);

    }
    setPieData(data);
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
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
