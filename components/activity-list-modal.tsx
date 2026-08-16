import { createContext, useContext, type ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

type ActivityListModalContextValue = {
  onClose: () => void;
};

const ActivityListModalContext = createContext<ActivityListModalContextValue | null>(null);

function useActivityListModalContext(): ActivityListModalContextValue {
  const value = useContext(ActivityListModalContext);
  if (!value) {
    throw new Error('ActivityListModal compound components must be used within ActivityListModal');
  }
  return value;
}

type ActivityListModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

function ActivityListModalRoot({ visible, onClose, children }: ActivityListModalProps) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <ActivityListModalContext.Provider value={{ onClose }}>
        <ThemedView style={styles.screen}>
          <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            {children}
          </SafeAreaView>
        </ThemedView>
      </ActivityListModalContext.Provider>
    </Modal>
  );
}

function Header({ children }: { children: ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

function Title({ children }: { children: ReactNode }) {
  return (
    <ThemedText type="title" style={styles.title}>
      {children}
    </ThemedText>
  );
}

function Done() {
  const color = useThemeColor({}, 'buttonText');
  const { onClose } = useActivityListModalContext();

  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Done" onPress={onClose}>
      <ThemedText type="defaultSemiBold" style={{ color }}>
        Done
      </ThemedText>
    </Pressable>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ScrollView contentContainerStyle={styles.list}>{children}</ScrollView>;
}

export const ActivityListModal = Object.assign(ActivityListModalRoot, {
  Header,
  Title,
  Done,
  List,
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 12,
  },
  list: {
    paddingBottom: 24,
  },
});
