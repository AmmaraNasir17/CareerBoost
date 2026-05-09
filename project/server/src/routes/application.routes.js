const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applications/application.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/my", authMiddleware, roleMiddleware("applier"), applicationController.getMyApplications);
router.get("/all", authMiddleware, roleMiddleware("recruiter"), applicationController.getAllApplicants);
router.patch("/:id/status", authMiddleware, roleMiddleware("recruiter"), applicationController.updateStatus);

module.exports = router;