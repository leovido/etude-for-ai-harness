import { http, HttpResponse } from 'msw';
import { screen, userEvent, waitFor } from '@testing-library/react-native';

import { API_BASE_URL } from '@/constants';
import { server } from '@/mocks/server.node';
import { renderWithProviders } from '@/test-utils/render-with-providers';
import type { MerchantDataResponse } from '@/types/api';

import { MerchantHome } from './merchant-home';

const merchantResponse: MerchantDataResponse = {
  available_balance: 500000,
  pending_balance: 25000,
  currency: 'GBP',
  activity: [
    {
      id: 'act_001',
      type: 'refund',
      amount: -186154,
      currency: 'GBP',
      date: '2026-01-23T00:00:00.000Z',
      description: 'Refund to Customer QGW',
      status: 'completed',
    },
    {
      id: 'act_002',
      type: 'deposit',
      amount: 17092,
      currency: 'GBP',
      date: '2026-01-23T00:00:00.000Z',
      description: 'Payment from Customer RIZ',
      status: 'completed',
    },
    {
      id: 'act_003',
      type: 'deposit',
      amount: 150000,
      currency: 'GBP',
      date: '2026-01-22T00:00:00.000Z',
      description: 'Payment from Customer ABC',
      status: 'completed',
    },
    {
      id: 'act_004',
      type: 'fee',
      amount: -2500,
      currency: 'GBP',
      date: '2026-01-21T00:00:00.000Z',
      description: 'Monthly service fee',
      status: 'completed',
    },
  ],
};

function renderHome() {
  return renderWithProviders(<MerchantHome />);
}

describe('MerchantHome', () => {
  it('shows a loading indicator while merchant data is fetched', () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return new Promise(() => undefined);
      }),
    );

    renderHome();

    expect(screen.getByLabelText('Loading account')).toBeOnTheScreen();
  });

  it('shows balances and the three most recent activity items', async () => {
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    renderHome();

    expect(await screen.findByText('Business Account')).toBeOnTheScreen();
    expect(screen.getByLabelText('Available £5,000.00')).toBeOnTheScreen();
    expect(screen.getByLabelText('Pending £250.00')).toBeOnTheScreen();
    expect(screen.getByLabelText('Refund to Customer QGW £-1,861.54')).toBeOnTheScreen();
    expect(screen.getByLabelText('Payment from Customer RIZ £170.92')).toBeOnTheScreen();
    expect(screen.getByLabelText('Payment from Customer ABC £1,500.00')).toBeOnTheScreen();
    expect(screen.queryByText('Monthly service fee')).toBeNull();
  });

  it('opens the activity modal with the full fetched list', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    renderHome();

    await screen.findByText('Business Account');
    await user.press(screen.getByRole('button', { name: 'Show more activity' }));

    expect(await screen.findByText('Monthly service fee')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Done' })).toBeOnTheScreen();
  });

  it('shows an error state and retries the request', async () => {
    const user = userEvent.setup();
    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );

    renderHome();

    expect(await screen.findByText('Unable to load account. Please try again.')).toBeOnTheScreen();

    server.use(
      http.get(`${API_BASE_URL}/api/merchant`, () => {
        return HttpResponse.json(merchantResponse);
      }),
    );

    await user.press(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => {
      expect(screen.getByText('Business Account')).toBeOnTheScreen();
    });
  });
});
