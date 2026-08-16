import type { Currency } from '@/types/api';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: '£',
  EUR: '€',
};

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

/**
 * Formats an amount stored in the currency's lowest denomination
 * (pence/cents) for display, e.g. 500000 GBP → "£5,000.00".
 */
export function formatMoney(amountInMinorUnits: number, currency: Currency): string {
  const majorUnits = amountInMinorUnits / 100;
  const formatted = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(majorUnits));
  const sign = majorUnits < 0 ? '-' : '';

  return `${getCurrencySymbol(currency)}${sign}${formatted}`;
}
