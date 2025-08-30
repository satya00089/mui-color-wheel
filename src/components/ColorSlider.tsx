import React from 'react';
import { Typography, Slider, Box } from '@mui/material';

interface ColorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  color: string;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  color,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2">
        {label}: {value}
      </Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={min}
        max={max}
        step={step}
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: color,
          },
          '& .MuiSlider-track': {
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};
