const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth/auth.controller");
const passwordController = require("../controllers/auth/password.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} = require("../validators/auth.validator");

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);
router.get("/me", authMiddleware, authController.getMe);

router.post("/forgot-password", forgotPasswordValidator, validate, passwordController.requestPasswordReset);
router.post("/reset-password", resetPasswordValidator, validate, passwordController.resetPassword);
router.post("/change-password", authMiddleware, changePasswordValidator, validate, passwordController.changePassword);

module.exports = router;