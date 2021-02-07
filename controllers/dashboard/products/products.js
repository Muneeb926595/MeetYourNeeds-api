const bycrypt = require("bcryptjs");

const { Product } = require("../../../models/product/product");

exports.getAllProductsData = async (req, res, next) => {
  const allProducts = await Product.find().populate("userId", "");
  return res.status(200).send(allProducts);
};
