import { fireEvent, render, screen } from '@testing-library/react-native';

import type { ActivityItem } from '@/types/api';
import { RecentActivity } from './recent-activity';

const item: ActivityItem = {
  id: 'activity-1',
  type: 'deposit',
  amount: 150000,
  currency: 'GBP',
  date: '2026-08-16T00:00:00.000Z',
  description: 'Payment from Customer ABC',
  status: 'completed',
};

describe('RecentActivity', () => {
  it('shows transaction details and opens the full list', () => {
    const onShowMore = jest.fn();
    render(<RecentActivity items={[item]} onShowMore={onShowMore} />);

    expect(screen.getByText('Payment from Customer ABC')).toBeOnTheScreen();
    expect(screen.getByText('£1,500.00')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button', { name: 'Show More' }));
    expect(onShowMore).toHaveBeenCalledTimes(1);
  });
});
