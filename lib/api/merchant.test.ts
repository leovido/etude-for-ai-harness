import { http, HttpResponse } from 'msw';

import { API_BASE_URL } from '@/constants';
import { server } from '@/mocks/server.node';
import type { MerchantDataResponse } from '@/types/api';

import { ApiError } from './client';
import { getMerchant } from './merchant';

const merchantResponse: MerchantDataResponse = {
  available_balance: 500000,
  pending_balance: 25000,
  currency: 'GBP',
  activity: [],
};

describe('getMerchant', () => {
  it('returns merchant data from GET /api/merchant', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    await expect(getMerchant()).resolves.toEqual(merchantResponse);
  });

  it('throws when the merchant request fails', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );

    await expect(getMerchant()).rejects.toBeInstanceOf(ApiError);
  });
});
