import { fireEvent, render, screen } from '@testing-library/react-native';

import { useMerchant } from '@/hooks/use-merchant';
import type { ActivityItem, MerchantDataResponse } from '@/types/api';
import { MerchantHome } from './merchant-home';

jest.mock('@/hooks/use-merchant');

const mockedUseMerchant = jest.mocked(useMerchant);
const activity = Array.from(
  { length: 4 },
  (_, index): ActivityItem => ({
    id: `${index}`,
    type: 'deposit',
    amount: (index + 1) * 100,
    currency: 'GBP',
    date: '2026-08-16T00:00:00.000Z',
    description: `Activity ${index + 1}`,
    status: 'completed',
  }),
);
const merchant: MerchantDataResponse = {
  available_balance: 500000,
  pending_balance: 25000,
  currency: 'GBP',
  activity,
};

describe('MerchantHome', () => {
  it('shows loading and error states', () => {
    const retry = jest.fn();
    mockedUseMerchant.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
      retry,
    });
    const { rerender } = render(<MerchantHome />);

    expect(screen.getByLabelText('Loading account')).toBeOnTheScreen();

    mockedUseMerchant.mockReturnValue({
      data: null,
      error: 'Unable to connect.',
      isLoading: false,
      retry,
    });
    rerender(<MerchantHome />);

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to connect.');
    fireEvent.press(screen.getByRole('button', { name: 'Try Again' }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('shows three recent items and all items in the modal', () => {
    mockedUseMerchant.mockReturnValue({
      data: merchant,
      error: null,
      isLoading: false,
      retry: jest.fn(),
    });
    render(<MerchantHome />);

    expect(screen.getByText('Activity 1')).toBeOnTheScreen();
    expect(screen.queryByText('Activity 4')).not.toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Show More' }));
    expect(screen.getByText('Activity 4')).toBeOnTheScreen();
  });
});
