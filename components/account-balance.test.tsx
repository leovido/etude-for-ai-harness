import { render, screen } from '@testing-library/react-native';

import { AccountBalance } from './account-balance';

describe('AccountBalance', () => {
  it('shows available and pending balances with the currency symbol', () => {
    render(
      <AccountBalance currency="GBP">
        <AccountBalance.Available amount={500000} />
        <AccountBalance.Pending amount={25000} />
      </AccountBalance>,
    );

    expect(screen.getByText('Account Balance')).toBeOnTheScreen();
    expect(screen.getByLabelText('Available £5,000.00')).toBeOnTheScreen();
    expect(screen.getByLabelText('Pending £250.00')).toBeOnTheScreen();
  });
});
