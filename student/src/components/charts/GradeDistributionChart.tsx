'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EmptyState } from '@/src/components/ui/PageState';
import { Grade } from '@/src/types';

const COLORS = ['#C6FF4D', '#A8F52D', '#8FD620', '#76B818', '#5D9A10'];

interface GradeDistributionChartProps {
  grades?: Grade[];
}

export function GradeDistributionChart({ grades = [] }: GradeDistributionChartProps) {
  const gradeGroups = grades.reduce((acc, grade) => {
    const firstLetter = grade.letterGrade.charAt(0);
    acc[firstLetter] = (acc[firstLetter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(gradeGroups).map(([grade, count]) => ({
    name: `Grade ${grade}`,
    value: count,
  }));

  if (data.length === 0) {
    return <EmptyState title="No grade distribution data" />;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#171C17',
            border: '1px solid #252C24',
            borderRadius: '8px',
            color: '#F5F7F2',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
