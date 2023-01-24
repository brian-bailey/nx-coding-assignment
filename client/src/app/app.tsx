import { Ticket, User } from '@acme/shared-models';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TicketDetails from './ticket-details/ticket-details';
import Tickets from './tickets/tickets';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  async function fetchTickets() {
    const data = await fetch('/api/tickets').then();
    setTickets(await data.json());
  }

  async function fetchUsers() {
    const data = await fetch('/api/users').then();
    setUsers(await data.json());
  }

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  async function setStatus(ticket: Ticket, complete: boolean) {
    fetch(`/api/tickets/${ticket.id}/complete`, {
      method: complete ? 'PUT' : 'DELETE',
    }).then(fetchTickets);
  }

  async function assignUser(ticket: Ticket, user: number) {
    fetch(`/api/tickets/${ticket.id}/assign/${user}`, { method: 'PUT' }).then(
      fetchTickets
    );
  }

  async function createTicket(ticket: Ticket) {
    fetch(`/api/tickets/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(ticket),
    }).then(fetchTickets);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Tickets
              tickets={tickets}
              users={users}
              assignUser={assignUser}
              setStatus={setStatus}
              createTicket={createTicket}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <TicketDetails
              tickets={tickets}
              users={users}
              assignUser={assignUser}
              setStatus={setStatus}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
