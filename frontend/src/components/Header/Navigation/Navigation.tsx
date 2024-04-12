import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { SelectedPage } from "../Header";

interface Props {
  navigationContent: { label: string; icon: JSX.Element; endpoint: string }[];
  selected: SelectedPage;
}

export default function Navigation(props: Props) {
  const navigate = useNavigate();
  return (
    <div className={"d-none d-md-flex ms-5 h-100"}>
      {props.navigationContent.map((obj) => (
        <div
          key={obj.label}
          className={
            "h-125 mx-4 d-flex flex-column align-items-center justify-content-end cursor-pointer " +
            styles.navigationElement
          }
          onClick={() => navigate("/" + obj.endpoint)}
        >
          <p className={"color-darker-white m-0 mb-2"}>{obj.label}</p>
          <Avatar
            className={`${obj.endpoint === props.selected ? `bg-secondary ${styles.selectedNavigationAvatar}` : `bg-primary ${styles.navigationAvatar}`} `}
          >
            {obj.icon}
          </Avatar>
        </div>
      ))}
    </div>
  );
}
