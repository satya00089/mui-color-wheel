import React from 'react';
import { Box } from '@mui/material';

interface ColorSwatchProps {
  color: string;
  onClick: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 30,
        height: 30,
        backgroundColor: color,
        borderRadius: 1,
        cursor: 'pointer',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
        },
      }}
    />
  );
};
