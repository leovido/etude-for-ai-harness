import type { ActivityItem } from '@/types/api';

export function selectRecentActivity(items: ActivityItem[], limit = 3): ActivityItem[] {
  return items.slice(0, limit);
}
