import { render, screen } from '@testing-library/react-native';

import { AccountBalance } from './account-balance';

describe('AccountBalance', () => {
  it('shows available and pending balances', () => {
    render(<AccountBalance available={500000} currency="GBP" pending={25000} />);

    expect(screen.getByText('£5,000.00')).toBeOnTheScreen();
    expect(screen.getByText('£250.00')).toBeOnTheScreen();
    expect(screen.getByLabelText('Available balance £5,000.00')).toBeOnTheScreen();
  });
});
