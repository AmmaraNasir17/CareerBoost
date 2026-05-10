const express = require("express");
const router = express.Router();

const skillTrackerController = require("../controllers/skills/skillTracker.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/progress", authMiddleware, roleMiddleware("applier"), skillTrackerController.getSkillProgress);
router.get("/weak-areas", authMiddleware, roleMiddleware("applier"), skillTrackerController.getWeakAreas);
router.get("/streak", authMiddleware, roleMiddleware("applier"), skillTrackerController.getStreak);
router.get("/dashboard", authMiddleware, roleMiddleware("applier"), skillTrackerController.getDashboardStats);

module.exports = router;