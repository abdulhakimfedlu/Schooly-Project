import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-schooly-primary disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary:
        'bg-schooly-primary text-schooly-bg hover:bg-schooly-primary-dark',
      secondary:
        'bg-schooly-bg-card text-schooly-text hover:bg-schooly-bg-secondary',
      outline:
        'border-2 border-schooly-border text-schooly-text hover:bg-schooly-bg-card',
      ghost: 'text-schooly-text hover:bg-schooly-bg-card',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-11 px-6 text-lg',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
