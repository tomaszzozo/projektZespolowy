import { Avatar } from "@mui/material";
import styles from "./styles.module.scss";
import { ReactElement } from "react";

interface Props {
	label: string;
	icon: ReactElement;
}

export default function Title(props: Props) {
	return (
		<div className={styles.titleHeader}>
			<Avatar className="bg-primary">{props.icon}</Avatar>
			<p className={styles.titleText}>{props.label}</p>
		</div>
	);
}
