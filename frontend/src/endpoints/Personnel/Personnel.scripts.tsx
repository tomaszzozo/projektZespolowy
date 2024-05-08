import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Person } from "./Personnel";
import { NavigateFunction } from "react-router-dom";
import styles from "./styles.module.scss";

export namespace PersonnelScripts {
	export const getRole = (role: number) => {
		if (role === 0) return "Pracownik";
		else if (role === 1) return "Menadżer";
		else if (role === 2) return "Administrator";
		else return "Błąd!";
	};

	export const getRoleIcon = (role: number) => {
		if (role === 0) return <PersonIcon className={styles.cardIcon} />;
		else if (role === 1)
			return <ManageAccountsIcon className={styles.cardIcon} />;
		else if (role === 2)
			return <AdminPanelSettingsIcon className={styles.cardIcon} />;
		else return <BugReportIcon className={styles.cardIcon} />;
	};

	export const onRowClick = (id: number, navigate: NavigateFunction) => {
		navigate(`/personnel/data?id=${id}`);
	};

	export const onSearchClick = (
		searchFieldValue: string,
		useStateFetchedData: [
			Person[],
			React.Dispatch<React.SetStateAction<Person[]>>,
		]
	) => {
		const [fetchedData, setFetchedData] = useStateFetchedData;

		if (searchFieldValue === "") {
			setFetchedData([
				...fetchedData.sort((p1, p2) => {
					return p1.id - p2.id;
				}),
			]);
		}

		setFetchedData([
			...fetchedData.sort((p1, p2) => {
				const calculateSortingPoints = (p: Person): number => {
					if (p.name.includes(searchFieldValue)) {
						return 5;
					} else if (p.email.includes(searchFieldValue)) {
						return 4;
					} else if (
						p.name.toLowerCase().includes(searchFieldValue.toLowerCase())
					) {
						return 3;
					} else if (
						p.email.toLowerCase().includes(searchFieldValue.toLowerCase())
					) {
						return 2;
					} else if (
						getRole(p.role)
							.toLowerCase()
							.includes(searchFieldValue.toLowerCase())
					) {
						return 1;
					}
					return 0;
				};
				return calculateSortingPoints(p2) - calculateSortingPoints(p1);
			}),
		]);
	};
}
