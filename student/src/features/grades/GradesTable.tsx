'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Grade } from '@/src/types';
import { formatDate } from '@/src/lib/utils';
import { GradeDetailsModal } from './GradeDetailsModal';

interface GradesTableProps {
  grades: Grade[];
}

export function GradesTable({ grades }: GradesTableProps) {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (grade: Grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-schooly-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">
                Subject
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">
                Code
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">
                Exam Type
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-schooly-text">
                Date
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                Obtained
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                Max
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                %
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                Grade
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                Status
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-schooly-text">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr
                key={grade.id}
                className="border-b border-schooly-border hover:bg-schooly-bg-card transition-colors"
              >
                <td className="py-4 px-4 text-sm text-schooly-text">
                  {grade.subjectName}
                </td>
                  <td className="py-4 px-4 text-sm text-schooly-text-secondary">
                    {grade.subjectCode ?? '—'}
                  </td>
                <td className="py-4 px-4 text-sm text-schooly-text">
                  {grade.examType}
                </td>
                  <td className="py-4 px-4 text-sm text-schooly-text-secondary">
                    {grade.examDate ? formatDate(grade.examDate) : '—'}
                  </td>
                <td className="py-4 px-4 text-sm text-center font-semibold text-schooly-text">
                  {grade.marksObtained}
                </td>
                  <td className="py-4 px-4 text-sm text-center text-schooly-text-secondary">
                    {grade.maximumMarks}
                  </td>
                <td className="py-4 px-4 text-sm text-center font-semibold text-schooly-primary">
                  {grade.percentage}%
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge variant={grade.status === 'Passed' ? 'success' : 'error'}>
                    {grade.letterGrade}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge variant={grade.status === 'Passed' ? 'success' : 'error'}>
                    {grade.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(grade)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GradeDetailsModal
        grade={selectedGrade}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
