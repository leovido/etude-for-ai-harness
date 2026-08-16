import { useCallback, useEffect, useState } from 'react';

import { getMerchant } from '@/lib/api/merchant';
import type { MerchantDataResponse } from '@/types/api';

interface MerchantState {
  data: MerchantDataResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function useMerchant() {
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState<MerchantState>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState((current) => ({ ...current, error: null, isLoading: true }));

    getMerchant({ signal: controller.signal })
      .then((data) => setState({ data, error: null, isLoading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          data: null,
          error: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
          isLoading: false,
        });
      });

    return () => controller.abort();
  }, [requestKey]);

  const retry = useCallback(() => setRequestKey((key) => key + 1), []);

  return { ...state, retry };
}
