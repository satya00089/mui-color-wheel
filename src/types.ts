export type ColorFormat = 'hex' | 'rgb' | 'hsl';
export type ComponentSize = 'small' | 'medium' | 'large';

export interface ColorWheelProps {
  color: string;
  onChange: (color: string) => void;
  presetColors?: string[];
  format?: ColorFormat;
  showOpacity?: boolean;
  showEyedropper?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  label?: string;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}
