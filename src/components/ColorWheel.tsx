import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  alpha,
  Box,
  Popover,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ColorInput } from './ColorInput';
import { useColorState } from '../hooks/useColorState';
import { colorConverters } from '../utils/colorConverters';
import { ColorWheelProps } from '../types';

// Canvas CSS + buffer size (px). Keeping them equal avoids all CSS→buffer scaling.
const CANVAS_SIZE = 204;
// Wheel fills 96 % of the canvas so the indicator dot stays inside.
const WHEEL_RADIUS = CANVAS_SIZE * 0.47;

const PickerButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: 0,
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  '&:hover': {
    borderColor: theme.palette.text.secondary,
    boxShadow: theme.shadows[3],
  },
  '&.Mui-focusVisible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

const PickerPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(2),
    borderRadius: Number(theme.shape.borderRadius) * 2,
    width: 204,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[6],
  },
}));

const SizeStyles = {
  small:  { width: 36, height: 36 },
  medium: { width: 44, height: 44 },
  large:  { width: 56, height: 56 },
};

export const ColorWheel: React.FC<ColorWheelProps> = ({
  color,
  onChange,
  format = 'hex',
  disabled = false,
  size = 'medium',
  label = 'Color Picker',
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);

  const {
    hex,
    setHex,
    setRgb,
    hsl,
    setHsl,
    isValidHex,
    outputColor,
  } = useColorState(color, format);

  const open = Boolean(anchorEl);
  const id = open ? 'color-wheel-popover' : undefined;

  // ── Canvas drawing ────────────────────────────────────────────────────────

  const redraw = useCallback((h: number, s: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = CANVAS_SIZE / 2;
    const cy = CANVAS_SIZE / 2;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Pixel-exact wheel: every pixel gets its colour computed from polar coords.
    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    for (let py = 0; py < CANVAS_SIZE; py++) {
      for (let px = 0; px < CANVAS_SIZE; px++) {
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > WHEEL_RADIUS) continue;

        const hue = ((Math.atan2(dy, dx) * 180) / Math.PI + 360 + 90) % 360;
        const sat = dist / WHEEL_RADIUS; // 0–1 → centre is white, edge is pure hue
        const rgb = colorConverters.hslToRgb(
          Math.round(hue),
          Math.round(sat * 100),
          50,
        );
        const i = (py * CANVAS_SIZE + px) * 4;
        imageData.data[i]     = rgb.r;
        imageData.data[i + 1] = rgb.g;
        imageData.data[i + 2] = rgb.b;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Indicator dot
    const angle = ((h - 90) * Math.PI) / 180;
    const dotDist = WHEEL_RADIUS * (s / 100);
    const ix = cx + dotDist * Math.cos(angle);
    const iy = cy + dotDist * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(ix, iy, 7, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, []);

  // Called by MUI's Popover after its enter-transition finishes and the canvas
  // DOM node is guaranteed to be in the document. This is the only reliable
  // moment to initialise the buffer and draw for the first time.
  const handlePopoverEntered = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    redraw(hsl.h, hsl.s);
  }, [hsl.h, hsl.s, redraw]);

  // Re-draw when hsl changes while the popover is already open (e.g. hex input).
  useEffect(() => {
    if (!open) return;
    redraw(hsl.h, hsl.s);
  }, [open, hsl.h, hsl.s, redraw]);

  // ── Color pick from canvas coords ────────────────────────────────────────

  const pickFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // CANVAS_SIZE === rect.width === rect.height (1-to-1), but we keep the
      // scale factors so the code stays correct if someone changes CANVAS_SIZE.
      const scaleX = CANVAS_SIZE / rect.width;
      const scaleY = CANVAS_SIZE / rect.height;
      const px = (clientX - rect.left) * scaleX;
      const py = (clientY - rect.top)  * scaleY;

      const cx = CANVAS_SIZE / 2;
      const cy = CANVAS_SIZE / 2;
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > WHEEL_RADIUS) return;

      let hue = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (hue < 0) hue += 360;
      const sat = Math.min(100, Math.round((dist / WHEEL_RADIUS) * 100));

      // Keep current lightness so the wheel is predictable
      const newHsl = { h: Math.round(hue), s: sat, l: hsl.l };
      setHsl(newHsl);

      const newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      setRgb(newRgb);

      const newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      setHex(newHex);
      onChange(newHex);

      redraw(newHsl.h, newHsl.s);
    },
    [hsl.l, setHsl, setRgb, setHex, onChange, redraw]
  );

  // ── Pointer event handlers (click + drag) ────────────────────────────────

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    pickFromEvent(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    pickFromEvent(e.clientX, e.clientY);
  };

  const handleMouseUp = () => { isDragging.current = false; };

  // ── Hex input ─────────────────────────────────────────────────────────────

  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    if (!isValidHex(newHex)) return;
    onChange(newHex);
    const newRgb = colorConverters.hexToRgb(newHex);
    if (newRgb) {
      setRgb(newRgb);
      const newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
      setHsl(newHsl);
    }
  };

  // ── Button ────────────────────────────────────────────────────────────────

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <PickerButton
        aria-describedby={id}
        aria-label={label}
        onClick={handleButtonClick}
        disabled={disabled}
        sx={{
          backgroundColor: color,
          borderColor: alpha(color, 0.6),
          ...SizeStyles[size],
        }}
      />

      <PickerPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        TransitionProps={{ onEntered: handlePopoverEntered }}
      >
        {/*
         * The canvas carries its own fixed px size so there is no question
         * about what size it is. border-radius 50% turns it into a visible
         * circle; the transparent pixels outside WHEEL_RADIUS are already
         * invisible so the circle looks clean with no square background.
         */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
              borderRadius: '50%',
              cursor: 'crosshair',
              display: 'block',
            }}
          />
        </Box>

        <ColorInput
          value={hex}
          onChange={handleHexChange}
          isValid={isValidHex(hex)}
        />

        {format !== 'hex' && (
          <Box
            sx={{
              mt: 0.5,
              px: 1.5,
              py: 1,
              borderRadius: 1,
              backgroundColor: 'action.hover',
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block">
              {format.toUpperCase()}
            </Typography>
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{ wordBreak: 'break-all' }}
            >
              {outputColor}
            </Typography>
          </Box>
        )}
      </PickerPopover>
    </>
  );
};
