import React, { useState } from "react";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { Lock } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { SignInScripts } from "./SignIn.scripts";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  return (
    <div
      className={
        "fullscreenParent d-flex align-items-center justify-content-center m-0 p-0"
      }
    >
      <div
        className={
          "d-flex align-items-center justify-content-center w-75 h-70 shadow-lg border-radius-20 bg-white " +
          styles.card
        }
      >
        <Box
          component={"form"}
          onSubmit={(event) =>
            SignInScripts.onSubmit(
              event,
              setEmailError,
              setPasswordError,
              navigate,
            )
          }
          className={
            "w-90 h-90 container p-0 m-0 d-flex flex-column justify-content-between"
          }
        >
          <div className={"d-flex flex-column justify-content-center"}>
            <div className={"d-flex justify-content-center"}>
              <Avatar className={"avatar-bg-primary"}>
                <Lock />
              </Avatar>
            </div>
            <div className={"row pt-1"}>
              <p
                className={
                  "col d-flex justify-content-center fs-1 fw-bold m-0 color-black"
                }
              >
                Logowanie
              </p>
            </div>
          </div>
          <div className={"d-flex flex-column justify-content-center"}>
            <div className={"row p-2"}>
              <div className={"col d-flex justify-content-center"}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name={"email"}
                  error={emailError !== ""}
                  helperText={emailError}
                />
              </div>
            </div>
            <div className={"row p-2"}>
              <div className={"col d-flex justify-content-center"}>
                <TextField
                  label="Hasło"
                  type="password"
                  variant="outlined"
                  name={"password"}
                  error={passwordError !== ""}
                  helperText={passwordError}
                />
              </div>
            </div>
          </div>
          <div className={"row m-0"}>
            <div className={"col d-flex justify-content-center"}>
              <Button variant="contained" size={"large"} type={"submit"}>
                Zaloguj
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
