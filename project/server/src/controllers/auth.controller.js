const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser, findUserByEmail } = require("../models/user.model");

const createHttpError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const checkIfUserExists = async (email) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw createHttpError("User already exists", 409);
  }
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const saveUser = async (name, email, password, role) => {
  const user = await createUser(name, email, password, role);
  return user;
};

const findUserByEmailAndPassword = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw createHttpError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError("Invalid email or password", 401);
  }

  return user;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    await checkIfUserExists(email);
    const hashedPassword = await hashPassword(password);
    const user = await saveUser(name, email, hashedPassword, role);

    res.json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error(err);

    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    if (err.code === "23505") {
      return res.status(409).json({ message: "User already exists" });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmailAndPassword(normalizedEmail, password);
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error(err);

    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Server error" });
  }
};
exports.getUserData = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const user = await findUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
