import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  label: string;
  name: string;
  maxLength: number;
  disabled: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  name,
  maxLength,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        size="small"
        id={id}
        disabled={disabled}
        label={label}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        {...register(name, {
          required: `${label} is required`,
          maxLength: {
            value: maxLength,
            message: `Maximum length is ${maxLength}`,
          },
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={errorMessage}
        error={!!errorMessage}
      />
    </FormControl>
  );
};

export default PasswordInput;
