import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import superrouter from './routes/Router';
import './assets/scss/main.scss'
import './hooks/usei18n';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = superrouter(createBrowserRouter);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
