/**
 * MSW Request Handlers
 */
import { HttpResponse, http } from 'msw';
import { API_BASE_URL } from '../constants';
import type {
  CreatePayoutRequest,
  MerchantDataResponse,
  PaginatedActivityResponse,
} from '../types/api';
import {
  createPayout,
  generateMockActivity,
  getAvailableBalance,
  getCurrentCurrency,
  getPaginatedActivity,
  getPayoutById,
  getPendingBalance,
} from './data';

/**
 * Helper function to log MSW requests with color coding
 */
function logRequest(
  method: string,
  url: string,
  status: number,
  responseData: unknown,
  requestBody?: unknown,
) {
  // Determine color based on status code
  let statusColor = '#4CAF50'; // Green for 2xx
  if (status >= 400 && status < 500) {
    statusColor = '#FF9800'; // Orange for 4xx
  } else if (status >= 500) {
    statusColor = '#F44336'; // Red for 5xx
  }

  // Build style strings
  const mswStyle = 'color: #9C27B0; font-weight: bold;';
  const methodStyle = 'color: #2196F3; font-weight: bold;';
  const statusStyle = `color: ${statusColor}; font-weight: bold;`;
  const bodyLabelStyle = 'color: #666; font-style: italic;';

  // Log main request info with colors
  // Format: [MSW] GET url → 200 {response}
  const logMessage = `%c[MSW]%c %c${method}%c ${url} → %c${status}`;
  console.log(
    logMessage,
    mswStyle,
    '', // Reset after [MSW]
    methodStyle,
    '', // Reset after method
    statusStyle,
  );

  // Log full response object on next line
  console.log('Response:', responseData);

  // Log request body if provided
  if (requestBody) {
    console.log('%cRequest Body:%c', bodyLabelStyle, '', requestBody);
  }
}

export const handlers = [
  // GET /api/merchant
  http.get(`${API_BASE_URL}/api/merchant`, async ({ request }) => {
    // Add random timeout to simulate network latency (500-2000ms)
    const delay = Math.floor(Math.random() * 1500) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Check for error simulation header
    const errorHeader = request.headers.get('x-simulate-error');
    if (errorHeader) {
      const errorResponse = { error: 'Internal Server Error' };
      logRequest('GET', request.url, 500, errorResponse);
      return HttpResponse.json(errorResponse, { status: 500 });
    }

    // Parse cursor from query parameters
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = parseInt(url.searchParams.get('limit') || '15', 10);

    // If cursor is provided, return paginated activity response
    if (cursor !== null) {
      const paginatedActivity = getPaginatedActivity(cursor, limit);
      const response: PaginatedActivityResponse = paginatedActivity;

      logRequest('GET', request.url, 200, response);
      return HttpResponse.json(response);
    }

    // Otherwise, return full merchant data (for backward compatibility)
    const response: MerchantDataResponse = {
      available_balance: getAvailableBalance(),
      pending_balance: getPendingBalance(),
      currency: getCurrentCurrency(),
      activity: generateMockActivity(),
    };

    logRequest('GET', request.url, 200, response);
    return HttpResponse.json(response);
  }),

  // GET /api/merchant/activity - Dedicated endpoint for paginated activity
  http.get(`${API_BASE_URL}/api/merchant/activity`, async ({ request }) => {
    // Add random timeout to simulate network latency (500-2000ms)
    const delay = Math.floor(Math.random() * 1500) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Parse cursor and limit from query parameters
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = parseInt(url.searchParams.get('limit') || '15', 10);

    const paginatedActivity = getPaginatedActivity(cursor, limit);
    const response: PaginatedActivityResponse = paginatedActivity;

    logRequest('GET', request.url, 200, response);
    return HttpResponse.json(response);
  }),

  // POST /api/payouts
  http.post(`${API_BASE_URL}/api/payouts`, async ({ request }) => {
    const body = (await request.json()) as CreatePayoutRequest;
    const { amount, currency, iban } = body;

    // Service Unavailable: amount === 99999 (999.99 in pence) returns 503
    if (amount === 99999) {
      const errorResponse = { error: 'Service temporarily unavailable' };
      logRequest('POST', request.url, 503, errorResponse, body);
      return HttpResponse.json(errorResponse, { status: 503 });
    }

    // Insufficient Funds: amount === 88888 (888.88 in pence) returns 400
    if (amount === 88888) {
      const errorResponse = { error: 'Insufficient funds' };
      logRequest('POST', request.url, 400, errorResponse, body);
      return HttpResponse.json(errorResponse, { status: 400 });
    }

    // Success: Create payout with final status immediately (no polling needed)
    // Determine final status: fail if amount ends in 99 pence, otherwise complete
    const finalStatus = amount % 100 === 99 ? 'failed' : 'completed';
    const payout = createPayout(amount, currency, iban, finalStatus);

    logRequest('POST', request.url, 201, payout, body);
    return HttpResponse.json(payout, { status: 201 });
  }),

  // GET /api/payouts/:id
  http.get(`${API_BASE_URL}/api/payouts/:id`, ({ params, request }) => {
    const { id } = params;
    const payout = getPayoutById(id as string);

    if (!payout) {
      const errorResponse = { error: 'Payout not found' };
      logRequest('GET', request.url, 404, errorResponse);
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    logRequest('GET', request.url, 200, payout);
    return HttpResponse.json(payout);
  }),
];
