import React, { useState } from 'react';
import { ColorWheel } from '../ColorWheel';

export default {
  title: 'ColorWheel',
  component: ColorWheel,
};

export const Basic = () => {
  const [color, setColor] = useState('#3f51b5');
  
  return (
    <div>
      <p>Selected color: {color}</p>
      <ColorWheel color={color} onChange={setColor} />
    </div>
  );
};

export const WithCustomPresets = () => {
  const [color, setColor] = useState('#e91e63');
  
  return (
    <div>
      <p>Selected color: {color}</p>
      <ColorWheel 
        color={color} 
        onChange={setColor}
        presetColors={['#e91e63', '#9c27b0', '#673ab7', '#3f51b5']}
      />
    </div>
  );
};

export const WithoutOpacity = () => {
  const [color, setColor] = useState('#4caf50');
  
  return (
    <div>
      <p>Selected color: {color}</p>
      <ColorWheel 
        color={color} 
        onChange={setColor}
        showOpacity={false}
      />
    </div>
  );
};
