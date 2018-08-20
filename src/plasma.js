import * as ImageDataHelpers from "./imagedata-helpers";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const w = canvas.width;
const h = canvas.height;

const tick = () => {
  const imageData = context.createImageData(w, h);

  for (let y = 0; y < w; y++) {
    for (let x = 0; x < h; x++) {
      const c = 128 + 128 * Math.sin(x / 8);
      ImageDataHelpers.setPixel(imageData, x, y, { r: c, g: c, b: c, a: 255 });
    }
  }

  //tick again
  requestAnimationFrame(tick);
};

// start animating
requestAnimationFrame(tick);
