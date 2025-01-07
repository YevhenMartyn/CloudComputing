import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../forms/LoginForm";
import { AppDispatch } from "../../../../store";
import { selectAuth, userLogin } from "../../../../slices/authSlice";
import { LoginCredentials } from "../../../types/LoginCredentials";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/");
  };

  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(selectAuth);
  const onSubmit = async (data: LoginCredentials) => {
    await dispatch(userLogin({ credentials: data, navigate }));
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2em",
        gap: "2em",
      }}
    >
      <Typography component="h3" variant="h3">
        Log In
      </Typography>

      <LoginForm onSubmit={onSubmit} error={error} loading={loading} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "50%",
        }}
      >
        <Button onClick={handleBackButton} variant="text" color="error">
          Back
        </Button>
        <Button variant="text" color="primary" sx={{ ml: 2 }}>
          Forgot Password?
        </Button>
        <Button
          type="submit"
          form="login-form"
          variant="text"
          color="primary"
          sx={{ ml: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
