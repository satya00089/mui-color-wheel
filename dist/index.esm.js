import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography, Slider, Button, Popover, useTheme, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colorize } from '@mui/icons-material';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var ColorInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, isValid = _a.isValid, onEyedropper = _a.onEyedropper;
    return (jsx(TextField, { label: "Hex Color", value: value, onChange: function (e) { return onChange(e.target.value); }, fullWidth: true, margin: "normal", error: !isValid, helperText: !isValid ? "Invalid hex color" : "", InputProps: {
            endAdornment: onEyedropper && (jsx(InputAdornment, __assign({ position: "end" }, { children: jsx(IconButton, __assign({ onClick: onEyedropper, size: "small" }, { children: jsx(Colorize, {}) })) }))),
        } }));
};

var ColorSlider = function (_a) {
    var label = _a.label, value = _a.value, min = _a.min, max = _a.max, _b = _a.step, step = _b === void 0 ? 1 : _b, onChange = _a.onChange, color = _a.color;
    return (jsxs(Box, __assign({ sx: { mb: 2 } }, { children: [jsxs(Typography, __assign({ variant: "body2" }, { children: [label, ": ", value] })), jsx(Slider, { value: value, onChange: function (_, newValue) { return onChange(newValue); }, min: min, max: max, step: step, sx: {
                    '& .MuiSlider-thumb': {
                        backgroundColor: color,
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: color,
                    },
                } })] })));
};

var ColorSwatch = function (_a) {
    var color = _a.color, onClick = _a.onClick;
    return (jsx(Box, { onClick: onClick, sx: {
            width: 30,
            height: 30,
            backgroundColor: color,
            borderRadius: 1,
            cursor: 'pointer',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
            },
        } }));
};

var colorConverters = {
    hexToRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    },
    rgbToHex: function (r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    rgbToHsl: function (r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100),
        };
    },
    hslToRgb: function (h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        var r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    },
};

var validators = {
    isValidHex: function (hex) {
        return /^#[0-9A-F]{6}$/i.test(hex);
    },
    isValidRgb: function (rgb) {
        return rgb.r >= 0 && rgb.r <= 255 &&
            rgb.g >= 0 && rgb.g <= 255 &&
            rgb.b >= 0 && rgb.b <= 255;
    },
    isValidHsl: function (hsl) {
        return hsl.h >= 0 && hsl.h <= 360 &&
            hsl.s >= 0 && hsl.s <= 100 &&
            hsl.l >= 0 && hsl.l <= 100;
    }
};

var useColorState = function (initialColor, format) {
    if (format === void 0) { format = 'hex'; }
    var _a = useState(initialColor), hex = _a[0], setHex = _a[1];
    var _b = useState({ r: 0, g: 0, b: 0 }), rgb = _b[0], setRgb = _b[1];
    var _c = useState({ h: 0, s: 0, l: 0 }), hsl = _c[0], setHsl = _c[1];
    var _d = useState(1), opacity = _d[0], setOpacity = _d[1];
    var _e = useState(initialColor), outputColor = _e[0], setOutputColor = _e[1];
    useEffect(function () {
        var rgbValue = colorConverters.hexToRgb(initialColor);
        if (rgbValue) {
            setRgb(rgbValue);
            var hslValue = colorConverters.rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b);
            setHsl(hslValue);
        }
    }, [initialColor]);
    useEffect(function () {
        // Update output color based on selected format
        if (format === 'hex') {
            setOutputColor(hex);
        }
        else if (format === 'rgb') {
            setOutputColor("rgb(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ")"));
        }
        else if (format === 'hsl') {
            setOutputColor("hsl(".concat(hsl.h, ", ").concat(hsl.s, "%, ").concat(hsl.l, "%)"));
        }
    }, [hex, rgb, hsl, format]);
    var isValidHex = function (value) { return validators.isValidHex(value); };
    return {
        hex: hex,
        setHex: setHex,
        rgb: rgb,
        setRgb: setRgb,
        hsl: hsl,
        setHsl: setHsl,
        opacity: opacity,
        setOpacity: setOpacity,
        outputColor: outputColor,
        isValidHex: isValidHex,
    };
};

