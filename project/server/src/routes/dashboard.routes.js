const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/skills/dashboard.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/applier", authMiddleware, roleMiddleware("applier"), dashboardController.getApplierDashboard);
router.get("/recruiter", authMiddleware, roleMiddleware("recruiter"), dashboardController.getRecruiterDashboard);

module.exports = router;