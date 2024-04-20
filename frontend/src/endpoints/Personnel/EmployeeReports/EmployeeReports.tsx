import Header from "../../../components/Header/Header";
import PersonIcon from "@mui/icons-material/Person";
import Title from "../../../components/Title/Title";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Button,
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

export default function EmployeeReports() {
  const [year, setYear] = useState<Dayjs>(dayjs(new Date()));

  const tableHeaderGroups: { label: string; span: number }[] = [
    { label: "", span: 1 },
    { label: "", span: 2 },
    { label: "Podstawa wypłaty", span: 4 },
    { label: "L4", span: 3 },
    { label: "Urlopy", span: 7 },
    { label: "Nadgodziny", span: 3 },
    { label: "Pozostałe", span: 8 },
    { label: "Uwagi", span: 3 },
    { label: "Sumy", span: 2 },
  ];

  const tableHeaders: { label: string; border?: boolean }[] = [
    { label: "", border: true },
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

  const data: {}[] = [{}];

  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz"
        icon={<PersonIcon className="color-darker-white" />}
      />
      <div className={"d-flex justify-content-center my-4"}>
        <DatePicker
          views={["year"]}
          label={"Rok"}
          value={year}
          onChange={(newValue) => {
            if (newValue !== null) {
              setYear(newValue);
            }
          }}
        />
      </div>
      <div className={"d-flex justify-content-center my-4"}>
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
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
