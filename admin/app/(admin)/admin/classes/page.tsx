'use client';

import { useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // TODO: Fetch classes from API
  const classes: any[] = [];

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Classes</h1>
          <p className="text-schooly-text-secondary mt-1">Manage class sections</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Class
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-schooly-text-secondary" />
            <Input placeholder="Search classes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="hover:border-schooly-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-schooly-text">{cls.name}</h3>
                    <p className="text-sm text-schooly-text-secondary">{cls.code}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-schooly-text-secondary">Grade Level</span>
                    <span className="text-schooly-text">{cls.gradeLevel}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-schooly-text-secondary">Section</span>
                    <span className="text-schooly-text">{cls.section}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-schooly-text-secondary">Academic Year</span>
                    <span className="text-schooly-text">{cls.academicYear}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-3 border-t border-schooly-border">
                    <span className="text-schooly-text-secondary flex items-center gap-1"><Users className="h-4 w-4" /> Students</span>
                    <span className="text-schooly-primary font-semibold">{cls.studentCount || 0}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">View</Button>
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Classes Found</p>
            <p className="text-sm text-schooly-text-secondary">Create your first class to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}