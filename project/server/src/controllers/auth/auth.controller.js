const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAuthToken } = require("../../services/token.service");
const { sendWelcomeEmail } = require("../../services/email.service");
const { createHttpError } = require("../../utils/appError");
const { createUser, findUserByEmail } = require("../../models/user.model");

const checkIfUserExists = async (email) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw createHttpError("User already exists", 409);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password, hashed) => {
  const isMatch = await bcrypt.compare(password, hashed);
  if (!isMatch) throw createHttpError("Invalid email or password", 401);
};


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    await checkIfUserExists(email.trim().toLowerCase());
    const hashedPassword = await hashPassword(password);
    const user = await createUser(name, email.trim().toLowerCase(), hashedPassword, role);

    await sendWelcomeEmail(user.email, user.name);
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    if (err.code === "23505") return res.status(409).json({ message: "User already exists" });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);
    if (!user) throw createHttpError("Invalid email or password", 401);

    await verifyPassword(password, user.password);
    const token = generateAuthToken(user);

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) throw createHttpError("User not found", 404);

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error(err);
    if (err.status) return res.status(err.status).json({ message: err.message });
    return res.status(500).json({ message: "Server error" });
  }
};