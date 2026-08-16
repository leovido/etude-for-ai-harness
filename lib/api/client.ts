import { API_BASE_URL } from '@/constants';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message = `Request failed with status ${status}`) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, init);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    throw new ApiError(0, 'Network request failed');
  }

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return (await response.json()) as T;
}
