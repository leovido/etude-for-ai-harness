import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatMoney } from '@/lib/money/format-money';
import type { ActivityItem } from '@/types/api';

interface ActivityRowProps {
  item: ActivityItem;
}

export function ActivityRow({ item }: ActivityRowProps) {
  const muted = useThemeColor({}, 'border');
  const amountColor = useThemeColor({}, item.amount >= 0 ? 'credit' : 'debit');

  return (
    <View style={[styles.row, { borderBottomColor: muted }]}>
      <ThemedText numberOfLines={1} style={styles.description}>
        {item.description}
      </ThemedText>
      <ThemedText style={[styles.amount, { color: amountColor }]}>
        {formatMoney(item.amount, item.currency)}
      </ThemedText>
    </View>
  );
}

interface RecentActivityProps {
  items: ActivityItem[];
  onShowMore: () => void;
}

export function RecentActivity({ items, onShowMore }: RecentActivityProps) {
  const buttonBackground = useThemeColor({}, 'buttonBackground');
  const tint = useThemeColor({}, 'tint');

  return (
    <View>
      <ThemedText type="subtitle" style={styles.heading}>
        Recent Activity
      </ThemedText>
      {items.length === 0 ? (
        <ThemedText>No recent activity</ThemedText>
      ) : (
        items.map((item) => <ActivityRow item={item} key={item.id} />)
      )}
      <Pressable
        accessibilityRole="button"
        onPress={onShowMore}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: buttonBackground, opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <ThemedText style={[styles.buttonText, { color: tint }]}>Show More</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 24,
  },
  row: {
    minHeight: 58,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  description: {
    flex: 1,
  },
  amount: {
    fontWeight: '600',
  },
  button: {
    minHeight: 56,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
