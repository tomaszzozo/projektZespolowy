import {
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import styles from "./styles.module.scss";
import { ReactNode, useState } from "react";

export type Action = {
  icon: ReactNode;
  name: string;
  onClick: Function;
};

interface Props {
  actions: Action[];
}

export default function FabNavgiation(props: Props) {
  const [backdropOpen, setBackdropOpen] = useState(false);

  return (
    <>
      <Backdrop open={backdropOpen} />
      <SpeedDial
        ariaLabel="bottom navigation"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setBackdropOpen(false)}
        onOpen={() => setBackdropOpen(true)}
        open={backdropOpen}
      >
        {props.actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              setBackdropOpen(false);
              action.onClick();
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
}
