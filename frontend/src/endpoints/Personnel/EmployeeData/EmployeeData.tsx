import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import PersonIcon from "@mui/icons-material/Person";
import EmployeeBottomNavigation from "../EmployeeBottomNavigation/EmployeeBottomNavigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import validateToken from "../../../functions/ValidateToken";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import styles from "./styles.module.scss";
import { Button, TextField } from "@mui/material";
import { Person } from "../Personnel";

export default function EmployeeData() {
  const [waiting, setWaiting] = useState(true);
  const [cookie, setCookie] = useCookies(["role"]);
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<Person>({
    id: 1,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: 0,
  });
  const [currentData, setCurrentData] = useState<Person>(fetchedData);
  const [buttonActive, setButtonActive] = useState(false);
  const [saveOverlay, setSaveOverlay] = useState(false);

  useEffect(
    () => {
      new Promise<void>((resolve) => {
        validateToken(cookie, navigate, setCookie, setWaiting);
        setWaiting(true);
        resolve();
      }).then(() => {
        if (
          queryParameters.get("id") === null ||
          parseInt(queryParameters.get("id")!) <= 0
        ) {
          console.error(`id ${queryParameters.get("id")} is incorrect`);
          navigate("/personnel");
          return;
        }
        const id = parseInt(queryParameters.get("id")!);
        fetch(`http://localhost:8080/user/${id}`, {
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
            setFetchedData({ ...JSON.parse(text) });
            setCurrentData({ ...JSON.parse(text) });
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
  useEffect(
    () =>
      setButtonActive(
        JSON.stringify(currentData) !== JSON.stringify(fetchedData),
      ),
    [currentData], // eslint-disable-line
  );

  if (waiting) {
    return <FullscreenProgress />;
  }

  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz: dane"
        icon={<PersonIcon className="color-darker-white" />}
      />

      <div className={styles.contentContainer}>
        <TextField
          label={"Imię"}
          value={currentData.first_name}
          onChange={(e) =>
            setCurrentData({ ...currentData, first_name: e.target.value })
          }
        />
        <TextField
          label={"Nazwisko"}
          value={currentData.last_name}
          onChange={(e) =>
            setCurrentData({ ...currentData, last_name: e.target.value })
          }
        />
        <TextField
          label={"Email"}
          value={currentData.email}
          onChange={(e) =>
            setCurrentData({ ...currentData, email: e.target.value })
          }
        />
        <TextField
          label={"Numer telefonu"}
          value={currentData.phone_number}
          onChange={(e) =>
            setCurrentData({ ...currentData, phone_number: e.target.value })
          }
        />
      </div>
      <EmployeeBottomNavigation
        saveButtonActive={buttonActive}
        saveButtonOnClick={() => {
          setSaveOverlay(true);
        }}
      />
      {saveOverlay && (
        <div className={styles.blockerContainer}>
          <div className={styles.blockerCard}>
            <p>Zapisać zmiany?</p>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => setSaveOverlay(false)}
            >
              Nie zapisuj
            </Button>
            <Button
              variant="contained"
              size={"large"}
              onClick={() => {
                fetch("http://localhost:8080/user", {
                  credentials: "include",
                  method: "PUT",
                  headers: [["Content-Type", "application/json"]],
                  body: JSON.stringify(currentData),
                })
                  .then((response) => {
                    if (response.status !== 200) {
                      throw Error("Nie udało się przetworzyć żądania");
                    }
                    setFetchedData({ ...currentData });
                    setButtonActive(false);
                    setSaveOverlay(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    navigate("/signIn");
                    return;
                  });
              }}
            >
              Zapisz
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
