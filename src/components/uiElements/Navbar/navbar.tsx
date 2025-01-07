import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DrawerMenu from "./DrawerMenu";
import NavButtons from "./NavButtons";
import { useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { LinkItem } from "./NavbarTypes";

interface NavbarProps {
  title?: string;
  links: LinkItem[];
  drawerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl";
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  title = "Cloud Storage",
  links,
  drawerBreakpoint = "md",
  onLogout,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(drawerBreakpoint));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <DrawerMenu
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              links={links}
              onLogout={onLogout}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                {title}
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                {title}
              </Button>
            </Box>
            <NavButtons links={links} />
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
