const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendPasswordResetEmail } = require("../../services/email.service");
const { createHttpError } = require("../../utils/appError");
const {
  findUserByEmail,
  findUserByResetToken,
  saveResetToken,
  clearResetToken,
  updateUserPassword,
} = require("../../models/user.model");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);
    if (!user) throw createHttpError("No account found with that email", 404);

    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await saveResetToken(user.id, token, expiresAt);

    await sendPasswordResetEmail(normalizedEmail, token);

    res.json({ message: "Password reset token generated", token });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await findUserByResetToken(token);
    if (!user) throw createHttpError("Invalid or expired reset token", 400);

    if (new Date() > new Date(user.reset_token_expires)) {
      throw createHttpError("Reset token has expired", 400);
    }

    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(user.id, hashedPassword);
    await clearResetToken(user.id);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await findUserByEmail(req.user.email);
    if (!user) throw createHttpError("User not found", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw createHttpError("Current password is incorrect", 401);

    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(user.id, hashedPassword);

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};