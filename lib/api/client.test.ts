import { http, HttpResponse } from 'msw';

import { API_BASE_URL } from '@/constants';
import { server } from '@/mocks/server.node';

import { ApiError, apiGet } from './client';

describe('apiGet', () => {
  it('returns parsed JSON when the request succeeds', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/ok`, () => {
        return HttpResponse.json({ ok: true });
      }),
    );

    await expect(apiGet<{ ok: boolean }>('/api/ok')).resolves.toEqual({ ok: true });
  });

  it('throws ApiError when the server returns a non-OK status', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/fail`, () => {
        return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );

    await expect(apiGet('/api/fail')).rejects.toEqual(expect.any(ApiError));
    await expect(apiGet('/api/fail')).rejects.toMatchObject({ status: 500 });
  });
});
