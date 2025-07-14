
'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { differenceInDays, parseISO } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { CyclePrediction, PieChartDataPoint } from '@/lib/types';
import { getPhaseInfo, PhaseName } from '@/lib/cycle-calculator';

const getDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    return differenceInDays(parseISO(end), parseISO(start)) + 1
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-md shadow-lg">
        <p className="font-bold text-foreground">{`${data.name}`}</p>
        <p className="text-sm text-muted-foreground">{`Duration: ${data.value} days`}</p>
      </div>
    );
  }
  return null;
};

export function CyclePieChartView({ prediction }: { prediction: CyclePrediction | null; }) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);

  useEffect(() => {
    if (!prediction) return;
    
    const data: PieChartDataPoint[] = [];
    
    // This order determines the arrangement in the pie chart.
    const phaseOrder: PhaseName[] = ['menstruation', 'possibleToConceive1', 'ovulation', 'possibleToConceive2', 'unlikelyToConceive'];

    phaseOrder.forEach(phaseName => {
        const phase = prediction.phases[phaseName];
        if (phase) {
            const phaseInfo = getPhaseInfo(phaseName);
            const days = getDays(phase.start, phase.end);
            if (days > 0) {
              data.push({
                  name: phaseInfo.name,
                  value: days,
                  fill: `hsl(var(${phaseInfo.chartColor}))`,
              });
            }
        }
    });

    setTotalCycleLength(prediction.cycleLength);
    setPieData(data);

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
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={50}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name.replace(' (Follicular)','').replace(' (Luteal)','')} (${value}d)`}
              paddingAngle={2}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value, entry) => {
                const { payload } = entry as any;
                return <span className="text-foreground/80">{payload.name}</span>;
              }}
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
