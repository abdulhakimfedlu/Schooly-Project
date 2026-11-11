'use client';

import { BookOpen, User, Clock } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Subject } from '@/src/types';

interface SubjectCardProps {
  subject: Subject;
  onViewDetails: (subject: Subject) => void;
}

export function SubjectCard({ subject, onViewDetails }: SubjectCardProps) {
  return (
    <Card className="hover:border-schooly-primary/30 transition-all">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-schooly-text">
              {subject.name}
            </h3>
            <p className="text-sm text-schooly-text-secondary mt-1">
              {subject.code}
            </p>
          </div>
          <Badge variant="default">{subject.letterGrade}</Badge>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm text-schooly-text-secondary">
            <User className="h-4 w-4" />
            <span>{subject.teacher}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-schooly-text-secondary">
            <Clock className="h-4 w-4" />
            <span>{subject.creditHours} Credit Hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-schooly-text-secondary">
            <BookOpen className="h-4 w-4" />
            <span>Average: {subject.averageMarks}%</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-schooly-border">
          <div className="w-full bg-schooly-bg-secondary rounded-full h-2 mb-3">
            <div
              className="bg-schooly-primary h-2 rounded-full transition-all"
              style={{ width: `${subject.averageMarks}%` }}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onViewDetails(subject)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
