export const validators = {
  isValidHex(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
  },
  
  isValidRgb(rgb: { r: number; g: number; b: number }): boolean {
    return rgb.r >= 0 && rgb.r <= 255 &&
           rgb.g >= 0 && rgb.g <= 255 &&
           rgb.b >= 0 && rgb.b <= 255;
  },

  isValidHsl(hsl: { h: number; s: number; l: number }): boolean {
    return hsl.h >= 0 && hsl.h <= 360 &&
           hsl.s >= 0 && hsl.s <= 100 &&
           hsl.l >= 0 && hsl.l <= 100;
  }
};
