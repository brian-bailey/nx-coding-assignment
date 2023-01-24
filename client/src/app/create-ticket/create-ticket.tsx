import { Ticket, User } from '@acme/shared-models';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';
import '/node_modules/primeflex/primeflex.css';

/* eslint-disable-next-line */
export interface CreateTicketProps {
  tickets: Ticket[];
  users: User[];
  onSubmit: (ticket: Ticket) => void;
}

export function CreateTicket(props: CreateTicketProps) {
  const [ticket, setTicket] = useState({
    id: getAvailableId(),
    description: 'Write Description Here',
    assigneeId: 1,
    completed: false,
  } as Ticket);
  const userOptions = props.users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  function getAvailableId() {
    let newId = 1;
    const unavailableIds = props.tickets.map(t => t.id);
    while(unavailableIds.includes(newId)) {
      newId++;
    }
    return newId;
  }

  return (
    <div className="card">
      <div className="field grid">
        <label htmlFor="ID" className="col-fixed" style={{ width: '100px' }}>
          ID
        </label>
        <div className="col">
          <InputNumber
            value={ticket.id}
            min={getAvailableId()} //TODO: Make this more sophisticated. Should show an error message if the number is taken
            onChange={(e) => {
              if (e.value) {
                setTicket({ ...ticket, id: e.value });
              }
            }}
          />
        </div>
      </div>
      <div className="field grid">
        <label
          htmlFor="description"
          className="col-fixed"
          style={{ width: '100px' }}
        >
          Description
        </label>
        <div className="col">
          <InputTextarea
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="field grid">
        <label
          htmlFor="assignee"
          className="col-fixed"
          style={{ width: '100px' }}
        >
          Assignee
        </label>
        <div className="col">
          <Dropdown
            options={userOptions}
            value={ticket.assigneeId}
            onChange={(e) =>
              setTicket({ ...ticket, assigneeId: e.target.value })
            }
          />
        </div>
      </div>
      <div className="field-checkbox">
        <label
          htmlFor="status"
          className="col-fixed"
          style={{ width: '100px' }}
        >
          Status
        </label>
        <div className="col">
          <Checkbox
            id="Status"
            checked={ticket.completed}
            onChange={(e) =>
              setTicket({ ...ticket, completed: e.target.checked })
            }
          />
        </div>
      </div>
      <div className="field grid">
        <div className="col-fixed">
          <Button
            label="Submit"
            onClick={() => props.onSubmit(ticket)}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