var PickerButton = styled(Button)(function (_a) {
    var theme = _a.theme;
    return ({
        width: 50,
        height: 50,
        minWidth: 'auto',
        padding: 0,
        borderRadius: theme.shape.borderRadius,
        border: "1px solid ".concat(theme.palette.divider),
    });
});
var PickerPopover = styled(Popover)(function (_a) {
    var theme = _a.theme;
    return ({
        '& .MuiPaper-root': {
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            minWidth: 280,
        },
    });
});
var ColorPreview = styled(Box)(function (_a) {
    var theme = _a.theme;
    return ({
        width: '100%',
        height: 60,
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(2),
        border: "1px solid ".concat(theme.palette.divider),
    });
});
var ColorWheelCanvas = styled('canvas')(function (_a) {
    var theme = _a.theme;
    return ({
        width: '100%',
        height: 200,
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(2),
        cursor: 'crosshair',
        border: "1px solid ".concat(theme.palette.divider),
    });
});
var SizeStyles = {
    small: {
        width: 40,
        height: 40,
    },
    medium: {
        width: 50,
        height: 50,
    },
    large: {
        width: 60,
        height: 60,
    },
};
var ColorWheel = function (_a) {
    var color = _a.color, onChange = _a.onChange, _b = _a.presetColors, presetColors = _b === void 0 ? [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7',
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
        '#009688', '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ] : _b, _c = _a.format, format = _c === void 0 ? 'hex' : _c, _d = _a.showOpacity, showOpacity = _d === void 0 ? true : _d, _e = _a.showEyedropper, showEyedropper = _e === void 0 ? true : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.size, size = _g === void 0 ? 'medium' : _g, _h = _a.label, label = _h === void 0 ? "Color Picker" : _h;
    var theme = useTheme();
    var _j = useState(null), anchorEl = _j[0], setAnchorEl = _j[1];
    var canvasRef = useRef(null);
    var _k = useColorState(color, format), hex = _k.hex, setHex = _k.setHex; _k.rgb; var setRgb = _k.setRgb, hsl = _k.hsl, setHsl = _k.setHsl, opacity = _k.opacity, setOpacity = _k.setOpacity, outputColor = _k.outputColor, isValidHex = _k.isValidHex;
    var open = Boolean(anchorEl);
    var id = open ? 'color-wheel-popover' : undefined;
    useEffect(function () {
        // Initialize canvas
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        // Draw color wheel
        drawColorWheel(ctx, canvas.width, canvas.height);
        // Draw current color indicator
        drawColorIndicator(ctx, hsl.h, hsl.s, canvas.width, canvas.height);
    }, [hsl]);
    var drawColorWheel = function (ctx, width, height) {
        var centerX = width / 2;
        var centerY = height / 2;
        var radius = Math.min(width, height) * 0.4;
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        // Draw color wheel
        for (var angle = 0; angle < 360; angle += 1) {
            var startAngle = (angle - 1) * Math.PI / 180;
            var endAngle = angle * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            var gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, "hsl(".concat(angle, ", 100%, 50%)"));
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    };
    var drawColorIndicator = function (ctx, hue, saturation, width, height) {
        var centerX = width / 2;
        var centerY = height / 2;
        var radius = Math.min(width, height) * 0.4;
        // Convert polar to cartesian coordinates
        var angle = (hue - 90) * Math.PI / 180;
        var distance = radius * (saturation / 100);
        var x = centerX + distance * Math.cos(angle);
        var y = centerY + distance * Math.sin(angle);
        // Draw indicator
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    var handleClick = function (event) {
        if (disabled)
            return;
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleCanvasClick = function (event) {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = Math.min(canvas.width, canvas.height) * 0.4;
        // Calculate distance from center
        var dx = x - centerX;
        var dy = y - centerY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        // Check if click is within the color wheel
        if (distance <= radius) {
            // Calculate angle (hue)
            var angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
            if (angle < 0)
                angle += 360;
            // Calculate saturation
            var saturation = Math.min(100, Math.round((distance / radius) * 100));
            // Update HSL
            var newHsl = { h: Math.round(angle), s: saturation, l: hsl.l };
            setHsl(newHsl);
            // Convert to RGB
            var newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
            setRgb(newRgb);
            // Convert to HEX
            var newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
            setHex(newHex);
            // Trigger onChange
            onChange(newHex);
        }
    };
    var handleHexChange = function (newHex) {
        setHex(newHex);
        if (isValidHex(newHex)) {
            onChange(newHex);
            // Update RGB
            var newRgb = colorConverters.hexToRgb(newHex);
            if (newRgb) {
                setRgb(newRgb);
                // Update HSL
                var newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
                setHsl(newHsl);
            }
        }
    };
    var handleHueChange = function (value) {
        var newHsl = __assign(__assign({}, hsl), { h: value });
        setHsl(newHsl);
        // Convert to RGB
        var newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        // Convert to HEX
        var newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setHex(newHex);
        // Trigger onChange
        onChange(newHex);
    };
    var handleSaturationChange = function (value) {
        var newHsl = __assign(__assign({}, hsl), { s: value });
        setHsl(newHsl);
        // Convert to RGB
        var newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        // Convert to HEX
        var newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setHex(newHex);
        // Trigger onChange
        onChange(newHex);
    };
    var handleLightnessChange = function (value) {
        var newHsl = __assign(__assign({}, hsl), { l: value });
        setHsl(newHsl);
        // Convert to RGB
        var newRgb = colorConverters.hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        // Convert to HEX
        var newHex = colorConverters.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setHex(newHex);
        // Trigger onChange
        onChange(newHex);
    };
    var handleOpacityChange = function (value) {
        setOpacity(value);
        // For simplicity, we're not changing the hex value for opacity
        // In a real implementation, you might want to convert to rgba or hex8
    };
    var handlePresetClick = function (presetColor) {
        onChange(presetColor);
        setHex(presetColor);
        // Update RGB
        var newRgb = colorConverters.hexToRgb(presetColor);
        if (newRgb) {
            setRgb(newRgb);
            // Update HSL
            var newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
            setHsl(newHsl);
        }
    };
    var handleEyedropper = function () { return __awaiter(void 0, void 0, void 0, function () {
        var eyeDropper, result, srgbHex, newRgb, newHsl, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!('EyeDropper' in window)) {
                        alert('Your browser does not support the EyeDropper API');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    eyeDropper = new EyeDropper();
                    return [4 /*yield*/, eyeDropper.open()];
                case 2:
                    result = _a.sent();
                    srgbHex = result.sRGBHex;
                    onChange(srgbHex);
                    setHex(srgbHex);
                    newRgb = colorConverters.hexToRgb(srgbHex);
                    if (newRgb) {
                        setRgb(newRgb);
                        newHsl = colorConverters.rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
                        setHsl(newHsl);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error('EyeDropper error:', e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (jsxs(Fragment, { children: [jsx(PickerButton, { "aria-describedby": id, onClick: handleClick, disabled: disabled, sx: __assign({ backgroundColor: color }, SizeStyles[size]) }), jsxs(PickerPopover, __assign({ id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                } }, { children: [jsx(Typography, __assign({ variant: "subtitle1", gutterBottom: true }, { children: label })), jsx(ColorPreview, { sx: { backgroundColor: color } }), jsx(ColorWheelCanvas, { ref: canvasRef, onClick: handleCanvasClick }), jsx(ColorInput, { value: hex, onChange: handleHexChange, isValid: isValidHex(hex), onEyedropper: showEyedropper ? handleEyedropper : undefined }), jsx(ColorSlider, { label: "Hue", value: hsl.h, min: 0, max: 360, onChange: handleHueChange, color: theme.palette.primary.main }), jsx(ColorSlider, { label: "Saturation", value: hsl.s, min: 0, max: 100, onChange: handleSaturationChange, color: theme.palette.secondary.main }), jsx(ColorSlider, { label: "Lightness", value: hsl.l, min: 0, max: 100, onChange: handleLightnessChange, color: theme.palette.success.main }), showOpacity && (jsx(ColorSlider, { label: "Opacity", value: opacity, min: 0, max: 1, step: 0.01, onChange: handleOpacityChange, color: theme.palette.grey[500] })), jsxs(Typography, __assign({ variant: "body2", gutterBottom: true }, { children: ["Output (", format, "): ", outputColor] })), jsx(Typography, __assign({ variant: "body2", gutterBottom: true, sx: { mt: 2 } }, { children: "Preset Colors:" })), jsx(Grid, __assign({ container: true, spacing: 1 }, { children: presetColors.map(function (swatch, index) { return (jsx(Grid, __assign({ item: true }, { children: jsx(ColorSwatch, { color: swatch, onClick: function () { return handlePresetClick(swatch); } }) }), index)); }) }))] }))] }));
};

export { ColorWheel, colorConverters, useColorState, validators };
//# sourceMappingURL=index.esm.js.map
