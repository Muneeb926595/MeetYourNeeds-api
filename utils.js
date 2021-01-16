const config = require("config");

const createImageUrl = (destination, filename) => {
  return "images" + destination.substring(16) + filename;
};
const getImagePath = (image) => {
  return "./public/uploads" + image.substring(image.indexOf("images") + 6);
};

const isImage = (type) => {
  const mimeTypes = ["image/gif", "image/jpeg", "image/png"];
  return mimeTypes.includes(type);
};

module.exports = {
  isImage,
  createImageUrl,
  getImagePath,
};
