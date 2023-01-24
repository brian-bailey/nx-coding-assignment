import { render, screen } from '@testing-library/react';
import ReactRouter from 'react-router-dom';

import TicketDetails from './ticket-details';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TicketDetails', () => {
  it('should render successfully', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' });
    const { baseElement } = render(
      <TicketDetails
        tickets={[
          {
            assigneeId: 1,
            completed: false,
            description: 'Fake Description',
            id: 1,
          },
        ]}
        users={[]}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Ticket not found')).toBeInTheDocument();
  });
  it('Should Render Ticket 1', async () => {
    const TICKET_ID = 1;
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(TICKET_ID) });

    const { baseElement } = render(
      <TicketDetails
        tickets={[
          {
            assigneeId: 1,
            completed: false,
            description: 'Fake Description',
            id: 1,
          },
          {
            assigneeId: 2,
            completed: false,
            description: 'Fake Description 2',
            id: 2,
          },
        ]}
        users={[{id: 1, name: "Ringo"}, {id: 2, name: "Paul"}]}
      />
    );
    expect(baseElement).toBeTruthy();

    //Should contain Ringo, but not Paul
    expect(screen.queryAllByText("Ringo").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Paul").length).toBe(0);
  });
  it('Should Render Ticket 2', async () => {
    const TICKET_ID = 2;
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(TICKET_ID) });

    const { baseElement } = render(
      <TicketDetails
        tickets={[
          {
            assigneeId: 1,
            completed: false,
            description: 'Fake Description',
            id: 1,
          },
          {
            assigneeId: 2,
            completed: false,
            description: 'Fake Description 2',
            id: 2,
          },
        ]}
        users={[{id: 1, name: "Ringo"}, {id: 2, name: "Paul"}]}
      />
    );
    expect(baseElement).toBeTruthy();

    //Should contain Paul, but not Ringo
    expect(screen.queryAllByText("Paul").length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Ringo").length).toBe(0);
  });
});
