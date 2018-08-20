const getImageDataRedIndex = (imageData, x, y) =>
  y * (imageData.width * 4) + x * 4;

const getPixel = (imageData, x, y) => {
  let i = getImageDataRedIndex(imageData, x, y);
  const result = {};
  result[0] = result.r = result.red = imageData.data[i++];
  result[1] = result.g = result.green = imageData.data[i++];
  result[2] = result.b = result.blue = imageData.data[i++];
  result[3] = result.a = result.alpha = imageData.data[i++];
  return result;
};

const setPixel = (imageData, x, y, { r, g, b, a }) => {
  let i = getImageDataRedIndex(imageData, x, y);
  imageData.data[i++] = r;
  imageData.data[i++] = g;
  imageData.data[i++] = b;
  imageData.data[i++] = a;
};

export { getImageDataRedIndex, getPixel, setPixel };
