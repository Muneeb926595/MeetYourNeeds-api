const express = require("express");
const router = express.Router();

const adminDashBoardController = require("../../../controllers/dashboard/adminDashboard/adminDashboard");

router.get("/dashboard/data", adminDashBoardController.getDashboardData);

module.exports = router;
