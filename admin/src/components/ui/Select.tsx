'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(
          'flex h-10 w-full appearance-none rounded-lg border border-schooly-border bg-schooly-bg-secondary px-3 py-2 pr-10 text-sm text-schooly-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-schooly-primary',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary pointer-events-none" />
    </div>
  )
);

Select.displayName = 'Select';