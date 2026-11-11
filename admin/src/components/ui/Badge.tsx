import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      success: 'bg-green-500/10 text-green-400 border-green-500/20',
      error: 'bg-red-500/10 text-red-400 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      default: 'bg-schooly-bg-card text-schooly-text border-schooly-border',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';