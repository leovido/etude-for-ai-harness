import { render, screen, userEvent } from '@testing-library/react-native';

import type { ActivityItem } from '@/types/api';

import { RecentActivity } from './recent-activity';

const deposit: ActivityItem = {
  id: 'act_001',
  type: 'deposit',
  amount: 150000,
  currency: 'GBP',
  date: '2026-01-22T00:00:00.000Z',
  description: 'Payment from Customer ABC',
  status: 'completed',
};

const refund: ActivityItem = {
  id: 'act_002',
  type: 'refund',
  amount: -186154,
  currency: 'GBP',
  date: '2026-01-23T00:00:00.000Z',
  description: 'Refund to Customer QGW',
  status: 'completed',
};

describe('RecentActivity', () => {
  it('renders description and amount for each item', () => {
    render(
      <RecentActivity>
        <RecentActivity.Item item={deposit} />
        <RecentActivity.Item item={refund} />
      </RecentActivity>,
    );

    expect(screen.getByText('Recent Activity')).toBeOnTheScreen();
    expect(screen.getByLabelText('Payment from Customer ABC £1,500.00')).toBeOnTheScreen();
    expect(screen.getByLabelText('Refund to Customer QGW £-1,861.54')).toBeOnTheScreen();
  });

  it('calls onPress when Show More is pressed', async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();

    render(
      <RecentActivity>
        <RecentActivity.ShowMore onPress={onPress} />
      </RecentActivity>,
    );

    await user.press(screen.getByRole('button', { name: 'Show more activity' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
