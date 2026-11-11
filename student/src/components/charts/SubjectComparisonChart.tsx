'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { EmptyState } from '@/src/components/ui/PageState';
import { Subject } from '@/src/types';

interface SubjectComparisonChartProps {
  subjects?: Subject[];
}

export function SubjectComparisonChart({ subjects = [] }: SubjectComparisonChartProps) {
  const data = subjects.map((subject) => ({
    name: subject.code,
    average: subject.averageMarks ?? 0,
  }));

  if (data.length === 0) {
    return <EmptyState title="No subject comparison data" />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252C24" />
        <XAxis dataKey="name" stroke="#A6ADA2" style={{ fontSize: '12px' }} />
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
        <Bar
          dataKey="average"
          fill="#C6FF4D"
          radius={[8, 8, 0, 0]}
          name="Average %"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
