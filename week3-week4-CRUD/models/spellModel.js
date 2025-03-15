const mongoose = require("mongoose");

const spellSchema = new mongoose.Schema({
  name: { type: String, required: true },
  effect: String,
  type: String,
  incantation: String
});

module.exports = mongoose.model("spell", spellSchema);
