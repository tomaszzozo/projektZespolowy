import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import './index.sass';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    // { path: "/", element: <Home /> },
    // { path: "/home", element: <Home /> },
    // { path: "/signIn", element: <SignIn /> },
    // { path: "*", element: <PageNotFound /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
    </StyledEngineProvider>
);

reportWebVitals();
