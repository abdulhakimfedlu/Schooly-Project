import { useCallback, useEffect, useState } from 'react';
import { subjectsService } from '@/src/services/api';
import { Subject } from '@/src/types';

interface UseSubjectsResult {
  data: Subject[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSubjects(): UseSubjectsResult {
  const [data, setData] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await subjectsService.getEnrolledSubjects();
      setData(result ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subjects');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await fetchSubjects();
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchSubjects]);

  return { data, loading, error, refetch: fetchSubjects };
}
