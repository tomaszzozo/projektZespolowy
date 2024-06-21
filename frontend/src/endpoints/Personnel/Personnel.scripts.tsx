import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Person } from "./Personnel";
import { NavigateFunction } from "react-router-dom";
import styles from "./styles.module.scss";
import React from "react";

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
		fetchedData: Person[],
		setFilteredData: React.Dispatch<React.SetStateAction<Person[]>>
	) => {
		if (searchFieldValue === "") {
			setFilteredData([
				...fetchedData.sort((p1, p2) => {
					return p1.id - p2.id;
				})
			])
		}

		const resultSet: Set<Person> = new Set();

		fetchedData.forEach((p) => {
			if (p.first_name.includes(searchFieldValue)) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (p.last_name.includes(searchFieldValue)) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (p.email.includes(searchFieldValue)) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (getRole(p.role).includes(searchFieldValue)) {
				resultSet.add(p);
			}
		})

		fetchedData.forEach((p) => {
			if (p.first_name.toLowerCase().includes(searchFieldValue.toLowerCase())) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (p.last_name.toLowerCase().includes(searchFieldValue.toLowerCase())) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (p.email.toLowerCase().includes(searchFieldValue.toLowerCase())) {
				resultSet.add(p);
			}
		})
		fetchedData.forEach((p) => {
			if (getRole(p.role).toLowerCase().includes(searchFieldValue.toLowerCase())) {
				resultSet.add(p);
			}
		})

		setFilteredData(Array.from(resultSet));
	};
}
