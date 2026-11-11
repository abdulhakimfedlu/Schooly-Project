import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-schooly-border bg-schooly-bg-secondary px-3 py-2 text-sm text-schooly-text placeholder:text-schooly-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-schooly-primary',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input';
