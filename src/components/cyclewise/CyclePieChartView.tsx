
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

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    // Increase the radius to move the label outside the pie
    const radius = outerRadius + 25; 
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';


    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="hsl(var(--foreground))" fill="none" />
        <circle cx={ex} cy={ey} r={2} fill="hsl(var(--foreground))" stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))" className="text-xs font-semibold">
           {`${name.replace(' (Follicular)','').replace(' (Luteal)','')} (${value}d)`}
        </text>
      </g>
    );
};


export function CyclePieChartView({ prediction }: { prediction: CyclePrediction | null; }) {
  const [pieData, setPieData] = useState<PieChartDataPoint[]>([]);
  const [totalCycleLength, setTotalCycleLength] = useState<number>(0);

  useEffect(() => {
    if (!prediction) return;
    
    const data: PieChartDataPoint[] = [];
    
    const phaseOrder: PhaseName[] = ['menstruation', 'possibleToConceive1', 'ovulation', 'possibleToConceive2', 'unlikelyToConceive'];

    phaseOrder.forEach((phaseName) => {
        const phase = prediction.phases[phaseName];
        if (phase) {
            const phaseInfo = getPhaseInfo(phaseName);
            const days = getDays(phase.start, phase.end);
            if (days > 0) {
              // Use a unique name for each distinct phase to prevent grouping
              let uniqueName = phaseInfo.name;
              if (phaseName === 'possibleToConceive1') uniqueName = `Fertile (Follicular)`;
              if (phaseName === 'possibleToConceive2') uniqueName = `Fertile (Luteal)`;

              data.push({
                  name: uniqueName,
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
      <Card className="glass shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Cycle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enter your period details to see your cycle overview.</p>
        </CardContent>
      </Card>
    );
  }
  
  const pieCells = pieData.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
  ));

  return (
    <Card className="glass shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Cycle Overview</CardTitle>
        <CardDescription>Estimated {totalCycleLength}-day cycle breakdown.</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
              paddingAngle={2}
            >
              {pieCells}
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
