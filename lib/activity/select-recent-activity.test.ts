import type { ActivityItem } from '@/types/api';

import { selectRecentActivity } from './select-recent-activity';

const items: ActivityItem[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 100,
    currency: 'GBP',
    date: '2026-01-03T00:00:00.000Z',
    description: 'First',
    status: 'completed',
  },
  {
    id: '2',
    type: 'deposit',
    amount: 200,
    currency: 'GBP',
    date: '2026-01-02T00:00:00.000Z',
    description: 'Second',
    status: 'completed',
  },
  {
    id: '3',
    type: 'fee',
    amount: -50,
    currency: 'GBP',
    date: '2026-01-01T00:00:00.000Z',
    description: 'Third',
    status: 'completed',
  },
  {
    id: '4',
    type: 'payout',
    amount: -75,
    currency: 'GBP',
    date: '2025-12-31T00:00:00.000Z',
    description: 'Fourth',
    status: 'completed',
  },
];

describe('selectRecentActivity', () => {
  it('returns the first three activity items', () => {
    expect(selectRecentActivity(items).map((item) => item.id)).toEqual(['1', '2', '3']);
  });

  it('returns an empty list when there is no activity', () => {
    expect(selectRecentActivity([])).toEqual([]);
  });
});
