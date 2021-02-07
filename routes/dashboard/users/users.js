const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/dashboard/users/users");

router.get("/dashboard/users-data", usersController.getUsersData);

module.exports = router;
