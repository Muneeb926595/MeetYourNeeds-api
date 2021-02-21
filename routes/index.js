const clientRoutes = require('./auth/user')
const adminRoutes = require('./dashboard/auth/auth')
const productRoutes = require('./product/product')
const adminDashboardRoutes = require('./dashboard/adminDashboard/adminDashboard')
const usersDashboardRoutes = require('./dashboard/users/users')
const productsDashboardRoutes = require('./dashboard/products/products')
const orderRoutes = require('./order/order')

module.exports = [].concat(
  clientRoutes,
  adminRoutes,
  productRoutes,
  orderRoutes,
  adminDashboardRoutes,
  usersDashboardRoutes,
  productsDashboardRoutes
)
