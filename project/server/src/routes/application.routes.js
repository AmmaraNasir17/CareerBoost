const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// View own applications
router.get(
  "/my-applications",
  authMiddleware,
  roleMiddleware(["applier"]),
  applicationController.getMyApplications
);

module.exports = router;