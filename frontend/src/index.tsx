import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";

const router = createBrowserRouter([
    { path: "/signIn", element: <SignIn /> },
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
