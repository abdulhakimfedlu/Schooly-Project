import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-schooly-border bg-schooly-bg-secondary px-3 py-2 text-sm text-schooly-text placeholder:text-schooly-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-schooly-primary disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
