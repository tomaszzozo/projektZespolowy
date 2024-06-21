import styles from "./styles.module.scss";
import { CircularProgress } from "@mui/material";
import React from "react";
import MockedHeader from "../Header/MockedHeader";

export default function FullscreenProgress() {
  return (
    <>
      <MockedHeader />
      <div className={styles.progressContainer}>
        <CircularProgress />
      </div>
    </>
  );
}
