import Header from "../../components/Header/Header";
import React, { useState } from "react";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";
import { PersonnelScripts } from "./Personnel.scripts";
import { useNavigate } from "react-router-dom";

export type Person = {
	id: number;
	name: string;
	surname: string;
	email: string;
	role: number;
};

export default function Personnel() {
	const navigate = useNavigate();
	const [searchFieldValue, setSearchFieldValue] = useState("");
	const [fetchedData, setFetchedData] = useState<Person[]>([
		{
			id: 1,
			name: "Tester",
			surname: "Testiusz",
			email: "tester@testing.com",
			role: 0,
		},
		{
			id: 2,
			name: "Adam",
			surname: "Testiusz",
			email: "tester@testing.com",
			role: 1,
		},
		{
			id: 3,
			name: "Tester",
			surname: "Kowalski",
			email: "tester@gmail.com",
			role: 2,
		},
		{
			id: 4,
			name: "Jan",
			surname:
				"Nowak Nowakiewicz Nowakowski von Novakus aka Nowak Nowakiewicz Nowakowski von Novakus",
			email: "jan@nowak.com",
			role: 0,
		},
		{
			id: 5,
			name: "Tester",
			surname: "Testiusz",
			email: "tester@testing.com",
			role: 0,
		},
		{
			id: 6,
			name: "Tester",
			surname: "Testiusz",
			email: "tester@testing.com",
			role: 0,
		},
		{
			id: 7,
			name: "Tester",
			surname: "Testiusz",
			email: "tester@testing.com",
			role: 0,
		},
	]);

	return (
		<>
			<Header selectedPage={"personnel"} />
			<div className={"container-fluid"}>
				<div className={"row mb-4"}>
					<div className="col d-flex flex-column flex-sm-row justify-content-center align-items-center">
						<TextField
							label="Wyszukaj pracownika"
							value={searchFieldValue}
							onChange={(event) => setSearchFieldValue(event.target.value)}
							variant="outlined"
							sx={{ width: "100%" }}
							className={"mx-2 " + styles.searchBar}
						/>
						<Button
							onClick={() =>
								PersonnelScripts.onSearchClick(searchFieldValue, [
									fetchedData,
									setFetchedData,
								])
							}
							variant="outlined"
							className={
								"mx-2 mt-3 mt-sm-0 bg-primary color-darker-white " +
								styles.searchButton
							}
							startIcon={<SearchIcon />}
						>
							Szukaj
						</Button>
					</div>
				</div>
				<div className={styles.tableContainer + " d-none d-sm-block"}>
					<TableContainer className={styles.muiTableContainer}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell className={styles.tableHeaderCell}>
										Imię i nazwisko
									</TableCell>
									<TableCell className={styles.tableHeaderCell}>
										Email
									</TableCell>
									<TableCell className={styles.tableHeaderCell}>
										Uprawnienia
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{fetchedData.map((obj) => (
									<TableRow key={obj.id} hover role="button">
										<TableCell
											onClick={() =>
												PersonnelScripts.onRowClick(obj.id, navigate)
											}
										>{`${obj.name} ${obj.surname}`}</TableCell>
										<TableCell
											onClick={() =>
												PersonnelScripts.onRowClick(obj.id, navigate)
											}
										>
											{obj.email}
										</TableCell>
										<TableCell
											onClick={() =>
												PersonnelScripts.onRowClick(obj.id, navigate)
											}
										>
											<div className="d-flex align-items-center">
												{PersonnelScripts.getRoleIcon(obj.role)}
												<div className="ms-1 color-black">
													{PersonnelScripts.getRole(obj.role)}
												</div>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
				<div className={"d-sm-none " + styles.cardsContainer}>
					{fetchedData.map((obj) => (
						<div
							key={obj.id}
							className={styles.cardContainer}
							onClick={() => PersonnelScripts.onRowClick(obj.id, navigate)}
						>
							<div
								className={styles.cardHeader}
							>{`${obj.name} ${obj.surname}`}</div>
							<div className={styles.cardMail}>{obj.email}</div>
							<div className={styles.cardRole}>
								{PersonnelScripts.getRole(obj.role)}
								{PersonnelScripts.getRoleIcon(obj.role)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
