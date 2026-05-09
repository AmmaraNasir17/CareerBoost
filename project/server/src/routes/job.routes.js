const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobs/job.controller");
const applicationController = require("../controllers/applications/application.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", jobController.getAllJobs);
router.get("/my-jobs", authMiddleware, roleMiddleware("recruiter"), jobController.getMyJobs);
router.get("/:id", jobController.getJobById);

router.post("/", authMiddleware, roleMiddleware("recruiter"), jobController.postJob);
router.put("/:id", authMiddleware, roleMiddleware("recruiter"), jobController.editJob);
router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), jobController.removeJob);

router.post("/:id/apply", authMiddleware, roleMiddleware("applier"), applicationController.applyToJob);
router.get("/:id/applicants", authMiddleware, roleMiddleware("recruiter"), applicationController.getApplicantsForJob);

module.exports = router;