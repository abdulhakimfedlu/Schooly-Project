'use client';

import { useState } from 'react';
import { Search, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { Badge } from '@/src/components/ui/Badge';

export default function GradesPage() {
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Fetch grades from API
  const grades: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-schooly-text">Grades</h1>
        <p className="text-schooly-text-secondary mt-1">View and manage student grades</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
              <Input placeholder="Search student..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <option value="">All Classes</option>
            </Select>
            <Select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
              <option value="">All Subjects</option>
            </Select>
            <Select>
              <option value="">All Terms</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {grades.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-schooly-border">
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Student ID</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Name</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Subject</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Type</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-schooly-text">Marks</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-schooly-text">%</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-schooly-text">Grade</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-schooly-text">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr key={grade.id} className="border-b border-schooly-border hover:bg-schooly-bg-card">
                      <td className="py-3 px-6 text-sm text-schooly-text-secondary">{grade.studentId}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text">{grade.studentName}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text">{grade.subject}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text-secondary">{grade.examType}</td>
                      <td className="py-3 px-6 text-center text-sm text-schooly-text">{grade.marks}/{grade.maxMarks}</td>
                      <td className="py-3 px-6 text-center text-sm font-semibold text-schooly-primary">{grade.percentage}%</td>
                      <td className="py-3 px-6 text-center">
                        <Badge variant="default">{grade.grade}</Badge>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <Badge variant={grade.status === 'Passed' ? 'success' : 'error'}>{grade.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <ClipboardList className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Grades Found</p>
            <p className="text-sm text-schooly-text-secondary">Grades will appear here once teachers submit them</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}