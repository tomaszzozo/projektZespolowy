import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Drawer,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

interface Props {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  navigationContent: { label: string; icon: JSX.Element; endpoint: string }[];
}

export default function SideMenu(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = props.openState;

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {props.navigationContent.map((obj) => (
          <ListItem
            key={obj.label}
            disablePadding
            onClick={() => navigate("/" + obj.endpoint)}
          >
            <ListItemButton>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.label} className={"color-black"} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      {DrawerList}
    </Drawer>
  );
}
