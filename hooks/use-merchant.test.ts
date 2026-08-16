import { http, HttpResponse } from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { API_BASE_URL } from '@/constants';
import { server } from '@/mocks/server.node';
import type { MerchantDataResponse } from '@/types/api';

import { useMerchant } from './use-merchant';

const merchantResponse: MerchantDataResponse = {
  available_balance: 500000,
  pending_balance: 25000,
  currency: 'GBP',
  activity: [
    {
      id: 'act_001',
      type: 'deposit',
      amount: 150000,
      currency: 'GBP',
      date: '2026-01-22T00:00:00.000Z',
      description: 'Payment from Customer ABC',
      status: 'completed',
    },
  ],
};

describe('useMerchant', () => {
  it('loads merchant data on mount', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    const { result } = renderHook(() => useMerchant());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(merchantResponse);
    expect(result.current.error).toBeNull();
  });

  it('exposes an error and allows retry after a failed request', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useMerchant());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Unable to load account. Please try again.');

    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    await act(async () => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(merchantResponse);
    });

    expect(result.current.error).toBeNull();
  });
});
