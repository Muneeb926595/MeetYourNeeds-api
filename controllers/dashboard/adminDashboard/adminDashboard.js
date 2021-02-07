const bycrypt = require("bcryptjs");

const { User } = require("../../../models/auth/user");
const { Product } = require("../../../models/product/product");

exports.getDashboardData = async (req, res, next) => {
  const allUsersCount = await User.find().count();
  const allProductsCount = await Product.find().count();

  return res.status(200).send({ allUsersCount, allProductsCount });
};
