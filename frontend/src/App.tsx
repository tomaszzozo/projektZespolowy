import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Reports from "./endpoints/Reports/Reports";
import SignIn from "./endpoints/SignIn/SignIn";
import NotFound from "./endpoints/NotFound/NotFound";
import Personnel from "./endpoints/Personnel/Personnel";
import Administration from "./endpoints/Administration/Administration";
import EmployeeHome from "./endpoints/Personnel/EmployeeHome/EmployeeHome";

const router = createBrowserRouter([
	{ path: "/", element: <Reports /> },
	{ path: "/reports", element: <Reports /> },
	{ path: "/signIn", element: <SignIn /> },
	{ path: "/personnel", element: <Personnel /> },
	{ path: "/administration", element: <Administration /> },
	{ path: "/personnel/employeeMenu", element: <EmployeeHome /> },
	{ path: "*", element: <NotFound /> },
]);

export default function App() {
	return (
		<StyledEngineProvider injectFirst>
			<RouterProvider router={router} />
		</StyledEngineProvider>
	);
}
