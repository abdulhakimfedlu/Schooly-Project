'use client';

import { Button } from '@/src/components/ui/Button';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ title = 'No data available', message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm text-schooly-text-secondary">{title}</p>
      {message && <p className="text-xs text-schooly-text-secondary mt-1">{message}</p>}
    </div>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm text-schooly-text-secondary animate-pulse">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="h-8 w-8 text-red-400 mb-3" />
      <p className="text-sm text-red-400 font-medium mb-2">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      )}
    </div>
  );
}
