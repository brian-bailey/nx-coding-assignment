import { Ticket, User } from '@acme/shared-models';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import EditTicketDetails from '../edit-ticket-details/edit-ticket-details';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  setStatus?: (ticket: Ticket, complete: boolean) => void;
  assignUser?: (ticket: Ticket, user: number) => void;
  createTicket?: (ticket: Ticket) => void;
}

export function Tickets(props: TicketsProps) {
  const [ticketDialog, setTicketDialog] = useState(false);
  const userOptions = props.users.map((user) => {
    return { label: user.name, value: user.id };
  });

  return (
    <div>
      <h2>Tickets</h2>
      <DataTable value={props.tickets} loading={props.tickets.length === 0}>
        <Column field="id" header="ID"></Column>
        <Column field="description" header="Description" />
        <Column
          field="assigneeId"
          header="Assignee"
          body={(ticket: Ticket) => {
            return (
              <Dropdown
                options={userOptions}
                value={ticket.assigneeId}
                onChange={(e) => props.assignUser?.(ticket, e.target.value)}
              />
            );
          }}
        />
        <Column
          field="completed"
          header="Complete"
          body={(ticket: Ticket) => {
            return (
              <Checkbox
                id="Status"
                checked={ticket.completed}
                onChange={(e) => props.setStatus?.(ticket, e.target.checked)}
              />
            );
          }}
        />
      </DataTable>
      <Button
        label="Add Ticket"
        icon="pi pi-plus"
        onClick={() => setTicketDialog(true)}
      />
      <Dialog
        visible={ticketDialog}
        modal
        onHide={() => setTicketDialog(false)}
        header="Edit Ticket Details"
      >
        <EditTicketDetails
          tickets={props.tickets}
          users={props.users}
          onSubmit={(ticket) => {
            console.log(JSON.stringify(ticket));
            setTicketDialog(false);
            props.createTicket?.(ticket);
          }}
        />
      </Dialog>
    </div>
  );
}

export default Tickets;
