const bycrypt = require('bcryptjs')

const { User } = require('../../../models/auth/user')
const { Order } = require('../../../models/order/order')
const { Product } = require('../../../models/product/product')

exports.getDashboardData = async (req, res, next) => {
  const allUsersCount = await User.find().count()
  const allProductsCount = await Product.find().count()
  const allOrdersCount = await Order.find().count()

  return res
    .status(200)
    .send({ allUsersCount, allProductsCount, allOrdersCount })
}
