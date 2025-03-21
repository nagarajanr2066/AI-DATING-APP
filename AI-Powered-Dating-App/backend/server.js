const express = require("express");
const mongoose = require("mongoose");
const { register, login } = require("./auth");
const { User } = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/datingApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User registration route
app.post("/register", async (req, res) => {
  try {
    await register(req.body.username, req.body.password);
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(400).send("Registration failed"); // Updated to avoid exposing error.message
  }
});

// User login route
app.post("/login", async (req, res) => {
  try {
    const token = await login(req.body.username, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send("Login failed"); // Updated to avoid exposing error.message
  }
});

// Fetch matches route
app.get("/matches", async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const user = await User.findById(userId).populate("matches");
    res.status(200).json(user.matches);
  } catch (error) {
    res.status(400).send("Failed to fetch matches"); // Updated to avoid exposing error.message
  }
});

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the AI-Powered Dating App API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
