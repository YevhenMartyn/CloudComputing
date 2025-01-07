/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import { LinkItem } from "./NavbarTypes";
interface DrawerMenuProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  links: LinkItem[];
  onLogout: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  drawerOpen,
  toggleDrawer,
  links,
  onLogout,
}) => {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {links.map(({ link, name }) => (
          <ListItem key={link} disablePadding>
            <ListItemButton component={Link} to={link}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton color="inherit" onClick={onLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
