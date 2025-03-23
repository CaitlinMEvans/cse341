const mongoose = require("mongoose");

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Spell name is required."],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long."]
  },
  effect: {
    type: String,
    required: [true, "Spell effect is required."],
    default: "Unknown effect",
    trim: true
  },
  type: {
    type: String,
    default: "Unknown type",
    trim: true
  },
  incantation: {
    type: String,
    required: [true, "Incantation is required."],
    default: "Unknown incantation",
    trim: true
  }
});

module.exports = mongoose.model("Spell", spellSchema);