import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { LinkItem } from "./NavbarTypes";

interface NavButtonsProps {
  links: LinkItem[];
}

const NavButtons: React.FC<NavButtonsProps> = ({ links }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {links.map(({ link, name }) => (
        <Button key={link} color="inherit" component={Link} to={link}>
          {name}
        </Button>
      ))}
    </Box>
  );
};

export default NavButtons;
