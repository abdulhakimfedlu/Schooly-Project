import { useCallback, useEffect, useState } from 'react';
import { academicHistoryService } from '@/src/services/api';
import { AcademicTerm } from '@/src/types';

interface UseAcademicHistoryResult {
  data: AcademicTerm[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAcademicHistory(): UseAcademicHistoryResult {
  const [data, setData] = useState<AcademicTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTerms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await academicHistoryService.getAllTerms();
      setData(result ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load academic history');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await fetchTerms();
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchTerms]);

  return { data, loading, error, refetch: fetchTerms };
}
