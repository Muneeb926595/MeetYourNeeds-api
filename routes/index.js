const clientRoutes = require("./auth/user");
const adminRoutes = require("./dashboard/auth/auth");
const productRoutes = require("./product/product");

module.exports = [].concat(clientRoutes, adminRoutes, productRoutes);
