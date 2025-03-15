const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alternate_names: [String],
  species: String,
  gender: String,
  house: String,
  dateOfBirth: String,
  yearOfBirth: Number,
  wizard: Boolean,
  ancestry: String,
  eyeColour: String,
  hairColour: String,
  wand: {
    wood: String,
    core: String,
    length: Number
  },
  patronus: String,
  hogwartsStudent: Boolean,
  hogwartsStaff: Boolean,
  actor: String,
  alternate_actors: [String],
  alive: Boolean,
  image: String
});

module.exports = mongoose.model("character", characterSchema);
