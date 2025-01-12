import React from "react";
import { Box, Typography } from "@mui/material";
const HomePage: React.FC = () => {
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
