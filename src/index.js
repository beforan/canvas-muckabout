import HslToRgb from "hsl-to-rgb";
import Scale8bitTo1 from "./scale8bitTo1";
import * as ImageDataHelpers from "./imagedata-helpers";

const canvas = document.getElementById("gameScreen");

const context = canvas.msGetInputContext("2d");

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

const tick = () => {
  const w = canvas.width;
  const h = canvas.height;

  // get imagedata from the existing canvas
  const imageData = context.getImageData(0, 0, w, h);

  // randomise the bottom row
  for (let x = 0; x < w; x++) {
    ImageDataHelpers.setPixel(
      imageData,
      x,
      h - 1,
      palette[Math.floor(Math.random() * 256)]
    );
  }

  // calculate modification for all other pixels from the bottom up
  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w; x++) {
      // get nearby pixel colors
      const p1 = ImageDataHelpers.getPixel(
        imageData,
        (x - 1 + w) % w,
        (y + 1) % h
      );
      const p2 = ImageDataHelpers.getPixel(imageData, x % w, (y + 1) % h);
      const p3 = ImageDataHelpers.getPixel(imageData, (x + 1) % w, (y + 1) % h);
      const p4 = ImageDataHelpers.getPixel(imageData, x % w, (y + 2) % h);

      // set this pixel
      ImageDataHelpers.setPixel(
        imageData,
        x,
        y,
        ((p1 + p2 + p3 + p4) * 32) / 129
      );
    }
  }

  // update canvas with our modified imagedata
  context.putImageData(imageData, 0, 0);

  // tick again
  requestAnimationFrame(tick);
};

// kick off the animation
requestAnimationFrame(tick);
