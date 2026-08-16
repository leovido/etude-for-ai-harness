import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatMoney } from '@/lib/money/format-money';
import type { Currency } from '@/types/api';

interface AccountBalanceProps {
  available: number;
  pending: number;
  currency: Currency;
}

export function AccountBalance({ available, pending, currency }: AccountBalanceProps) {
  const muted = useThemeColor({}, 'muted');

  return (
    <View>
      <ThemedText type="subtitle" style={styles.heading}>
        Account Balance
      </ThemedText>
      <View style={styles.balances}>
        <View style={styles.balance}>
          <ThemedText style={[styles.label, { color: muted }]}>Available</ThemedText>
          <ThemedText
            accessibilityLabel={`Available balance ${formatMoney(available, currency)}`}
            style={styles.amount}
          >
            {formatMoney(available, currency)}
          </ThemedText>
        </View>
        <View style={styles.balance}>
          <ThemedText style={[styles.label, { color: muted }]}>Pending</ThemedText>
          <ThemedText
            accessibilityLabel={`Pending balance ${formatMoney(pending, currency)}`}
            style={styles.amount}
          >
            {formatMoney(pending, currency)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: 24,
  },
  balances: {
    flexDirection: 'row',
    gap: 32,
  },
  balance: {
    flex: 1,
  },
  label: {
    marginBottom: 4,
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
});
