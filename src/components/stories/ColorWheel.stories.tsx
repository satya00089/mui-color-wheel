import React, { useState } from 'react';
import { ColorWheel } from '../ColorWheel';

export default {
  title: 'ColorWheel',
  component: ColorWheel,
};

export const Basic = () => {
  const [color, setColor] = useState('#3f51b5');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Selected color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} />
    </div>
  );
};

export const SmallSize = () => {
  const [color, setColor] = useState('#e91e63');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Selected color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} size="small" label="Small Picker" />
    </div>
  );
};

export const LargeSize = () => {
  const [color, setColor] = useState('#4caf50');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Selected color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} size="large" label="Large Picker" />
    </div>
  );
};

export const RgbFormat = () => {
  const [color, setColor] = useState('#ff9800');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Selected color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} format="rgb" label="RGB Picker" />
    </div>
  );
};

export const HslFormat = () => {
  const [color, setColor] = useState('#9c27b0');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Selected color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} format="hsl" label="HSL Picker" />
    </div>
  );
};

export const Disabled = () => {
  const [color, setColor] = useState('#2196f3');

  return (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>Disabled — color: <strong>{color}</strong></p>
      <ColorWheel color={color} onChange={setColor} disabled />
    </div>
  );
};
