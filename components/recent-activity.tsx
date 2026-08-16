import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatMoney } from '@/lib/money/format-money';
import type { ActivityItem } from '@/types/api';

type RecentActivityProps = {
  children: ReactNode;
};

function RecentActivityRoot({ children }: RecentActivityProps) {
  return (
    <ThemedView style={styles.section} lightColor="transparent" darkColor="transparent">
      <ThemedText type="subtitle">Recent Activity</ThemedText>
      {children}
    </ThemedView>
  );
}

function Item({ item }: { item: ActivityItem }) {
  const muted = useThemeColor({}, 'muted');
  const credit = useThemeColor({}, 'credit');
  const debit = useThemeColor({}, 'debit');
  const formatted = formatMoney(item.amount, item.currency);
  const amountColor = item.amount < 0 ? debit : credit;

  return (
    <View
      style={[styles.row, { borderBottomColor: muted }]}
      accessibilityLabel={`${item.description} ${formatted}`}>
      <ThemedText style={styles.description} numberOfLines={1}>
        {item.description}
      </ThemedText>
      <ThemedText style={[styles.amount, { color: amountColor }]}>{formatted}</ThemedText>
    </View>
  );
}

function ShowMore({ onPress }: { onPress: () => void }) {
  const backgroundColor = useThemeColor({}, 'buttonBackground');
  const color = useThemeColor({}, 'buttonText');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Show more activity"
      onPress={onPress}
      style={[styles.showMore, { backgroundColor }]}>
      <ThemedText type="defaultSemiBold" style={{ color }}>
        Show More
      </ThemedText>
    </Pressable>
  );
}

export const RecentActivity = Object.assign(RecentActivityRoot, {
  Item,
  ShowMore,
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  description: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  amount: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  showMore: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
});
