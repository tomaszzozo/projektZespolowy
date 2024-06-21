import { NavigateFunction } from "react-router-dom";
import React from "react";

export default function validateToken(
  cookie: {
    role?: any;
  },
  navigate: NavigateFunction,
  setCookie: Function,
  setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (cookie.role !== 1) {
    navigate("/unauthorized");
    return;
  }

  fetch("http://localhost:8080/tokens/auth/validate", {
    credentials: "include",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw Error(
          "Token logowania przedawnił się lub wystąpił błąd serwera.",
        );
      }
      return response.text();
    })
    .then((text) => {
      const match = text.match(/\d$/);
      if (match === null) {
        throw Error("Serwer nie podał roli użytkownika w odpowiedzi.");
      } else if (parseInt(match[0]) !== 1) {
        setCookie("role", 0);
        navigate("/unauthorized");
        throw Error("Nie masz uprawnień do przeglądania tej strony");
      }
      setCookie("role", parseInt(match[0]));
      setWaiting(false);
    })
    .catch((error) => {
      console.error(error);
      navigate("/signIn");
      return;
    });
}
