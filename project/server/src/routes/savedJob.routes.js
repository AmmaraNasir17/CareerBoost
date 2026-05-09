const express = require("express");
const router = express.Router();

const savedJobController = require("../controllers/jobs/savedJob.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get("/", authMiddleware, roleMiddleware("applier"), savedJobController.getSavedJobs);
router.post("/:id/toggle", authMiddleware, roleMiddleware("applier"), savedJobController.toggleSaveJob);

module.exports = router;