const clientRoutes = require("./auth/user");
const productRoutes = require("./product/product");

module.exports = [].concat(clientRoutes, productRoutes);
