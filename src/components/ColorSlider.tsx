import React from 'react';
import { Typography, Slider, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0.5,
        }}
      >
        <Typography variant="body2">{label}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {value}
        </Typography>
      </Box>
      <Slider
        size="small"
        value={value}
        onChange={(_, newValue) => onChange(newValue as number)}
        min={min}
        max={max}
        step={step}
        sx={{
          '& .MuiSlider-rail': {
            backgroundColor: alpha(color, 0.25),
            opacity: 1,
          },
          '& .MuiSlider-thumb': {
            backgroundColor: color,
            border: '2px solid',
            borderColor: 'background.paper',
          },
          '& .MuiSlider-track': {
            backgroundColor: color,
          },
        }}
      />
    </Box>
  );
};
