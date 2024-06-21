import Header from "../../../components/Header/Header";
import Title from "../../../components/Title/Title";
import PersonIcon from "@mui/icons-material/Person";
import EmployeeBottomNavigation from "../EmployeeBottomNavigation/EmployeeBottomNavigation";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import validateToken from "../../../functions/ValidateToken";
import FullscreenProgress from "../../../components/FullscreenProgress/FullscreenProgress";

export default function EmployeeData() {
    const [waiting, setWaiting] = useState(true);
    const [cookie, setCookie] = useCookies(["role"]);
    const navigate = useNavigate();

    useEffect(
        () => {
            validateToken(cookie, navigate, setCookie, setWaiting);
        },
        [], // eslint-disable-line
    );

    if (waiting) {
        return (
            <FullscreenProgress/>
        );
    }

  return (
    <>
      <Header selectedPage={"personnel"} />
      <Title
        label="Tomasz Wojtkiewicz: dane"
        icon={<PersonIcon className="color-darker-white" />}
      />
      <EmployeeBottomNavigation
        saveButtonActive={false}
        saveButtonOnClick={() => {}}
      />
    </>
  );
}
