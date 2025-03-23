// const mongoose = require("mongoose");

// const characterSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   alternate_names: { type: [String], default: [] },
//   species: { type: String, default: "unknown" },
//   gender: { type: String, default: "unknown" },
//   house: { type: String, default: "unknown" },
//   dateOfBirth: { type: String, default: "unknown" },
//   yearOfBirth: { type: Number, default: null },
//   wizard: { type: Boolean, default: false },
//   ancestry: { type: String, default: "unknown" },
//   eyeColour: { type: String, default: "unknown" },
//   hairColour: { type: String, default: "unknown" },
//   patronus: { type: String, default: "none" },
//   hogwartsStudent: { type: Boolean, default: false },
//   hogwartsStaff: { type: Boolean, default: false },
//   actor: { type: String, default: "unknown" },
//   alternate_actors: { type: [String], default: [] },
//   alive: { type: Boolean, default: true },
//   image: { type: String, default: "https://placeholder.com/harrypotter" },
//   wand: {
//     wood: { type: String, default: "unknown" },
//     core: { type: String, default: "unknown" },
//     length: { type: Number, default: null }
//   }
// });

// module.exports = mongoose.model("Character", characterSchema);

const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Character name is required."],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long."]
  },
  alternate_names: {
    type: [String],
    default: [],
    validate: {
      validator: arr => Array.isArray(arr),
      message: "Alternate names must be an array of strings."
    }
  },
  species: {
    type: String,
    default: "unknown"
  },
  gender: {
    type: String,
    default: "unknown"
  },
  house: {
    type: String,
    default: "unknown"
  },
  dateOfBirth: {
    type: String,
    default: "unknown"
  },
  yearOfBirth: {
    type: Number,
    default: null,
    min: [0, "Year of birth cannot be negative."]
  },
  wizard: {
    type: Boolean,
    required: [true, "Please specify if the character is a wizard."]
  },
  ancestry: {
    type: String,
    default: "unknown"
  },
  eyeColour: {
    type: String,
    default: "unknown"
  },
  hairColour: {
    type: String,
    default: "unknown"
  },
  patronus: {
    type: String,
    default: "none"
  },
  hogwartsStudent: {
    type: Boolean,
    default: false
  },
  hogwartsStaff: {
    type: Boolean,
    default: false
  },
  actor: {
    type: String,
    default: "unknown"
  },
  alternate_actors: {
    type: [String],
    default: [],
    validate: {
      validator: arr => Array.isArray(arr),
      message: "Alternate actors must be an array of strings."
    }
  },
  alive: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: "https://placeholder.com/harrypotter",
    validate: {
      validator: v => /^https?:\/\/.+\..+/.test(v),
      message: "Image must be a valid URL."
    }
  },
  wand: {
    wood: {
      type: String,
      default: "unknown"
    },
    core: {
      type: String,
      default: "unknown"
    },
    length: {
      type: Number,
      default: null,
      min: [0, "Wand length cannot be negative."]
    }
  }
});

module.exports = mongoose.model("Character", characterSchema);