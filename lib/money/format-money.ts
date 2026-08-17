import type { Currency } from '@/types/api';

export function formatMoney(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}
