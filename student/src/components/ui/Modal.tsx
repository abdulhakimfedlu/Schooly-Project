'use client';

import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full bg-schooly-bg-card border border-schooly-border rounded-xl shadow-2xl overflow-hidden',
          sizes[size]
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-schooly-border">
            <h2 className="text-xl font-semibold text-schooly-text">{title}</h2>
            <button
              onClick={onClose}
              className="text-schooly-text-secondary hover:text-schooly-text transition-colors p-1 hover:bg-schooly-bg-secondary rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
