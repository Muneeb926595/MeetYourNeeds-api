const utils = require("../../utils");
const { isImage } = require("../../utils");
const { Product } = require("../../models/product/product");

exports.addProduct = async (req, res, next) => {
  const { userId, title, price, description, category } = req.body;

  let product = new Product({
    userId,
    title,
    price,
    description,
    category,
  });
  if (req.file) {
    const { destination, filename } = req.file;
    if (isImage(req.file.mimetype)) {
      product.image = utils.createImageUrl(destination, filename);
    }
  }
  const result = await product.save();

  return res.status(200).send(result);
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find()
    .populate("userId", "userName")
    .sort({ createdAt: -1 });
  return res.status(200).send(products);
};

exports.getProductsByCategory = async (req, res, next) => {
  const { category } = req.params;
  const products = await Product.find({ category: category })
    .populate("userId", "userName")
    .sort({ createdAt: -1 });
  return res.status(200).send(products);
};
