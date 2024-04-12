import React from "react";
import * as EmailValidator from "email-validator";
import { NavigateFunction } from "react-router-dom";

export namespace SignInScripts {
  export const onSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    setEmailError: React.Dispatch<React.SetStateAction<string>>,
    setPasswordError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")!.toString().trim();
    const password = data.get("password")!.toString().trim();

    if (!EmailValidator.validate(email.trim())) {
      setEmailError("Nieprawidłowy email");
      return;
    }
    setEmailError("");

    if (
      !/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,30}$/.test(
        password,
      )
    ) {
      setPasswordError("Nieprawidłowe hasło");
      return;
    }
    setPasswordError("");

    navigate("/");
  };
}
