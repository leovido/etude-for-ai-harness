import { StyleSheet } from 'react-native';

import { MerchantHome } from '@/components/merchant-home';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.screen}>
      <MerchantHome />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
