import { useState, useEffect } from 'react';
import { colorConverters } from '../utils/colorConverters';
import { validators } from '../utils/validators';
import { ColorFormat, RGB, HSL } from '../types';

export const useColorState = (initialColor: string, format: ColorFormat = 'hex') => {
  const [hex, setHex] = useState(initialColor);
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState<HSL>({ h: 0, s: 0, l: 0 });
  const [opacity, setOpacity] = useState(1);
  const [outputColor, setOutputColor] = useState(initialColor);

  useEffect(() => {
    const rgbValue = colorConverters.hexToRgb(initialColor);
    if (rgbValue) {
      setRgb(rgbValue);
      const hslValue = colorConverters.rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);
      setHsl(hslValue);
    }
  }, [initialColor]);

  useEffect(() => {
    // Update output color based on selected format
    if (format === 'hex') {
      setOutputColor(hex);
    } else if (format === 'rgb') {
      setOutputColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    } else if (format === 'hsl') {
      setOutputColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    }
  }, [hex, rgb, hsl, format]);

  const isValidHex = (value: string) => validators.isValidHex(value);

  return {
    hex,
    setHex,
    rgb,
    setRgb,
    hsl,
    setHsl,
    opacity,
    setOpacity,
    outputColor,
    isValidHex,
  };
};
