'use client';

import { Modal } from '@/src/components/ui/Modal';
import { Badge } from '@/src/components/ui/Badge';
import { Subject } from '@/src/types';
import { Grade } from '@/src/types';
import { formatDate } from '@/src/lib/utils';
import { EmptyState } from '@/src/components/ui/PageState';

interface SubjectDetailsModalProps {
  subject: Subject | null;
  grades: Grade[];
  isOpen: boolean;
  onClose: () => void;
}

export function SubjectDetailsModal({
  subject,
  grades,
  isOpen,
  onClose,
}: SubjectDetailsModalProps) {
  if (!subject) return null;

  const subjectGrades = grades.filter((g) => g.subjectId === subject.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Subject Details" size="xl">
      <div className="space-y-6">
        {/* Subject Information */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            Subject Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-schooly-text-secondary">Subject Name</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {subject.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Subject Code</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {subject.code}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Instructor</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {subject.teacher}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Credit Hours</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {subject.creditHours}
              </p>
            </div>
          </div>
          {subject.description && (
            <div className="mt-4">
              <p className="text-xs text-schooly-text-secondary">Description</p>
              <p className="text-sm text-schooly-text mt-1">{subject.description}</p>
            </div>
          )}
        </div>

        {/* Performance */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            Performance
          </h3>
          <div className="bg-schooly-bg-secondary rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-schooly-text-secondary">
                  Average Marks
                </p>
                <p className="text-3xl font-bold text-schooly-primary mt-2">
                  {subject.averageMarks}%
                </p>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                {subject.letterGrade}
              </Badge>
            </div>
          </div>
        </div>

        {/* All Grades for this Subject */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            All Grades
          </h3>
          <div className="space-y-3">
            {subjectGrades.length === 0 ? (
              <EmptyState title="No grades recorded for this subject" />
            ) : (
              subjectGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="flex items-center justify-between p-4 bg-schooly-bg-secondary rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-schooly-text">
                      {grade.examType}
                    </p>
                    <p className="text-xs text-schooly-text-secondary mt-1">
                      {grade.examDate ? formatDate(grade.examDate) : 'N/A'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-schooly-text">
                        {grade.marksObtained}/{grade.maximumMarks}
                      </p>
                      <p className="text-xs text-schooly-text-secondary">
                        {grade.percentage}%
                      </p>
                    </div>
                    <Badge
                      variant={grade.status === 'Passed' ? 'success' : 'error'}
                    >
                      {grade.letterGrade}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
