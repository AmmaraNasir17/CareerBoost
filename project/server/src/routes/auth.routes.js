const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth/auth.controller");
const passwordController = require("../controllers/auth/password.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);

router.post("/forgot-password", passwordController.requestPasswordReset);
router.post("/reset-password", passwordController.resetPassword);
router.post("/change-password", authMiddleware, passwordController.changePassword);

module.exports = router;