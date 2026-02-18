import React from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

interface ColorSwatchProps {
  color: string;
  onClick: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      component="button"
      type="button"
      aria-label={`Select color ${color}`}
      onClick={onClick}
      sx={{
        p: 0,
        width: 30,
        height: 30,
        backgroundColor: color,
        borderRadius: 1,
        cursor: 'pointer',
        border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
        transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
          duration: theme.transitions.duration.shortest,
        }),
        '&:hover': {
          transform: 'scale(1.06)',
          borderColor: theme.palette.text.secondary,
          boxShadow: theme.shadows[2],
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    />
  );
};
