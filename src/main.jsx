import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/error-page';
import Login from './routes/login.jsx';
import Root, { loader as rootLoader } from "./routes/root";
import { CookiesProvider } from 'react-cookie';

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
  
);
