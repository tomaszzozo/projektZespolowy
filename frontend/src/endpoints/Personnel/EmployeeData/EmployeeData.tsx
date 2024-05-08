import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import PersonIcon from "@mui/icons-material/Person";
import {
	Backdrop,
	SpeedDial,
	SpeedDialAction,
	SpeedDialIcon,
} from "@mui/material";
import styles from "./styles.module.scss";
import SaveIcon from "@mui/icons-material/Save";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function EmployeeData() {
	const [year, setYear] = useState<Dayjs>(dayjs(new Date()));
	const [backdropOpen, setBackdropOpen] = useState(false);
	const handleOpen = () => setBackdropOpen(true);
	const handleClose = () => setBackdropOpen(false);

	const actions = [
		{ icon: <PersonSearchIcon />, name: "Wyszukiwarka" },
		{ icon: <AssessmentIcon />, name: "Rozliczenia" },
		{ icon: <PersonIcon />, name: "Dane" },
	];

	return (
		<>
			<Header selectedPage={"personnel"} />
			<Title
				label="Tomasz Wojtkiewicz: dane"
				icon={<PersonIcon className="color-darker-white" />}
			/>
			<Backdrop open={backdropOpen} />
			<footer className={styles.footerNavigation}>
				<SpeedDial
					ariaLabel="SpeedDial tooltip example"
					sx={{ position: "absolute", bottom: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					open={backdropOpen}
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen
							onClick={handleClose}
						/>
					))}
				</SpeedDial>
			</footer>
		</>
	);
}
