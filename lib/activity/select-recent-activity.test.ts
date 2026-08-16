import type { ActivityItem } from '@/types/api';
import { selectRecentActivity } from './select-recent-activity';

const activity = Array.from(
  { length: 5 },
  (_, index): ActivityItem => ({
    id: `${index}`,
    type: 'deposit',
    amount: index,
    currency: 'GBP',
    date: '2026-08-16T00:00:00.000Z',
    description: `Activity ${index}`,
    status: 'completed',
  }),
);

describe('selectRecentActivity', () => {
  it('returns only the first three items without mutating the source', () => {
    expect(selectRecentActivity(activity)).toEqual(activity.slice(0, 3));
    expect(activity).toHaveLength(5);
  });
});
