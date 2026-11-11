import { useCallback, useEffect, useState } from 'react';
import { analyticsService } from '@/src/services/api';

interface AnalyticsData {
  overallAverage: number;
  highestScore: number;
  lowestScore: number;
  totalSubjects: number;
  passedSubjects: number;
  failedSubjects: number;
}

interface UseAnalyticsResult {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAnalytics(): UseAnalyticsResult {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyticsService.getPerformanceAnalytics();
      setData(result ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      await fetchAnalytics();
    })();
    return () => {
      isMounted = false;
    };
  }, [fetchAnalytics]);

  return { data, loading, error, refetch: fetchAnalytics };
}
