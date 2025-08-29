
# MUI Color Wheel 🎨

A beautiful, customizable color picker component for Material-UI featuring an intuitive color wheel interface. Built with React and TypeScript.

![Preview](https://img.shields.io/badge/Material--UI-v5-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-supported-green) ![Size](https://img.shields.io/bundlephobia/minzip/mui-color-wheel)

## ✨ Features

- **Interactive Color Wheel**: Intuitive HSL color selection with smooth interactions
- **Multiple Color Formats**: Support for HEX, RGB, HSL, and HSV color models
- **Opacity Control**: Alpha channel slider with real-time preview
- **Preset Swatches**: Customizable color palette with Material Design colors
- **Eyedropper Tool**: Native browser eyedropper for screen color sampling
- **Responsive Design**: Works seamlessly on all device sizes
- **Theme Integration**: Automatically adapts to your MUI theme (light/dark mode)
- **Accessibility**: Full keyboard navigation and ARIA support
- **TypeScript Support**: Complete type definitions out of the box
- **Zero Dependencies**: Only requires peer dependencies (React, MUI)

## 🚀 Quick Start

```bash
npm install mui-color-wheel
```

```jsx
import React, { useState } from 'react';
import { ColorWheel } from 'mui-color-wheel';

function App() {
  const [color, setColor] = useState('#3f51b5');

  return (
    <ColorWheel
      color={color}
      onChange={setColor}
      presetColors={['#f44336', '#4caf50', '#2196f3']}
    />
  );
}
```

## 🎯 Use Cases

- Design systems and theme customizers
- Graphic editing applications
- Form inputs with color selection
- Dashboard configuration panels
- E-commerce product customization
- Creative tools and applications

## 🛠️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | - | Current color value |
| `onChange` | `(color: string) => void` | - | Callback when color changes |
| `presetColors` | `string[]` | Material palette | Array of preset colors |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Output color format |
| `showOpacity` | `boolean` | `true` | Show alpha slider |
| `showEyedropper` | `boolean` | `true` | Show eyedropper button |
| `disabled` | `boolean` | `false` | Disable the component |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size |

## 🎨 Customization

The component is fully customizable using MUI's theming system:

```jsx
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiColorWheel: {
      styleOverrides: {
        wheel: {
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        swatch: {
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorWheel color="#3f51b5" onChange={setColor} />
    </ThemeProvider>
  );
}
```

## 📱 Demo

Check out the interactive demo: [mui-color-wheel-demo.vercel.app](https://mui-color-wheel-demo.vercel.app)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

MIT © [satya subudhi](LICENSE)
