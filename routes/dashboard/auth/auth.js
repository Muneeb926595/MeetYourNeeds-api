const express = require("express");
const router = express.Router();

const adminController = require("../../../controllers/dashboard/auth/auth");

router.post("/dashboard/auth/user", adminController.createAdmin);
router.post("/dashboard/auth/login", adminController.loginAdmin);

router.get("/dashboard/auth/user", adminController.getUsers);

module.exports = router;
