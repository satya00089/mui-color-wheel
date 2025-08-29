/// <reference types="react" />
import { ColorFormat, RGB, HSL } from '../types';
export declare const useColorState: (initialColor: string, format?: ColorFormat) => {
    hex: string;
    setHex: import("react").Dispatch<import("react").SetStateAction<string>>;
    rgb: RGB;
    setRgb: import("react").Dispatch<import("react").SetStateAction<RGB>>;
    hsl: HSL;
    setHsl: import("react").Dispatch<import("react").SetStateAction<HSL>>;
    opacity: number;
    setOpacity: import("react").Dispatch<import("react").SetStateAction<number>>;
    outputColor: string;
    isValidHex: (value: string) => boolean;
};
//# sourceMappingURL=useColorState.d.ts.map