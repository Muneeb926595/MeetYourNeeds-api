const utils = require("../../utils");
const { isImage } = require("../../utils");
const { Product } = require("../../models/product/product");

exports.addProduct = async (req, res, next) => {
  const { userId, title, price, description, category, phoneNo } = req.body;

  let product = new Product({
    userId,
    title,
    price,
    description,
    category,
    phoneNo,
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

//get product by productId
exports.getProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("userId", "");
  return res.status(200).send(product);
};
exports.deleteProductById = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  return res.status(200).send(product);
};

exports.getProductsByCategory = async (req, res, next) => {
  const { category } = req.params;
  const products = await Product.find({ category: category })
    .populate("userId", "userName")
    .sort({ createdAt: -1 });
  return res.status(200).send(products);
};
