import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/vela-blue/theme.css";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
