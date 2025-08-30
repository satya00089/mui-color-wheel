import { RGB, HSL } from "../types";
export declare const colorConverters: {
    hexToRgb(hex: string): RGB | null;
    rgbToHex(r: number, g: number, b: number): string;
    rgbToHsl(r: number, g: number, b: number): HSL;
    hslToRgb(h: number, s: number, l: number): RGB;
};
//# sourceMappingURL=colorConverters.d.ts.map