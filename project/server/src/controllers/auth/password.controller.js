const bcrypt = require("bcrypt");
const { createHttpError } = require("../../utils/appError");
const {
  findUserByEmail,
  updateUserPassword,
} = require("../../models/user.model");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
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
    if (err.status)
      return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};
