import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AccountBalance } from '@/components/account-balance';
import { ActivityListModal } from '@/components/activity-list-modal';
import { RecentActivity } from '@/components/recent-activity';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useMerchant } from '@/hooks/use-merchant';
import { selectRecentActivity } from '@/lib/activity/select-recent-activity';

export function MerchantHome() {
  const { data, error, isLoading, retry } = useMerchant();
  const [isActivityModalVisible, setIsActivityModalVisible] = useState(false);

  if (isLoading) {
    return (
      <ThemedView style={styles.centered} accessibilityLabel="Loading account">
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (error || !data) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorMessage}>
          {error ?? 'Unable to load account. Please try again.'}
        </ThemedText>
        <Pressable accessibilityRole="button" accessibilityLabel="Try again" onPress={retry}>
          <ThemedText type="link">Try again</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const recentItems = selectRecentActivity(data.activity);

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ThemedView style={styles.container} lightColor="transparent" darkColor="transparent">
          <ThemedView style={styles.header} lightColor="transparent" darkColor="transparent">
            <ThemedText type="title">Business Account</ThemedText>
          </ThemedView>

          <AccountBalance currency={data.currency}>
            <AccountBalance.Available amount={data.available_balance} />
            <AccountBalance.Pending amount={data.pending_balance} />
          </AccountBalance>

          <RecentActivity>
            {recentItems.map((item) => (
              <RecentActivity.Item key={item.id} item={item} />
            ))}
            <RecentActivity.ShowMore onPress={() => setIsActivityModalVisible(true)} />
          </RecentActivity>
        </ThemedView>
      </SafeAreaView>

      <ActivityListModal
        visible={isActivityModalVisible}
        onClose={() => setIsActivityModalVisible(false)}>
        <ActivityListModal.Header>
          <ActivityListModal.Title>Recent Activity</ActivityListModal.Title>
          <ActivityListModal.Done />
        </ActivityListModal.Header>
        <ActivityListModal.List>
          {data.activity.map((item) => (
            <RecentActivity.Item key={item.id} item={item} />
          ))}
        </ActivityListModal.List>
      </ActivityListModal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  errorMessage: {
    textAlign: 'center',
  },
});
