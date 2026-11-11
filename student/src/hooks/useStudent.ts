import { useCallback, useEffect, useState } from 'react';
import { studentService } from '@/src/services/api';
import { Student } from '@/src/types';

interface UseStudentResult {
  data: Student | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStudent(): UseStudentResult {
  const [data, setData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await studentService.getProfile();
      setData(result ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load student profile');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await fetchStudent();
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchStudent]);

  return { data, loading, error, refetch: fetchStudent };
}
