const { Order } = require('../../models/order/order')
const { User } = require('../../models/auth/user')

exports.addOrder = async (req, res, next) => {
  const { userId, products, paymentMethod } = req.body

  let order = new Order({
    userId,
    products,
    paymentMethod,
  })

  const result = await order.save()

  const client = {
    cart: [],
  }

  await User.findByIdAndUpdate(userId, client)

  return res.status(200).send(result)
}
exports.getOrders = async (req, res, next) => {
  let orders = await Order.find()
    .populate('userId', '')
    .populate('products', '')

  return res.status(200).send(orders)
}
exports.removeOrderByAdmin = async (req, res, next) => {
  const { id } = req.params
  let order = await Order.findByIdAndDelete(id)
  return res.status(200).send(order)
}
