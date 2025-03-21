const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const bcrypt = require("bcrypt");
const { User } = require("./models");

// Register a new user
const register = async (username, password) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Username already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
};

// Login user
const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { register, login };
