import { useCallback, useEffect, useState } from 'react';
import { gradesService } from '@/src/services/api';
import { Grade } from '@/src/types';

interface UseGradesResult {
  data: Grade[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGrades(): UseGradesResult {
  const [data, setData] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await gradesService.getAllGrades();
      setData(result ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load grades');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await fetchGrades();
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchGrades]);

  return { data, loading, error, refetch: fetchGrades };
}
