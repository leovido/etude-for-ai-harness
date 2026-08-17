import { API_BASE_URL } from '@/constants';
import type { MerchantDataResponse } from '@/types/api';
import { getMerchant } from './merchant';

const merchant: MerchantDataResponse = {
  available_balance: 500000,
  pending_balance: 25000,
  currency: 'GBP',
  activity: [],
};

describe('getMerchant', () => {
  it('fetches merchant data from the configured endpoint', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify(merchant), { status: 200 }));

    await expect(getMerchant()).resolves.toEqual(merchant);
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/api/merchant`, {
      method: 'GET',
    });
  });
});
