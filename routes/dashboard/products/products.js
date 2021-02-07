const express = require("express");
const router = express.Router();

const productsController = require("../../../controllers/dashboard/products/products");

router.get("/dashboard/products-data", productsController.getAllProductsData);

module.exports = router;
