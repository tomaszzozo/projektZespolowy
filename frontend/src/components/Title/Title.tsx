import { Avatar } from "@mui/material";
import styles from "./styles.module.scss";
import { ReactElement } from "react";

interface Props {
  label: string;
  icon: ReactElement;
}

export default function Title(props: Props) {
  return (
    <div className={styles.menuHeader}>
      <Avatar className="bg-primary">{props.icon}</Avatar>
      <p className="mt-2 mb-0 fw-bold color-black">{props.label}</p>
    </div>
  );
}
