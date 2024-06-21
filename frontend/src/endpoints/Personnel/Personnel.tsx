import Header from "../../components/Header/Header";
import React, { useEffect, useState } from "react";
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
import { useCookies } from "react-cookie";
import validateToken from "../../functions/ValidateToken";
import FullscreenProgress from "../../components/FullscreenProgress/FullscreenProgress";

export type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number:string;
  role: number;
};

export default function Personnel() {
  useEffect(
    () => {
      validateToken(cookie, navigate, setCookie, setWaiting);
    },
    [], // eslint-disable-line
  );
  const [waiting, setWaiting] = useState(true);
  const [cookie, setCookie] = useCookies(["role"]);
  const navigate = useNavigate();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [fetchedData, setFetchedData] = useState<Person[]>([
    {
      id: 1,
      first_name: "Tester",
      last_name: "Testiusz",
      email: "tester@testing.com",
      role: 0,
      phone_number: "799799799",
    },
    {
      id: 2,
      first_name: "Adam",
      last_name: "Testiusz",
      email: "tester@testing.com",
      role: 1,
      phone_number: "799799799",
    },
    {
      id: 3,
      first_name: "Tester",
      last_name: "Kowalski",
      email: "tester@gmail.com",
      role: 2,
      phone_number: "799799799",
    },
    {
      id: 4,
      first_name: "Jan",
      last_name:
        "Nowak Nowakiewicz Nowakowski von Novakus aka Nowak Nowakiewicz Nowakowski von Novakus",
      email: "jan@nowak.com",
      role: 0,
      phone_number: "799799799",
    },
    {
      id: 5,
      first_name: "Tester",
      last_name: "Testiusz",
      email: "tester@testing.com",
      role: 0,
      phone_number: "799799799",
    },
    {
      id: 6,
      first_name: "Tester",
      phone_number: "799799799",
      last_name: "Testiusz",
      email: "tester@testing.com",
      role: 0,
    },
    {
      id: 7,
      first_name: "Tester",
      last_name: "Testiusz",
      phone_number: "799799799",
      email: "tester@testing.com",
      role: 0,
    },
  ]);
  const [filteredData, setFilteredData] = useState<Person[]>(fetchedData);

  if (waiting) {
    return <FullscreenProgress />;
  }

  return (
    <>
      <Header selectedPage={"personnel"} />
      <div className={"container-fluid"}>
        <div className={"row mb-4"}>
          <div
            className={
              "col d-flex flex-column flex-sm-row justify-content-center align-items-center " +
              styles.searchSection
            }
          >
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
                PersonnelScripts.onSearchClick(
                  searchFieldValue,
                  fetchedData,
                  setFilteredData,
                )
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
                {filteredData.map((obj) => (
                  <TableRow key={obj.id} hover role="button">
                    <TableCell
                      onClick={() =>
                        PersonnelScripts.onRowClick(obj.id, navigate)
                      }
                    >{`${obj.first_name} ${obj.last_name}`}</TableCell>
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
              >{`${obj.first_name} ${obj.last_name}`}</div>
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
