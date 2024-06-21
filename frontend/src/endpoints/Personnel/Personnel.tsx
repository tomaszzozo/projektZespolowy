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
  phone_number: string;
  role: number;
};

export default function Personnel() {
  const [waiting, setWaiting] = useState(true);
  const [cookie, setCookie] = useCookies(["role"]);
  const navigate = useNavigate();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [fetchedData, setFetchedData] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>(fetchedData);

  useEffect(
    () => {
      new Promise<void>((resolve) => {
        validateToken(cookie, navigate, setCookie, setWaiting);
        setWaiting(true);
        resolve();
      }).then(() => {
        fetch("http://localhost:8080/user", {
          credentials: "include",
        })
          .then((response) => {
            if (response.status !== 200) {
              throw Error(
                "Token logowania przedawnił się lub wystąpił błąd serwera.",
              );
            }
            return response.text();
          })
          .then((text) => {
            setFetchedData([...JSON.parse(text)]);
            setFilteredData([...JSON.parse(text)]);
            setWaiting(false);
          })
          .catch((error) => {
            console.error(error);
            navigate("/signIn");
            return;
          });
      });
    },
    [], // eslint-disable-line
  );

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
          {filteredData.map((obj) => (
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
