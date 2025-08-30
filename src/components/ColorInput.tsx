import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Colorize } from '@mui/icons-material';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  onEyedropper?: () => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  value,
  onChange,
  isValid,
  onEyedropper,
}) => {
  return (
    <TextField
      label="Hex Color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      margin="normal"
      error={!isValid}
      helperText={!isValid ? "Invalid hex color" : ""}
      InputProps={{
        endAdornment: onEyedropper && (
          <InputAdornment position="end">
            <IconButton onClick={onEyedropper} size="small">
              <Colorize />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
