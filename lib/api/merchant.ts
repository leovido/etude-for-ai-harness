import type { MerchantDataResponse } from '@/types/api';

import { apiGet } from './client';

export function getMerchant(init?: RequestInit): Promise<MerchantDataResponse> {
  return apiGet<MerchantDataResponse>('/api/merchant', init);
}
