import { useCallback, useEffect, useState } from 'react';

import { getMerchant } from '@/lib/api/merchant';
import type { MerchantDataResponse } from '@/types/api';

export type UseMerchantResult = {
  data: MerchantDataResponse | null;
  error: string | null;
  isLoading: boolean;
  retry: () => void;
};

export function useMerchant(): UseMerchantResult {
  const [data, setData] = useState<MerchantDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const merchant = await getMerchant({ signal });
      setData(merchant);
    } catch (caught) {
      if (signal?.aborted || (caught instanceof Error && caught.name === 'AbortError')) {
        return;
      }
      setError('Unable to load account. Please try again.');
      setData(null);
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const retry = useCallback(() => {
    void load();
  }, [load]);

  return { data, error, isLoading, retry };
}
