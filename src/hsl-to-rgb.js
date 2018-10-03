// expected hue range: [0, 360)
// expected saturation range: [0, 1]
// expected lightness range: [0, 1]
export default function(hue, saturation, lightness) {
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  if (hue === undefined) {
    return [0, 0, 0];
  }

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let huePrime = hue / 60;
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  let red;
  let green;
  let blue;

  if (huePrime === 0) {
    red = chroma;
    green = secondComponent;
    blue = 0;
  } else if (huePrime === 1) {
    red = secondComponent;
    green = chroma;
    blue = 0;
  } else if (huePrime === 2) {
    red = 0;
    green = chroma;
    blue = secondComponent;
  } else if (huePrime === 3) {
    red = 0;
    green = secondComponent;
    blue = chroma;
  } else if (huePrime === 4) {
    red = secondComponent;
    green = 0;
    blue = chroma;
  } else if (huePrime === 5) {
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  const lightnessAdjustment = lightness - chroma / 2;
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [
    Math.round(red * 255),
    Math.round(green * 255),
    Math.round(blue * 255)
  ];
}