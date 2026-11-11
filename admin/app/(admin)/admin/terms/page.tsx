'use client';

import { Plus, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

export default function TermsPage() {
  // TODO: Fetch terms from API
  const terms: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-schooly-text">Academic Terms</h1>
          <p className="text-schooly-text-secondary mt-1">Manage academic calendar</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Term
        </Button>
      </div>

      {terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term) => (
            <Card key={term.id} className={term.isActive ? 'border-schooly-primary' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{term.name}</CardTitle>
                  {term.isActive && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Active
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-schooly-text-secondary" />
                    <span className="text-schooly-text-secondary">{term.academicYear}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-schooly-text-secondary">Start: </span>
                    <span className="text-schooly-text">{term.startDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-schooly-text-secondary">End: </span>
                    <span className="text-schooly-text">{term.endDate}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {!term.isActive && (
                      <Button variant="outline" size="sm" className="flex-1">Set Active</Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-schooly-text-secondary mx-auto mb-4" />
            <p className="text-schooly-text font-medium mb-2">No Academic Terms</p>
            <p className="text-sm text-schooly-text-secondary">Create an academic term to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}