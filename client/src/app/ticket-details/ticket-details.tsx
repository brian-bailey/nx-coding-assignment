import { Ticket, User } from '@acme/shared-models';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import '/node_modules/primeflex/primeflex.css';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  tickets: Ticket[];
  users: User[];
  setStatus?: (ticket: Ticket, complete: boolean) => void;
  assignUser?: (ticket: Ticket, user: number) => void;
}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams();
  const ticket = props.tickets.find((e) => e.id === Number(id));
  const userOptions = props.users.map((user) => {
    return { label: user.name, value: user.id };
  });

  return (
    <div>
      {ticket ? (
        <div>
          <div className="card">
            <h2>Ticket Details</h2>
            <div className="field grid">
              <label
                htmlFor="ID"
                className="col-fixed"
                style={{ width: '100px' }}
              >
                ID
              </label>
              <div className="col">
                <label id="ID">{ticket.id}</label>
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
                <label id="Description">{ticket.description}</label>
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
                  onChange={(e) => props.assignUser?.(ticket, e.target.value)}
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
                  onChange={(e) => props.setStatus?.(ticket, e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span>Ticket not found</span>
      )}
    </div>
  );
}

export default TicketDetails;
