const colorsWithRatioAbove4 = [
  "lightblue",
  "lightgreen",
  "tomato",
  "lightsalmon",
  "plum",
  "lightcyan",
  "thistle",
  "lightseagreen",
  "chocolate",
  "orchid",
  "slategray",
  "forestgreen",
  "lightblue",
  "sandybrown",
  "rosybrown",
  "mediumorchid",
  "cadetblue",
  "cornflowerblue",
  "seagreen",
  "goldenrod",
  "darkorchid",
  "mediumturquoise",
  "darkorange",
  "darkviolet",
  "indianred",
  "mediumseagreen",
  "royalblue",
  "mediumslateblue",
  "olivedrab",
  "darkslateblue",
];

const cssColors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

/**
 * Convert a CSS color name to its hexadecimal representation.
 * @param colorName - The CSS color name (e.g., "red", "blue", "green", etc.).
 * @returns The hexadecimal representation (e.g., "#RRGGBB") or null if the color name is invalid.
 */
function cssColorNameToHex(colorName: string): string {
  const element = document.createElement("div");
  element.style.color = colorName;
  document.body.appendChild(element);
  const computedColor = getComputedStyle(element).color;
  document.body.removeChild(element);

  // The computed color is in the format "rgb(r, g, b)".
  // Extract the RGB values and convert to hexadecimal.
  const rgbValues = computedColor.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) {
    console.error("Invalid color name:", colorName);
    return "";
  }

  const r = parseInt(rgbValues[0], 10).toString(16).padStart(2, "0");
  const g = parseInt(rgbValues[1], 10).toString(16).padStart(2, "0");
  const b = parseInt(rgbValues[2], 10).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

/**
 * Calculate the contrast ratio between two colors in hexadecimal format.
 * @param color1 - The first color in hexadecimal format (#RRGGBB).
 * @param color2 - The second color in hexadecimal format (#RRGGBB).
 * @returns The contrast ratio between the two colors.
 */
function calculateContrastRatioHex(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b = parseInt(hexColor.substring(4, 6), 16) / 255;
    const gammaCorrection = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return (
      0.2126 * gammaCorrection(r) +
      0.7152 * gammaCorrection(g) +
      0.0722 * gammaCorrection(b)
    );
  };

  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  const lighterColor = Math.max(luminance1, luminance2);
  const darkerColor = Math.min(luminance1, luminance2);

  const contrastRatio = (lighterColor + 0.05) / (darkerColor + 0.05);

  return Number(contrastRatio.toFixed(2));
}

export {
  colorsWithRatioAbove4,
  cssColors,
  cssColorNameToHex,
  calculateContrastRatioHex,
};
