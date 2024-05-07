import Header from "../../../components/Header/Header";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../../../components/Title/Title";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
	Button,
	Fab,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SaveIcon from "@mui/icons-material/Save";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function EmployeeReports() {
	const [year, setYear] = useState<Dayjs>(dayjs(new Date()));

	const tableHeaderGroups: { label: string; span: number }[] = [
		{ label: "Akcje", span: 1 },
		{ label: "Daty", span: 2 },
		{ label: "Podstawa wypłaty", span: 4 },
		{ label: "L4", span: 3 },
		{ label: "Urlopy", span: 7 },
		{ label: "Nadgodziny", span: 3 },
		{ label: "Pozostałe", span: 8 },
		{ label: "Uwagi", span: 3 },
		{ label: "Sumy", span: 2 },
	];

	const tableHeaders: { label: string; border?: boolean }[] = [
		{ label: "Generuj raport", border: true },
		{ label: "Miesiąc" },
		{ label: "Data rozliczenia", border: true },
		{ label: "Godziny" },
		{ label: "Stawka" },
		{ label: "Razem" },
		{ label: "Przelano", border: true },
		{ label: "Dni" },
		{ label: "Dniówka" },
		{ label: "Razem", border: true },
		{ label: "Dni" },
		{ label: "Pozostało (dni)" },
		{ label: "Bezpłatny (dni)" },
		{ label: "Na żądanie (dni)" },
		{ label: "Okolicznościowy (dni)" },
		{ label: "Dniówka" },
		{ label: "Razem", border: true },
		{ label: "Godziny" },
		{ label: "Stawka" },
		{ label: "Razem", border: true },
		{ label: "Premia" },
		{ label: "Zaliczka" },
		{ label: "Pożyczka" },
		{ label: "Koszty dodatkowe" },
		{ label: "Koszty dodatkowe - opis" },
		{ label: "Koszty inne" },
		{ label: "Koszty inne - opis" },
		{ label: "Podatek 25 r.ż.", border: true },
		{ label: "Uwaga 1" },
		{ label: "Uwaga 2" },
		{ label: "Uwaga 3", border: true },
		{ label: "Koszty" },
		{ label: "Do wypłaty" },
	];

	return (
		<>
			<Header selectedPage={"personnel"} />
			<Title
				label="Tomasz Wojtkiewicz"
				icon={<PersonIcon className="color-darker-white" />}
			/>
			<div className={"d-flex justify-content-center my-4"}>
				<DatePicker
					views={["year", "month"]}
					label={"Miesiąc"}
					value={year}
					onChange={(newValue) => {
						if (newValue !== null) {
							setYear(newValue);
						}
					}}
					minDate={dayjs(new Date(2020, 1, 1))}
				/>
			</div>
			{/* <div className={"d-flex justify-content-center my-4"}>
        <TextField
          label="Roczny wymiar urlopu"
          type="number"
          defaultValue={"22"}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalBarIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={"d-flex justify-content-center my-4"}>
        <Button variant="contained" size="large" endIcon={<SaveIcon />}>
          Zapisz
        </Button>
      </div>
      <div className={"container-fluid"}>
        <div className={styles.tableContainer}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeaderGroups.map((obj, i) => (
                    <TableCell
                      key={i}
                      className={`${styles.tableHeaderCell} ${i === tableHeaderGroups.length - 1 ? "" : styles.tableHeaderBorderRight}`}
                      colSpan={obj.span}
                    >
                      {obj.label}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {tableHeaders.map((obj, i) => (
                    <TableCell
                      key={i}
                      className={`${styles.tableHeaderCell} ${obj.border ? styles.tableHeaderBorderRight : ""}`}
                    >
                      {obj.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Fab className={"bg-primary"}>
                      <AssessmentIcon className={"color-darker-white"} />
                    </Fab>
                  </TableCell>
                  <TableCell>Styczeń</TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      variant={"standard"}
                      placeholder={"dd.mm.rrrr"}
                      size={"small"}
                      sx={{ width: "85px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      variant={"standard"}
                      size={"small"}
                      sx={{ width: "45px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">h</InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      variant={"standard"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">zł/h</InputAdornment>
                        ),
                      }}
                      size={"small"}
                      sx={{ width: "75px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">zł</InputAdornment>
                        ),
                      }}
                      variant={"standard"}
                      size={"small"}
                      sx={{ width: "80px" }}
                      defaultValue={"0"}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      hiddenLabel
                      variant={"standard"}
                      size={"small"}
                      sx={{ minWidth: "80px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">zł</InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Fab className={"bg-primary"}>
                      <AssessmentIcon className={"color-darker-white"} />
                    </Fab>
                  </TableCell>
                  <TableCell>Luty</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div> */}
		</>
	);
}
