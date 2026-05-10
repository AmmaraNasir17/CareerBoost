const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobs/job.controller");
const applicationController = require("../controllers/applications/application.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { postJobValidator, updateJobValidator, jobFilterValidator } = require("../validators/job.validator");

router.get("/", jobFilterValidator, validate, jobController.getAllJobs);
router.get("/my-jobs", authMiddleware, roleMiddleware("recruiter"), jobController.getMyJobs);
router.get("/:id", jobController.getJobById);

router.post("/", authMiddleware, roleMiddleware("recruiter"), postJobValidator, validate, jobController.postJob);
router.put("/:id", authMiddleware, roleMiddleware("recruiter"), updateJobValidator, validate, jobController.editJob);
router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), jobController.removeJob);

router.post("/:id/apply", authMiddleware, roleMiddleware("applier"), applicationController.applyToJob);
router.get("/:id/applicants", authMiddleware, roleMiddleware("recruiter"), applicationController.getApplicantsForJob);

module.exports = router;