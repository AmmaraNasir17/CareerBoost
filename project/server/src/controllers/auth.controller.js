const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
} = require("../models/user.model");

const checkIfUserExists = async (email) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
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
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
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
    console.log(err);
    res.status(500).json("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmailAndPassword(email, password);
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
