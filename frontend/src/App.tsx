import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Reports from "./endpoints/Reports/Reports";
import SignIn from "./endpoints/SignIn/SignIn";
import NotFound from "./endpoints/NotFound/NotFound";
import Personnel from "./endpoints/Personnel/Personnel";
import Administration from "./endpoints/Administration/Administration";
import EmployeeMenu from "./endpoints/Personnel/EmployeeMenu/EmployeeMenu";
import EmployeeReports from "./endpoints/Personnel/EmployeeReports/EmployeeReports";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { plPL } from "@mui/x-date-pickers/locales";

const router = createBrowserRouter([
  { path: "/", element: <Reports /> },
  { path: "/reports", element: <Reports /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/personnel", element: <Personnel /> },
  { path: "/administration", element: <Administration /> },
  { path: "/personnel/employeeMenu", element: <EmployeeMenu /> },
  { path: "/personnel/employeeReport", element: <EmployeeReports /> },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          plPL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <RouterProvider router={router} />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}
