import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Suspense fallback="Loading Page">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
);
