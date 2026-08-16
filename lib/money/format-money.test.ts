import { formatMoney, getCurrencySymbol } from './format-money';

describe('getCurrencySymbol', () => {
  it('returns the pound symbol for GBP', () => {
    expect(getCurrencySymbol('GBP')).toBe('£');
  });

  it('returns the euro symbol for EUR', () => {
    expect(getCurrencySymbol('EUR')).toBe('€');
  });
});

describe('formatMoney', () => {
  it('formats a positive GBP amount with grouping and two decimals', () => {
    expect(formatMoney(500000, 'GBP')).toBe('£5,000.00');
  });

  it('formats a negative amount with the sign after the currency symbol', () => {
    expect(formatMoney(-186154, 'GBP')).toBe('£-1,861.54');
  });

  it('formats a EUR amount with the euro symbol', () => {
    expect(formatMoney(25000, 'EUR')).toBe('€250.00');
  });
});
