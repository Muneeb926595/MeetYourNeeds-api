const utils = require("../../utils");
const { isImage } = require("../../utils");
const { Product } = require("../../models/product/product");

exports.addProduct = async (req, res, next) => {
  const { userId, title, description, difficulty, category } = req.body;

  let product = new Product({
    userId,
    title,
    description,
    difficulty,
    category,
  });
  console.log(product);
  if (req.file) {
    const { destination, filename } = req.file;
    if (isImage(req.file.mimetype)) {
      product.image = utils.createImageUrl(destination, filename);
    }
  }
  const result = await product.save();

  return res.status(200).send(result);
};
