import { formatMoney } from './format-money';

describe('formatMoney', () => {
  it('formats minor units with the API currency symbol', () => {
    expect(formatMoney(500000, 'GBP')).toBe('£5,000.00');
    expect(formatMoney(25000, 'EUR')).toBe('€250.00');
  });

  it('preserves negative transaction amounts', () => {
    expect(formatMoney(-50000, 'GBP')).toBe('-£500.00');
  });
});
