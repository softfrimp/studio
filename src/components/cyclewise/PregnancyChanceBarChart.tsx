
'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, BarChartDataPoint } from '@/lib/types';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-md shadow-lg">
        <p className="font-bold text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{`Chance of Pregnancy: ~${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export function PregnancyChanceBarChart({ prediction }: { prediction: CyclePrediction | null; }) {
  const [barData, setBarData] = useState<BarChartDataPoint[]>([]);

  useEffect(() => {
    if (!prediction) return;

    const data: BarChartDataPoint[] = [];
    const phaseOrder: PhaseName[] = ['menstruation', 'possibleToConceive1', 'ovulation', 'unlikelyToConceive'];

    // We can simplify the bar chart to show the main phases
    const displayPhases: Record<string, PhaseName> = {
      'Menstruation': 'menstruation',
      'Fertile Window': 'possibleToConceive1',
      'Ovulation': 'ovulation',
      'Luteal Phase': 'unlikelyToConceive'
    };

    Object.entries(displayPhases).forEach(([displayName, phaseName]) => {
      const phaseInfo = getPhaseInfo(phaseName);
       data.push({
          name: displayName,
          chance: phaseInfo.pregnancyChance,
          fill: `hsl(var(${phaseInfo.chartColor}))`,
        });
    });
    
    setBarData(data);

  }, [prediction]);

  if (barData.length === 0) {
    return (
      <Card className="glass shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Pregnancy Chance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No prediction data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Pregnancy Chance</CardTitle>
        <CardDescription>Estimated chance of conception by cycle phase.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--accent) / 0.2)' }} />
            <Bar dataKey="chance" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
