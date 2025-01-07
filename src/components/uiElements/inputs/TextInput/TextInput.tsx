import React from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
interface TextInputProps {
  id: string;
  label: string;
  name: string;
  maxLength: number;
  disabled?: boolean | undefined;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  name,
  maxLength,
  disabled,
  type,
  multiline,
  rows,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors;

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            type={type}
            fullWidth
            disabled={disabled}
            id={id}
            label={label}
            error={!!errorMessage}
            slotProps={{
              htmlInput: { maxLength },
            }}
            multiline={multiline}
            rows={rows}
          />
        )}
      />
    </FormControl>
  );
};

export default TextInput;
