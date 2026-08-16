import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AccountBalance } from '@/components/account-balance';
import { ActivityListModal } from '@/components/activity-list-modal';
import { RecentActivity } from '@/components/recent-activity';
import { ThemedText } from '@/components/themed-text';
import { useMerchant } from '@/hooks/use-merchant';
import { useThemeColor } from '@/hooks/use-theme-color';
import { selectRecentActivity } from '@/lib/activity/select-recent-activity';

export function MerchantHome() {
  const { data, error, isLoading, retry } = useMerchant();
  const [isActivityVisible, setActivityVisible] = useState(false);
  const tint = useThemeColor({}, 'tint');

  if (isLoading) {
    return (
      <View accessibilityLabel="Loading account" style={styles.centered}>
        <ActivityIndicator color={tint} size="large" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <ThemedText accessibilityRole="alert" style={styles.error}>
          {error ?? 'We could not load your account.'}
        </ThemedText>
        <Pressable accessibilityRole="button" onPress={retry}>
          <ThemedText style={[styles.retry, { color: tint }]}>Try Again</ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Business Account</ThemedText>
        <AccountBalance
          available={data.available_balance}
          currency={data.currency}
          pending={data.pending_balance}
        />
        <RecentActivity
          items={selectRecentActivity(data.activity)}
          onShowMore={() => setActivityVisible(true)}
        />
      </ScrollView>
      <ActivityListModal
        items={data.activity}
        onClose={() => setActivityVisible(false)}
        visible={isActivityVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 48,
  },
  centered: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    marginBottom: 12,
    textAlign: 'center',
  },
  retry: {
    fontSize: 17,
    fontWeight: '600',
  },
});
