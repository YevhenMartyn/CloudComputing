import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2em",
        gap: "1em",
      }}
    >
      <Typography>Home Page</Typography>
    </Box>
  );
};

export default HomePage;
