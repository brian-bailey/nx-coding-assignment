import { render } from '@testing-library/react';

import TicketDetails from './ticket-details';

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TicketDetails
        tickets={[{ assigneeId: 1, completed: false, description: 'Fake Description', id: 1 }]}
        users={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
