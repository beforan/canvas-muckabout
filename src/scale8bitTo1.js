export default input => {
  if (typeof input !== "number")
    throw new TypeError("Expected input to be a number.");

  if (input > 255 || input < 0)
    throw new Error(
      "Expected input to be a number between 0 and 255 inclusive"
    );

  return input / 255;
};
