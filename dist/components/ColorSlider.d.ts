import React from 'react';
interface ColorSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    color: string;
}
export declare const ColorSlider: React.FC<ColorSliderProps>;
export {};
//# sourceMappingURL=ColorSlider.d.ts.map