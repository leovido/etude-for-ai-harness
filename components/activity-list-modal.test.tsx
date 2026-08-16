import { screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import { renderWithProviders } from '@/test-utils/render-with-providers';

import { ActivityListModal } from './activity-list-modal';

function renderModal(visible: boolean, onClose = jest.fn()) {
  return renderWithProviders(
    <ActivityListModal visible={visible} onClose={onClose}>
      <ActivityListModal.Header>
        <ActivityListModal.Title>Recent Activity</ActivityListModal.Title>
        <ActivityListModal.Done />
      </ActivityListModal.Header>
      <ActivityListModal.List>
        <Text>Payment from Customer ABC</Text>
      </ActivityListModal.List>
    </ActivityListModal>,
  );
}

describe('ActivityListModal', () => {
  it('shows the activity list when visible', () => {
    renderModal(true);

    expect(screen.getByText('Recent Activity')).toBeOnTheScreen();
    expect(screen.getByText('Payment from Customer ABC')).toBeOnTheScreen();
  });

  it('does not show list content when hidden', () => {
    renderModal(false);

    expect(screen.queryByText('Payment from Customer ABC')).toBeNull();
  });

  it('calls onClose when Done is pressed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    renderModal(true, onClose);

    await user.press(screen.getByRole('button', { name: 'Done' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
