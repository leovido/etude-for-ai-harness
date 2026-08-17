import type { ActivityItem } from '@/types/api';

const RECENT_ACTIVITY_LIMIT = 3;

export function selectRecentActivity(activity: ActivityItem[]): ActivityItem[] {
  return activity.slice(0, RECENT_ACTIVITY_LIMIT);
}
