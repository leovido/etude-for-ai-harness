import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityRow } from '@/components/recent-activity';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { ActivityItem } from '@/types/api';

interface ActivityListModalProps {
  items: ActivityItem[];
  visible: boolean;
  onClose: () => void;
}

export function ActivityListModal({ items, visible, onClose }: ActivityListModalProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const tint = useThemeColor({}, 'tint');

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      visible={visible}
    >
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Activity</ThemedText>
          <Pressable accessibilityRole="button" hitSlop={12} onPress={onClose}>
            <ThemedText style={[styles.done, { color: tint }]}>Done</ThemedText>
          </Pressable>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityRow item={item} />}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    minHeight: 56,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  done: {
    fontSize: 17,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
});
