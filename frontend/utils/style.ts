const getCssVariableValue = (
  variableName: string,
  el = document.documentElement
) => {
  const variableNameWithNoVar = variableName.replace(
    /^var\((--[^)]+)\)$/,
    '$1'
  );
  const style = getComputedStyle(el);
  return style.getPropertyValue(variableNameWithNoVar).trim();
};

const getBrightness = ({ r, g, b }: { r: number; g: number; b: number }) =>
  r * 0.299 + g * 0.587 + b * 0.114;

const isDarkColor = ({ r, g, b }: { r: number; g: number; b: number }) =>
  getBrightness({ r, g, b }) < 150;

const isHexColor = (color: string) => {
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  return hexColorRegex.test(color);
};

const isRgbColor = (color: string) => {
  const rgbColorRegex =
    /^(rgb|rgba)\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*(0|1|0?\.\d+))?\)$/;
  return rgbColorRegex.test(color);
};

const isCssVariable = (str: string) => {
  const cssVarPattern = /^var\(--[\w-]+\)$/;
  return cssVarPattern.test(str);
};

const hexToRgb = (hex: string) => {
  if (!isHexColor(hex)) return { r: 0, g: 0, b: 0 };

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0; // `h`を初期化
  let s: number = 0; // `s`を初期化
  const l = (max + min) / 2;

  if (max === min) {
    // achromatic (no saturation)
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = ({
  h,
  s,
  l,
}: {
  h: number;
  s: number;
  l: number;
}): { r: number; g: number; b: number } => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};

const hslToHex = ({ h, s, l }: { h: number; s: number; l: number }) => {
  const { r, g, b } = hslToRgb({ h, s, l });
  return rgbToHex({ r, g, b });
};

const calculateAdjacentColors = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl({ r, g, b });
  // 明るい色と暗い色の明度を調整
  const lighterL = Math.min(l + 15, 100);
  const darkerL = Math.max(l - 15, 0);
  return {
    lighter: hslToHex({ h, s, l: lighterL }),
    current: hex,
    darker: hslToHex({ h, s, l: darkerL }),
  };
};

const selectDarkOrBrightColor = ({
  lighter,
  current,
  darker,
}: {
  lighter: string;
  current: string;
  darker: string;
}) => {
  if (isDarkColor(hexToRgb(current))) return lighter;
  return darker;
};

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const hex = [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('');
  return `#${hex}`;
};

const getDarkerAndLighterColor = (
  color: string,
  el = document.documentElement
) => {
  const hex = isCssVariable(color) ? getCssVariableValue(color, el) : color;
  return calculateAdjacentColors(hex);
};

const selectRightColor = (color: string, el = document.documentElement) => {
  const hex = isCssVariable(color) ? getCssVariableValue(color, el) : color;
  const colorAdjustments = calculateAdjacentColors(hex);
  return selectDarkOrBrightColor(colorAdjustments);
};

const rgbToStyle = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `rgb(${r} ${g} ${b}`;

export {
  getCssVariableValue,
  getBrightness,
  isDarkColor,
  isRgbColor,
  hexToRgb,
  rgbToHex,
  rgbToStyle,
  calculateAdjacentColors,
  selectDarkOrBrightColor,
  getDarkerAndLighterColor,
  selectRightColor,
};
