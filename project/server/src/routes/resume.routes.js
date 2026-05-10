const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resume/resume.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { upload, handleUploadError } = require("../middleware/upload.middleware");
const { saveResumeValidator, analyzeResumeValidator } = require("../validators/resume.validator");

router.get("/", authMiddleware, roleMiddleware("applier"), resumeController.getResume);
router.post("/", authMiddleware, roleMiddleware("applier"), saveResumeValidator, validate, resumeController.saveResume);
router.get("/export", authMiddleware, roleMiddleware("applier"), resumeController.exportResumePDF);

router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("applier"),
  upload.single("resume"),
  handleUploadError,
  resumeController.uploadResume
);

router.post("/analyze", authMiddleware, roleMiddleware("applier"), analyzeResumeValidator, validate, resumeController.analyzeResume);
router.get("/analysis", authMiddleware, roleMiddleware("applier"), resumeController.getAnalysisResult);

module.exports = router;