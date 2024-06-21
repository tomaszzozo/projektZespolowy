import React from "react";
import styles from "./styles.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import {Fab} from "@mui/material";

export default function MockedHeader () {

    return (
        <header
            className={
                "position-sticky top-0 container-fluid p-0 bg-primary d-flex align-items-center mb-4 mb-md-5 " +
                styles.header
            }
        >
            <Fab
                className={"fab-primary mx-4 opacity-0 d-md-none"}
                onClick={() => {}}
                size={"small"}
            >
                <MenuIcon />
            </Fab>
            <a href="/">
                <p className={"fs-4 my-0 mx-md-4 fw-bold color-white"}>EZ-HR</p>
            </a>
        </header>
    );
}