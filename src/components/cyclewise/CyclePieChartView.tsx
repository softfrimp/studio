'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { addDays, differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PersonalizedCyclePrediction, PieChartDataPoint } from '@/lib/types';

type CyclePieChartViewProps = {
  basicPrediction: CyclePrediction | null;
  personalizedPrediction: PersonalizedCyclePrediction | null;
  aiVisualizationText?: string | null;
};

const COLORS = {
  menstruation: 'var(--chart-1)', // Destructive-like (e.g., red/pink)
  safe: 'var(--chart-2)', // Green-like
  fertile: 'var(--chart-3)', // Accent-like (e.g., orange/yellow)
  ovulation: 'var(--chart-4)', // Special accent (e.g., bright pink/purple)
  other: 'var(--chart-5)', // Muted or neutral
};

const parseDateRange = (rangeStr: string | undefined): { start?: Date, end?: Date } => {
  if (!rangeStr) return {};
  const parts = rangeStr.split(' to ');
  const start = parts[0] ? parseISO(parts[0]) : undefined;
  const end = parts[1] ? parseISO(parts[1]) : undefined;
  return { start, end };
};


export function CyclePieChartView({ basicPrediction, personalizedPrediction, aiVisualizationText }: CyclePieChartViewProps) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);


  useEffect(() => {
    let data: PieChartDataPoint[] = [];
    let cycleLength = 28; // Default or calculated

    if (aiVisualizationText) {
      // Simplified parsing for AI text. Highly dependent on AI output.
      // This is a placeholder and would need robust parsing.
      if (aiVisualizationText.toLowerCase().includes("menstruation is 5 days") && aiVisualizationText.toLowerCase().includes("cycle is 28 days")) {
        data = [
          { name: 'Menstruation (AI)', value: 5, fill: COLORS.menstruation },
          { name: 'Other (AI)', value: 23, fill: COLORS.other },
        ];
        cycleLength = 28;
      }
    } else if (personalizedPrediction) {
      const menstruationStart = parseISO(personalizedPrediction.predictedMenstruation);
      const menstruationDuration = 5; // Assumption
      data.push({ name: 'Menstruation', value: menstruationDuration, fill: COLORS.menstruation });

      const ovulationDate = parseISO(personalizedPrediction.predictedOvulation);
      // Ovulation is usually 1 day, part of fertile window
      // For pie chart, we might represent fertile window instead of just ovulation day
      
      const { start: dangerousStart, end: dangerousEnd } = parseDateRange(personalizedPrediction.predictedDangerousPeriod);
      if (dangerousStart && dangerousEnd) {
        const fertileDuration = differenceInDays(dangerousEnd, dangerousStart) + 1;
        data.push({ name: 'Fertile Window', value: fertileDuration, fill: COLORS.fertile });
      }
      
      // Calculate safe period - this is more complex as it's split
      // For simplicity, we assume the rest of the cycle is 'safe' or 'other' if not covered
      // A proper calculation of total cycle length from personalized data is needed
      // This is a simplification:
      const remainingDays = 28 - data.reduce((sum, p) => sum + p.value, 0); // Assuming 28 day cycle
      if (remainingDays > 0) {
        data.push({ name: 'Other/Safe', value: remainingDays, fill: COLORS.safe });
      }
      cycleLength = 28; // This should be derived or taken from user input if available for personalized

    } else if (basicPrediction) {
      const menstruationStart = parseISO(basicPrediction.predictedMenstruationStartDate);
      const nextMenstruationGuess = addDays(menstruationStart, 28); // Guessing next cycle for length
      cycleLength = differenceInDays(nextMenstruationGuess, menstruationStart); // Approximate from prediction
      
      const menstruationDuration = 5; // Assuming 5 days for basic prediction display
      data.push({ name: 'Menstruation', value: menstruationDuration, fill: COLORS.menstruation });

      const ovulationStart = parseISO(basicPrediction.ovulationStartDate);
      const ovulationEnd = parseISO(basicPrediction.ovulationEndDate);
      const ovulationDuration = differenceInDays(ovulationEnd, ovulationStart) + 1;
      // Ovulation is part of fertile, let's show fertile window
      
      const dangerousStart = parseISO(basicPrediction.dangerousPeriodStart);
      const dangerousEnd = parseISO(basicPrediction.dangerousPeriodEnd);
      const dangerousDuration = differenceInDays(dangerousEnd, dangerousStart) + 1;
      data.push({ name: 'Fertile Window', value: dangerousDuration, fill: COLORS.fertile });
      
      // Safe period is split usually, sum them up
      const safePeriod1Start = parseISO(basicPrediction.safePeriodStart); // before fertile
      const safePeriod1End = parseISO(basicPrediction.ovulationStartDate); // ends before ovulation
      const safeDuration1 = differenceInDays(safePeriod1End, safePeriod1Start);

      const safePeriod2Start = parseISO(basicPrediction.ovulationEndDate); // starts after ovulation
      const safePeriod2End = parseISO(basicPrediction.predictedMenstruationStartDate); // ends before next period
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

  }, [basicPrediction, personalizedPrediction, aiVisualizationText]);

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
