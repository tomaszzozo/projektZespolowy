import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonIcon from "@mui/icons-material/Person";
import FabNavgiation, {
	Action,
} from "../../../components/FabNavigation/FabNavigation";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./styles.module.scss";

export default function EmployeeBottomNavigation() {
	const navigate = useNavigate();

	const actions: Action[] = [
		{
			icon: <PersonSearchIcon />,
			name: "Wyszukiwarka",
			onClick: () => navigate("/personnel"),
		},
		{
			icon: <AssessmentIcon />,
			name: "Rozliczenia",
			onClick: () =>
				navigate(
					`/personnel/report?id=1&year=${new Date().getFullYear()}&month=${new Date().getMonth()}`
				),
		},
		{
			icon: <PersonIcon />,
			name: "Dane",
			onClick: () => navigate("/personnel/data?id=1"),
		},
	];

	return (
		<>
			<FabNavgiation actions={actions} />
			<div className={styles.fabContainer}>
				<Fab variant="extended" className={styles.fab}>
					Zapisz
					<SaveIcon className={styles.fabIcon} />
				</Fab>
			</div>
		</>
	);
}
