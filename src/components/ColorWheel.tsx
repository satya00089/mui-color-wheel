import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Popover,
  Button,
  Typography,
  useTheme,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ColorInput } from './ColorInput';
import { ColorSlider } from './ColorSlider';
import { ColorSwatch } from './ColorSwatch';
import { useColorState } from '../hooks/useColorState';
import { colorConverters } from '../utils/colorConverters';
import { ColorWheelProps, ColorFormat, ComponentSize } from '../types';

const PickerButton = styled(Button)(({ theme }) => ({
  width: 50,
  height: 50,
  minWidth: 'auto',
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const PickerPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    minWidth: 280,
  },
}));

const ColorPreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 60,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

const ColorWheelCanvas = styled('canvas')(({ theme }) => ({
  width: '100%',
  height: 200,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  cursor: 'crosshair',
  border: `1px solid ${theme.palette.divider}`,
}));

const SizeStyles = {
  small: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 50,
    height: 50,
  },
  large: {
    width: 60,
    height: 60,
  },
};

export const ColorWheel: React.FC<ColorWheelProps> = ({
  color,
  onChange,
  presetColors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#cddc39',
    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
  ],
  format = 'hex',
  showOpacity = true,
  showEyedropper = true,
  disabled = false,
  size = 'medium',
  label = "Color Picker",
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { 
    hex, 
    setHex, 
    rgb, 
    setRgb, 
    hsl, 
    setHsl, 
    opacity, 
    setOpacity,
    outputColor,
    isValidHex 
  } = useColorState(color, format);

  const open = Boolean(anchorEl);
  const id = open ? 'color-wheel-popover' : undefined;

  useEffect(() => {
    // Initialize canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Draw color wheel
    drawColorWheel(ctx, canvas.width, canvas.height);
    
    // Draw current color indicator
    drawColorIndicator(ctx, hsl.h, hsl.s, canvas.width, canvas.height);
  }, [hsl]);

  const drawColorWheel = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw color wheel
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = angle * Math.PI / 180;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  };

  const drawColorIndicator = (
    ctx: CanvasRenderingContext2D, 
    hue: number, 
    saturation: number, 
    width: number, 
    height: number
  ) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;
    
    // Convert polar to cartesian coordinates
    const angle = (hue - 90) * Math.PI / 180;
    const distance = radius * (saturation / 100);
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    
    // Draw indicator
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    
    // Calculate distance from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Check if click is within the color wheel
    if (distance <= radius) {
      // Calculate angle (hue)
      let angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      if (angle < 0) angle += 360;
      
      // Calculate saturation
      const saturation = Math.min(100, Math.round((distance / radius) * 100));
      
      // Update HSL
      const newHsl = { h: Math.round(angle), s: saturation, l: hsl.l };
      setHsl(newHsl);
      
      // Convert to RGB
      const newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      setRgb(newRgb);
      
      // Convert to HEX
      const newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      setHex(newHex);
      
      // Trigger onChange
      onChange(newHex);
    }
  };

  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    if (isValidHex(newHex)) {
      onChange(newHex);
      
      // Update RGB
      const newRgb = colorConverters.hexToRgb(newHex);
      if (newRgb) {
        setRgb(newRgb);
        
        // Update HSL
        const newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
        setHsl(newHsl);
      }
    }
  };

  const handleHueChange = (value: number) => {
    const newHsl = { ...hsl, h: value };
    setHsl(newHsl);
    
    // Convert to RGB
    const newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    
    // Convert to HEX
    const newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    
    // Trigger onChange
    onChange(newHex);
  };

  const handleSaturationChange = (value: number) => {
    const newHsl = { ...hsl, s: value };
    setHsl(newHsl);
    
    // Convert to RGB
    const newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    
    // Convert to HEX
    const newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    
    // Trigger onChange
    onChange(newHex);
  };

  const handleLightnessChange = (value: number) => {
    const newHsl = { ...hsl, l: value };
    setHsl(newHsl);
    
    // Convert to RGB
    const newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    
    // Convert to HEX
    const newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    
    // Trigger onChange
    onChange(newHex);
  };

  const handleOpacityChange = (value: number) => {
    setOpacity(value);
    // For simplicity, we're not changing the hex value for opacity
    // In a real implementation, you might want to convert to rgba or hex8
  };

  const handlePresetClick = (presetColor: string) => {
    onChange(presetColor);
    setHex(presetColor);
    
    // Update RGB
    const newRgb = colorConverters.hexToRgb(presetColor);
    if (newRgb) {
      setRgb(newRgb);
      
      // Update HSL
      const newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
      setHsl(newHsl);
    }
  };

  const handleEyedropper = async () => {
    if (!('EyeDropper' in window)) {
      alert('Your browser does not support the EyeDropper API');
      return;
    }

    try {
      // @ts-ignore - EyeDropper is not in TypeScript types yet
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const srgbHex = result.sRGBHex;
      
      onChange(srgbHex);
      setHex(srgbHex);
      
      // Update RGB
      const newRgb = colorConverters.hexToRgb(srgbHex);
      if (newRgb) {
        setRgb(newRgb);
        
        // Update HSL
        const newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
        setHsl(newHsl);
      }
    } catch (e) {
      console.error('EyeDropper error:', e);
    }
  };

  return (
    <>
      <PickerButton
        aria-describedby={id}
        onClick={handleClick}
        disabled={disabled}
        sx={{
          backgroundColor: color,
          ...SizeStyles[size],
        }}
      />
      
      <PickerPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
        
        <ColorPreview sx={{ backgroundColor: color }} />
        
        <ColorWheelCanvas
          ref={canvasRef}
          onClick={handleCanvasClick}
        />
        
        <ColorInput
          value={hex}
          onChange={handleHexChange}
          isValid={isValidHex(hex)}
          onEyedropper={showEyedropper ? handleEyedropper : undefined}
        />
        
        <ColorSlider
          label="Hue"
          value={hsl.h}
          min={0}
          max={360}
          onChange={handleHueChange}
          color={theme.palette.primary.main}
        />
        
        <ColorSlider
          label="Saturation"
          value={hsl.s}
          min={0}
          max={100}
          onChange={handleSaturationChange}
          color={theme.palette.secondary.main}
        />
        
        <ColorSlider
          label="Lightness"
          value={hsl.l}
          min={0}
          max={100}
          onChange={handleLightnessChange}
          color={theme.palette.success.main}
        />
        
        {showOpacity && (
          <ColorSlider
            label="Opacity"
            value={opacity}
            min={0}
            max={1}
            step={0.01}
            onChange={handleOpacityChange}
            color={theme.palette.grey[500]}
          />
        )}
        
        <Typography variant="body2" gutterBottom>
          Output ({format}): {outputColor}
        </Typography>
        
        <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
          Preset Colors:
        </Typography>
        
        <Grid container spacing={1}>
          {presetColors.map((swatch, index) => (
            <Grid key={index}>
              <ColorSwatch
                color={swatch}
                onClick={() => handlePresetClick(swatch)}
              />
            </Grid>
          ))}
        </Grid>
      </PickerPopover>
    </>
  );
};
