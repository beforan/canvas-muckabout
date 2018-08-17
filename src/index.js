import HslToRgb from "hsl-to-rgb";
import Scale8bitTo1 from "./scale8bitTo1";

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
