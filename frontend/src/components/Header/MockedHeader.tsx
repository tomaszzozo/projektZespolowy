import React from "react";
import styles from "./styles.module.scss";

export default function MockedHeader () {

    return (
        <header
            className={
                "position-sticky top-0 container-fluid p-0 bg-primary d-flex align-items-center mb-4 mb-md-5 " +
                styles.header
            }
        >
            <a href="/">
                <p className={"fs-4 my-0 mx-md-4 fw-bold color-white"}>EZ-HR</p>
            </a>
        </header>
    );
}