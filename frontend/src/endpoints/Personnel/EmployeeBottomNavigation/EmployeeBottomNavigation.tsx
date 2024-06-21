import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonIcon from "@mui/icons-material/Person";
import FabNavgiation, {
  Action,
} from "../../../components/FabNavigation/FabNavigation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./styles.module.scss";
import React from "react";

export default function EmployeeBottomNavigation(
  props: Readonly<{
    saveButtonActive: boolean;
    saveButtonOnClick: Function;
  }>,
) {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  if (
    queryParameters.get("id") === null ||
    parseInt(queryParameters.get("id")!) <= 0
  ) {
    console.error(`id ${queryParameters.get("id")} is incorrect`);
    navigate("/personnel");
    return;
  }

  const id = parseInt(queryParameters.get("id")!);

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
          `/personnel/report?id=${id}&year=${new Date().getFullYear()}&month=${new Date().getMonth()}`,
        ),
    },
    {
      icon: <PersonIcon />,
      name: "Dane",
      onClick: () => navigate(`/personnel/data?id=${id}`),
    },
  ];

  return (
    <>
      <div className={styles.spacer}></div>
      <footer className={styles.footer}>
        <Fab
          size="large"
          color="primary"
          aria-label="save"
          className={
            props.saveButtonActive ? styles.button : styles.buttonHidden
          }
          onClick={() => props.saveButtonOnClick()}
        >
          <SaveIcon />
        </Fab>
        <FabNavgiation actions={actions} />
      </footer>
    </>
  );
}
