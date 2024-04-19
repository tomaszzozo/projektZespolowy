import React, { ReactElement } from "react";
import styles from "./styles.module.scss";
import { Fab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideMenu from "./Drawer/SideMenu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Navigation from "./Navigation/Navigation";

export type SelectedPage = "reports" | "personnel" | "administration";

interface Props {
	selectedPage: SelectedPage;
}

export default function Header(props: Props) {
	const [open, setOpen] = React.useState(false);
	const navigationContent: {
		label: string;
		icon: ReactElement;
		endpoint: SelectedPage;
	}[] = [
		{
			label: "Raporty",
			icon: <AssessmentIcon />,
			endpoint: "reports",
		},
		{
			label: "Personel",
			icon: <PersonSearchIcon />,
			endpoint: "personnel",
		},
		{
			label: "Administracja",
			icon: <AdminPanelSettingsIcon />,
			endpoint: "administration",
		},
	];

	return (
		<header
			className={
				"position-sticky top-0 container-fluid p-0 bg-primary d-flex align-items-center mb-4 mb-md-5 " +
				styles.header
			}
		>
			<Fab
				className={"fab-primary mx-4 d-md-none"}
				aria-label="menu"
				onClick={() => setOpen(true)}
				size={"small"}
			>
				<MenuIcon />
			</Fab>
			<SideMenu
				openState={[open, setOpen]}
				navigationContent={navigationContent}
			/>
			<p className={"fs-4 my-0 mx-md-4 fw-bold color-white"}>EZ-HR</p>
			<Navigation
				navigationContent={navigationContent}
				selected={props.selectedPage}
			/>
		</header>
	);
}
