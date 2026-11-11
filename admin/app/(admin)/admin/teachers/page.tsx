'use client';

import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Select } from '@/src/components/ui/Select';
import { Badge } from '@/src/components/ui/Badge';

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // TODO: Fetch teachers from API
  const teachers: any[] = [];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = teacher.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || teacher.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Teachers</h1>
          <p className="text-schooly-text-secondary mt-1">Manage teacher records</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
              <Input placeholder="Search by name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredTeachers.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-schooly-border">
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Employee ID</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Name</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Email</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Department</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-schooly-text">Status</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-schooly-text">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-schooly-border hover:bg-schooly-bg-card">
                      <td className="py-3 px-6 text-sm text-schooly-text-secondary">{teacher.employeeId}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text">{teacher.name}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text-secondary">{teacher.email}</td>
                      <td className="py-3 px-6 text-sm text-schooly-text">{teacher.department}</td>
                      <td className="py-3 px-6">
                        <Badge variant={teacher.status === 'Active' ? 'success' : 'error'}>
                          {teacher.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="text-red-400"><Trash2 className="h-4 w-4" /></Button>
                        </div>
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
            <Search className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Teachers Found</p>
            <p className="text-sm text-schooly-text-secondary">Add teachers to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}