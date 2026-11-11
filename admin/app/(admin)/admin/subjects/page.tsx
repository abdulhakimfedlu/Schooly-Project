'use client';

import { useState } from 'react';
import { Search, Plus, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Fetch subjects from API
  const subjects: any[] = [];

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Subjects</h1>
          <p className="text-schooly-text-secondary mt-1">Manage course subjects</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
            <Input placeholder="Search subjects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} className="hover:border-schooly-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-schooly-text">{subject.name}</h3>
                    <p className="text-sm text-schooly-primary">{subject.code}</p>
                  </div>
                  <span className="text-sm text-schooly-text-secondary bg-schooly-bg-secondary px-3 py-1 rounded-full">
                    {subject.creditHours} Credits
                  </span>
                </div>
                <p className="text-sm text-schooly-text-secondary mb-4">{subject.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">Assign Teachers</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Subjects Found</p>
            <p className="text-sm text-schooly-text-secondary">Add subjects to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}