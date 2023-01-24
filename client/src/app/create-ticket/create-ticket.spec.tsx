import { render } from '@testing-library/react';

import CreateTicket from './create-ticket';

describe('CreateTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CreateTicket
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
