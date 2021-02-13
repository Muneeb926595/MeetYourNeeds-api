const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/user");

router.post("/auth/user", authController.createUser);
router.post("/auth/login", authController.loginUser);

router.get("/auth/user", authController.getUsers);
router.get("/auth/user/:id", authController.getUserById);

router.post("/auth/update-password", authController.updatePassword);
router.post("/auth/add-to-cart", authController.addToCart);
router.get("/auth/get-cart/:userId", authController.getUserCart);
router.delete(
  "/auth/remove-from-cart/:userId/:productId",
  authController.removeFromCart
);

module.exports = router;
