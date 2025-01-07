import { Alert, Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../inputs/TextInput";
import PasswordInput from "../../inputs/PasswordInput";
import config from "./loginFormConfig";
import { LoginCredentials } from "../../../types/LoginCredentials";
import ErrorResponse from "../../../types/ErrorResponse";

type LoginFormProps = {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: LoginCredentials) => void;
  loading: boolean;
  error: ErrorResponse;
};

const LoginForm = ({ onSubmit, loading, error }: LoginFormProps) => {
  const form = useForm<LoginCredentials>({ mode: "all" });

  const { userNameMaxLength, passwordMaxLength } = config;

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        id="login-form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: "1em",
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <TextInput
          disabled={loading}
          id="username"
          label="Login"
          name="username"
          maxLength={userNameMaxLength}
        />
        <PasswordInput
          disabled={loading}
          id="password"
          label="Password"
          name="password"
          maxLength={passwordMaxLength}
        />
        {error.message && <Alert severity="error">{error.message}</Alert>}
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
