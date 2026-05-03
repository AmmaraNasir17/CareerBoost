const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// Recruiter only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  jobController.createJob
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  jobController.deleteJob
);

router.get(
    "/my-jobs",
    authMiddleware,
    roleMiddleware(["recruiter"]),
    jobController.getMyJobs
);

// Public
router.get("/", jobController.getJobs);

router.get("/:id", jobController.getJob);

module.exports = router;