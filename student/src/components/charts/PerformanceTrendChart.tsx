'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { EmptyState } from '@/src/components/ui/PageState';

interface PerformanceData {
  month: string;
  average: number;
}

interface PerformanceTrendChartProps {
  data?: PerformanceData[];
}

export function PerformanceTrendChart({ data = [] }: PerformanceTrendChartProps) {
  if (data.length === 0) {
    return <EmptyState title="No performance trend data" />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252C24" />
        <XAxis dataKey="month" stroke="#A6ADA2" style={{ fontSize: '12px' }} />
        <YAxis stroke="#A6ADA2" style={{ fontSize: '12px' }} domain={[0, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#171C17',
            border: '1px solid #252C24',
            borderRadius: '8px',
            color: '#F5F7F2',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#C6FF4D"
          strokeWidth={3}
          dot={{ fill: '#C6FF4D', r: 5 }}
          activeDot={{ r: 7 }}
          name="Average %"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
