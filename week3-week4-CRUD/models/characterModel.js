const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alternate_names: { type: [String], default: [] },
  species: { type: String, default: "unknown" },
  gender: { type: String, default: "unknown" },
  house: { type: String, default: "unknown" },
  dateOfBirth: { type: String, default: "unknown" },
  yearOfBirth: { type: Number, default: null },
  wizard: { type: Boolean, default: false },
  ancestry: { type: String, default: "unknown" },
  eyeColour: { type: String, default: "unknown" },
  hairColour: { type: String, default: "unknown" },
  patronus: { type: String, default: "none" },
  hogwartsStudent: { type: Boolean, default: false },
  hogwartsStaff: { type: Boolean, default: false },
  actor: { type: String, default: "unknown" },
  alternate_actors: { type: [String], default: [] },
  alive: { type: Boolean, default: true },
  image: { type: String, default: "https://placeholder.com/harrypotter" },
  wand: {
    wood: { type: String, default: "unknown" },
    core: { type: String, default: "unknown" },
    length: { type: Number, default: null }
  }
});

module.exports = mongoose.model("Character", characterSchema);