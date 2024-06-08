import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { useCookies } from "react-cookie";

export default function SignIn() {
  const [, setCookie] = useCookies(["role"]);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [waiting, setWaiting] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaiting(true);
    setAlertOpen(false);

    const data = new FormData(event.currentTarget);
    const email = data.get("email")!.toString().trim();
    const password = data.get("password")!.toString().trim();
    let end = false;

    if (!EmailValidator.validate(email.trim())) {
      setEmailError("Nieprawidłowy email");
      end = true;
    } else {
      setEmailError("");
    }

    if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,30}$/.test(
        password,
      )
    ) {
      setPasswordError("Nieprawidłowe hasło");
      end = true;
    } else {
      setPasswordError("");
    }

    if (end) {
      setWaiting(false);
      return;
    }

    fetch(
      `http://localhost:8080/tokens/auth/generate?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password)}`,
      { credentials: "include" },
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw Error("Niepoprawny login lub hasło.");
          }
          throw Error(
            "Nieoczekiwany kod błędu. Sprawdź szczegóły w konsoli przeglądarki.",
          );
        }
        return response.text();
      })
      .then((text) => {
        const match = text.match(/\d$/);
        if (match === null) {
          throw Error(
            "Serwer nie podał roli użytkownika w odpowiedzi. Sprawdź szczegóły w konsoli przeglądarki.",
          );
        }
        setCookie("role", parseInt(match[0]));
        navigate("/");
      })
      .catch((error: Error) => {
        console.error(error);
        setAlertText(error.message);
        setAlertOpen(true);
        setWaiting(false);
      });
  };

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
          onSubmit={(event) => onSubmit(event)}
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
                  sx={{ width: "25ch" }}
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
                <FormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    className={passwordError === "" ? "" : "color-error-red"}
                  >
                    Hasło
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name={"password"}
                    type={showPassword ? "text" : "password"}
                    error={passwordError !== ""}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Hasło"
                  />
                  <FormHelperText
                    id="outlined-adornment-password-helper-text"
                    className={passwordError === "" ? "" : "color-error-red"}
                  >
                    {passwordError}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
          <div className={"row m-0"}>
            <div className={"col d-flex justify-content-center"}>
              <Button
                variant="contained"
                size={"large"}
                type={"submit"}
                disabled={waiting}
              >
                {waiting ? (
                  <CircularProgress className={styles.progress} />
                ) : (
                  "Zaloguj"
                )}
              </Button>
            </div>
          </div>
        </Box>
      </div>
      {alertOpen && (
        <Alert
          className={styles.alert}
          severity="error"
          onClose={() => setAlertOpen(false)}
        >
          {alertText}
        </Alert>
      )}
    </div>
  );
}
