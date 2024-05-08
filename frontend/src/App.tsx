import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Reports from "./endpoints/Reports/Reports";
import SignIn from "./endpoints/SignIn/SignIn";
import NotFound from "./endpoints/NotFound/NotFound";
import Personnel from "./endpoints/Personnel/Personnel";
import Administration from "./endpoints/Administration/Administration";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { plPL } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pl";
import EmployeeData from "./endpoints/Personnel/EmployeeData/EmployeeData";

const router = createBrowserRouter([
	{ path: "/", element: <Personnel /> },
	{ path: "/signIn", element: <SignIn /> },
	{ path: "/personnel", element: <Personnel /> },
	{ path: "/personnel/data", element: <EmployeeData /> },
	{ path: "*", element: <NotFound /> },
]);

export default function App() {
	return (
		<StyledEngineProvider injectFirst>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale="pl"
				localeText={
					plPL.components.MuiLocalizationProvider.defaultProps.localeText
				}
			>
				<RouterProvider router={router} />
			</LocalizationProvider>
		</StyledEngineProvider>
	);
}
