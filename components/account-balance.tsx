import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { formatMoney } from '@/lib/money/format-money';
import type { Currency } from '@/types/api';

type AccountBalanceContextValue = {
  currency: Currency;
};

const AccountBalanceContext = createContext<AccountBalanceContextValue | null>(null);

function useAccountBalanceContext(): AccountBalanceContextValue {
  const value = useContext(AccountBalanceContext);
  if (!value) {
    throw new Error('AccountBalance compound components must be used within AccountBalance');
  }
  return value;
}

type AccountBalanceProps = {
  currency: Currency;
  children: ReactNode;
};

function AccountBalanceRoot({ currency, children }: AccountBalanceProps) {
  return (
    <AccountBalanceContext.Provider value={{ currency }}>
      <ThemedView style={styles.section} lightColor="transparent" darkColor="transparent">
        <ThemedText type="subtitle">Account Balance</ThemedText>
        <View style={styles.row}>{children}</View>
      </ThemedView>
    </AccountBalanceContext.Provider>
  );
}

function BalanceColumn({ label, amount }: { label: string; amount: number }) {
  const { currency } = useAccountBalanceContext();
  const muted = useThemeColor({}, 'muted');
  const formatted = formatMoney(amount, currency);

  return (
    <View style={styles.column} accessibilityLabel={`${label} ${formatted}`}>
      <ThemedText style={[styles.label, { color: muted }]}>{label}</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.figure}>
        {formatted}
      </ThemedText>
    </View>
  );
}

function Available({ amount }: { amount: number }) {
  return <BalanceColumn label="Available" amount={amount} />;
}

function Pending({ amount }: { amount: number }) {
  return <BalanceColumn label="Pending" amount={amount} />;
}

export const AccountBalance = Object.assign(AccountBalanceRoot, {
  Available,
  Pending,
});

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
  figure: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
});
