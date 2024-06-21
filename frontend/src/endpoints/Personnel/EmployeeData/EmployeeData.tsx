import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import PersonIcon from "@mui/icons-material/Person";
import EmployeeBottomNavigation from "../EmployeeBottomNavigation/EmployeeBottomNavigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import validateToken from "../../../functions/ValidateToken";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";
import styles from "./styles.module.scss";
import {Button, TextField} from "@mui/material";
import { Person } from "../Personnel";

export default function EmployeeData() {
  const [waiting, setWaiting] = useState(true);
  const [cookie, setCookie] = useCookies(["role"]);
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState<Person>({
    id: 1,
    name: "Tester",
    surname: "Testiusz",
    email: "tester@testing.com",
    phoneNumber: "799799799",
    role: 0,
  });
  const [currentData, setCurrentData] = useState<Person>(fetchedData);
  const [buttonActive, setButtonActive] = useState(false);
    const [saveOverlay, setSaveOverlay] = useState(false);

  useEffect(
    () => {
      validateToken(cookie, navigate, setCookie, setWaiting);
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
          value={currentData.name}
          onChange={(e) =>
            setCurrentData({ ...currentData, name: e.target.value })
          }
        />
        <TextField
          label={"Nazwisko"}
          value={currentData.surname}
          onChange={(e) =>
            setCurrentData({ ...currentData, surname: e.target.value })
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
          value={currentData.phoneNumber}
          onChange={(e) =>
            setCurrentData({ ...currentData, phoneNumber: e.target.value })
          }
        />
      </div>
      <EmployeeBottomNavigation
        saveButtonActive={buttonActive}
        saveButtonOnClick={() => {setSaveOverlay(true)}}
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
                            setFetchedData({...currentData});
                            setButtonActive(false);
                            setSaveOverlay(false);
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
