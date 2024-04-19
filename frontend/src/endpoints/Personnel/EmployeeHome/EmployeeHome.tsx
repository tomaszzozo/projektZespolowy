import { Avatar } from "@mui/material";
import Header from "../../../components/Header/Header";
import styles from "./styles.module.scss";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonIcon from "@mui/icons-material/Person";

export default function EmployeeHome() {
	const columnClassName = `
	col-12 d-flex justify-content-center align-items-center mt-3
	col-lg-4 align-items-lg-start
	`;
	return (
		<>
			<Header selectedPage={"personnel"} />
			<div className={styles.menuHeader}>
				<Avatar className="bg-primary">
					<PersonIcon className="color-darker-white" />
				</Avatar>
				<p className="mt-2 mb-0 fw-bold color-black">Tomasz Wojtkiewicz</p>
			</div>
			<div className={`container-fluid ${styles.menuContainer}`}>
				<div className="row h-100">
					<div className={columnClassName}>
						<div className={styles.menuOptionContainer}>
							<Avatar className="bg-darker-white">
								<AssessmentIcon className="color-primary" />
							</Avatar>
							<p className="mb-0 mt-2 color-darker-white">Raporty</p>
						</div>
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
			{/* <div className={styles.menuContainer}>
				<div className={styles.menuOptionContainer}>
					<Avatar className="bg-darker-white">
						<AssessmentIcon className="color-primary" />
					</Avatar>
					<p className="mb-0 mt-2 color-darker-white">Raporty</p>
				</div>
				<div className={styles.menuOptionContainer}>
					<Avatar className="bg-darker-white">
						<FolderSharedIcon className="color-primary" />
					</Avatar>
					<p className="mb-0 mt-2 color-darker-white">Dane</p>
				</div>
				<div className={styles.menuOptionContainer}>
					<Avatar className="bg-darker-white">
						<LockResetIcon className="color-primary" />
					</Avatar>
					<p className="mb-0 mt-2 color-darker-white">Zmiana hasła</p>
				</div>
			</div> */}
		</>
	);
}
