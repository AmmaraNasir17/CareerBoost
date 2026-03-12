const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.get(
  "/applier",
  authMiddleware,
  roleMiddleware(["applier"]),
  (req, res) => {
    res.json({
      message: "Welcome Applier Dashboard"
    });
  }
);

router.get(
  "/recruiter",
  authMiddleware,
  roleMiddleware(["recruiter"]),
  (req, res) => {
    res.json({
      message: "Welcome Recruiter Dashboard"
    });
  }
);

module.exports = router;