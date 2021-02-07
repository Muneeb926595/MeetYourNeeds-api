const bycrypt = require("bcryptjs");

const { User } = require("../../../models/auth/user");
const { Product } = require("../../../models/product/product");

exports.getUsersData = async (req, res, next) => {
  const allUsers = await User.find();
  return res.status(200).send(allUsers);
};
