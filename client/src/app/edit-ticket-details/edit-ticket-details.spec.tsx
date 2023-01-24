import { render } from '@testing-library/react';

import EditTicketDetails from './edit-ticket-details';

describe('EditTicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EditTicketDetails
        tickets={[
          {
            assigneeId: 1,
            completed: false,
            description: 'Fake Description',
            id: 1,
          },
        ]}
        users={[]}
        onSubmit={(ticket) => console.log("complete")}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
