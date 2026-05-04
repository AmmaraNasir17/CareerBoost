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

// View my applicants
router.get(
  "/my-applicants",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  applicationController.getMyApplicants
);

// View applications for a job (recruiter)
router.get(
  "/job/:jobId/applications",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  applicationController.getApplicationsForJob
);

// Update application status (recruiter)
router.put(
  "/:applicationId/status",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  applicationController.updateApplicationStatus
);

module.exports = router;