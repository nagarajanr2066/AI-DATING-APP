const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: { type: Object, default: {} },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Export models
const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Message };
