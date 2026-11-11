import { LucideIcon } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-schooly-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-schooly-text">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-schooly-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-schooly-primary" />
        </div>
      </div>
    </Card>
  );
}
