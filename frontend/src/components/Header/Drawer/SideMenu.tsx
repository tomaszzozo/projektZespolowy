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
import { SelectedPage } from "../Header";

interface Props {
	openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	navigationContent: { label: string; icon: JSX.Element; endpoint: string }[];
	selected: SelectedPage;
}

export default function SideMenu(props: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = props.openState;

	return (
		<Drawer open={open} onClose={() => setOpen(false)}>
			<Box
				sx={{ width: 250 }}
				role="presentation"
				onClick={() => setOpen(false)}
			>
				<List>
					{props.navigationContent.map((obj) => (
						<ListItem
							key={obj.label}
							disablePadding
							onClick={() => navigate("/" + obj.endpoint)}
						>
							<ListItemButton>
								<ListItemIcon
									className={
										props.selected === obj.endpoint
											? "color-secondary"
											: "color-primary"
									}
								>
									{obj.icon}
								</ListItemIcon>
								<ListItemText primary={obj.label} className={"color-black"} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
}
