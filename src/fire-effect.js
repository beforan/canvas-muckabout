import HslToRgb from "./hsl-to-rgb";
import Scale8bitTo1 from "./scale8bitTo1";
import * as ImageDataHelpers from "./imagedata-helpers";

const canvas = document.getElementById("gameScreen");

const context = canvas.getContext("2d");

const w = canvas.width;
const h = canvas.height;

// generate a color palette?
const palette = [];
for (let i = 0; i < 256; i++) {
  palette[i] = HslToRgb(
    i / 3, //Hue goes from 0 to 85: red to yellow
    1, //Saturation is always the maximum: 1
    //Lightness is 0..1 for i=0..128, and 1 for i=128..255
    Scale8bitTo1(Math.min(255, i * 2))
  );
}

// keep a buffer of palette indices,
// since we do math on these, not on actual colour values
const fire = [];
// initialise the fire to palette color 0 everywhere
for (let y = 0; y < h; y++) {
  fire[y] = [];
  for (let x = 0; x < w; x++) fire[y][x] = 0;
}

const tick = () => {
  // randomise the bottom row
  for (let x = 0; x < w; x++) {
    fire[h - 1][x] = Math.floor(Math.random() * 256);
  }

  // calculate modification for all other pixels from top to bottom
  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w; x++) {
      // get nearby pixel palette indices
      const p1 = fire[(y + 1) % h][(x - 1 + w) % w];
      const p2 = fire[(y + 1) % h][x % w];
      const p3 = fire[(y + 1) % h][(x + 1) % w];
      const p4 = fire[(y + 2) % h][x % w];

      // calculate and set new palette index for this pixel
      fire[y][x] = Math.floor(((p1 + p2 + p3 + p4) * 128) / 513);
    }
  }

  // create an imagedata from our pixels' palette indices
  const imageData = context.createImageData(w, h);
  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b] = palette[fire[y][x]];
      ImageDataHelpers.setPixel(imageData, x, y, { r, g, b, a: 255 });
    }
  }

  // update canvas with our modified imagedata
  context.putImageData(imageData, 0, 0);

  // tick again
  requestAnimationFrame(tick);
};

// kick off the animation
requestAnimationFrame(tick);
