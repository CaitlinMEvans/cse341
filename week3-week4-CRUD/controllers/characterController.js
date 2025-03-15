const Character = require("../models/characterModel");

// Get all characters
exports.getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching characters", error });
  }
};

// Add a character
exports.addCharacter = async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ message: "Failed to add character", error });
  }
};
