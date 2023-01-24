import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  
  async function fetchTickets() {
    const data = await fetch('/api/tickets').then();
    const _data = await data.json()
    setTickets(_data);
    console.log(JSON.stringify(_data))
  }

  async function fetchUsers() {
    const data = await fetch('/api/users').then();
    setUsers(await data.json());
  }

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const getUser = (id: number | null) => {
    return users.find((user) => user.id === id);
  };

  function setStatus(ticket: Ticket, complete: boolean) {
    //make put request
    console.log(
      `Setting Ticket ${ticket.id} Status to ${
        complete ? 'Complete' : 'Incomplete'
      }`
    );
    fetch(`/api/tickets/${ticket.id}/complete`, {method: complete ? "PUT" : "DELETE"}).then((response) => {
      fetchTickets().then(() => console.log("complete"));
    })
  }

  function assignUser(ticket: Ticket, user: number) {
    //make put request
    console.log(
      `Setting Ticket ${ticket.id} assignee from ${getUser(
        ticket.assigneeId
      )?.name}, to ${getUser(user)?.name}`
    );
    fetch(`/api/tickets/${ticket.id}/assign/${user}`, {method: "PUT"}).then((response) => {
      fetchTickets().then(() => console.log("assign complete"));
    })
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} users={users} assignUser={assignUser} setStatus={setStatus} />} />
        <Route path="/:id" element={<TicketDetails tickets={tickets} users={users} assignUser={assignUser} setStatus={setStatus} />} />
      </Routes>
    </div>
  );
};

export default App;
