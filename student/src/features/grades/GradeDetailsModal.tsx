'use client';

import { Modal } from '@/src/components/ui/Modal';
import { Badge } from '@/src/components/ui/Badge';
import { Grade } from '@/src/types';
import { formatDate } from '@/src/lib/utils';
interface GradeDetailsModalProps {
  grade: Grade | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GradeDetailsModal({ grade, isOpen, onClose }: GradeDetailsModalProps) {
  if (!grade) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Grade Details" size="lg">
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
                {grade.subjectName}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Subject Code</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {grade.subjectCode}
              </p>
            </div>
          </div>
        </div>

        {/* Exam Information */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            Exam Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-schooly-text-secondary">Exam Type</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {grade.examType}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Exam Date</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {grade.examDate ? formatDate(grade.examDate) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Academic Term</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {grade.term}
              </p>
            </div>
            <div>
              <p className="text-xs text-schooly-text-secondary">Academic Year</p>
              <p className="text-sm font-medium text-schooly-text mt-1">
                {grade.academicYear}
              </p>
            </div>
          </div>
        </div>

        {/* Grade Performance */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            Grade Performance
          </h3>
          <div className="bg-schooly-bg-secondary rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm text-schooly-text-secondary mb-2">
                  Marks Obtained
                </p>
                <p className="text-3xl font-bold text-schooly-primary">
                  {grade.marksObtained}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-schooly-text-secondary mb-2">
                  Maximum Marks
                </p>
                <p className="text-3xl font-bold text-schooly-text">
                  {grade.maximumMarks}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-schooly-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-schooly-text-secondary">Percentage</p>
                  <p className="text-2xl font-bold text-schooly-text mt-1">
                    {grade.percentage}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-schooly-text-secondary">Letter Grade</p>
                  <Badge
                    variant={grade.status === 'Passed' ? 'success' : 'error'}
                    className="text-lg px-4 py-2 mt-1"
                  >
                    {grade.letterGrade}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-medium text-schooly-text-secondary mb-3">
            Academic Status
          </h3>
          <div
            className={`p-4 rounded-lg ${
              grade.status === 'Passed'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            <Badge variant={grade.status === 'Passed' ? 'success' : 'error'}>
              {grade.status}
            </Badge>
            <p className="text-sm text-schooly-text-secondary mt-2">
              {grade.status === 'Passed'
                ? 'Congratulations! You have successfully passed this examination.'
                : 'You did not meet the passing requirements for this examination.'}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
