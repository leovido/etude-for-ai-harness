import { API_BASE_URL } from '@/constants';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      method: 'GET',
    });
  } catch {
    throw new ApiError('Unable to connect. Check your connection and try again.', 0);
  }

  if (!response.ok) {
    throw new ApiError('We could not load your account. Please try again.', response.status);
  }

  return (await response.json()) as T;
}
