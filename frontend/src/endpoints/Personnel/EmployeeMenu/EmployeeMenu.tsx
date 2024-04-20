import { Avatar } from "@mui/material";
import Header from "../../../components/Header/Header";
import styles from "./styles.module.scss";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Title from "../../../components/Title/Title";

export default function EmployeeMenu() {
  const columnClassName = `
	col-12 d-flex justify-content-center align-items-center mt-3
	col-lg-4 align-items-lg-start
	`;
  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz"
        icon={<PersonIcon className="color-darker-white" />}
      />
      <div className={`container-fluid ${styles.menuContainer}`}>
        <div className="row h-100">
          <div className={columnClassName}>
            <Link
              to={`/personnel/employeeReport?id=1&year=${new Date().getFullYear()}`}
              className={styles.menuOptionContainer}
            >
              <Avatar className="bg-darker-white">
                <AssessmentIcon className="color-primary" />
              </Avatar>
              <p className="mb-0 mt-2 color-darker-white">Raporty</p>
            </Link>
          </div>
          <div className={columnClassName}>
            <div className={styles.menuOptionContainer}>
              <Avatar className="bg-darker-white">
                <FolderSharedIcon className="color-primary" />
              </Avatar>
              <p className="mb-0 mt-2 color-darker-white">Dane</p>
            </div>
          </div>
          <div className={columnClassName}>
            <div className={styles.menuOptionContainer}>
              <Avatar className="bg-darker-white">
                <LockResetIcon className="color-primary" />
              </Avatar>
              <p className="mb-0 mt-2 color-darker-white">Zmiana hasła</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
