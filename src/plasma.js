import HslToRgb from "./hsl-to-rgb";
import * as ImageDataHelpers from "./imagedata-helpers";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const w = canvas.width;
const h = canvas.height;

// build a 256 colour palette that covers a full hue range
const palette = [];
for (let i = 0; i < 256; i++) {
  palette[i] = HslToRgb(i, 0.5, 0.5); //max S and L
}
let paletteShift = 0;

// we use a plasma buffer to do math on, which references palette indices
const plasma = [];

const tick = () => {
  const imageData = context.createImageData(w, h);

  for (let y = 0; y < h; y++) {
    plasma[y] = plasma[y] || [];
    for (let x = 0; x < w; x++) {
      // here we actually calculate shit to get colours based on pixel position
      plasma[y][x] = Math.floor(
        128 +
          (128 * Math.tan(x / (w - 10))) / Math.cos(paletteShift) +
          (128 + (128 * Math.tan(y / (h - 10))) / Math.sin(paletteShift))
      );

      // while we're here, set the actual pixel to the indexed palette value
      const [r, g, b] = palette[(plasma[y][x] + paletteShift * 150) & 255];
      ImageDataHelpers.setPixel(imageData, x, y, { r, g, b, a: 255 });
    }
  }

  context.putImageData(imageData, 0, 0);

  // tick again
  paletteShift += 0.1;
  requestAnimationFrame(tick);
};

// start animating
requestAnimationFrame(tick);
