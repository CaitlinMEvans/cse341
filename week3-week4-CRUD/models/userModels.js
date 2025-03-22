const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  role: { type: String, enum: ["student", "professor", "headmaster"], default: "student" }
});

module.exports = mongoose.model("User", userSchema);
