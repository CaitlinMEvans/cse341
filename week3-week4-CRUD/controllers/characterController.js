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

// Update a character
exports.updateCharacter = async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) return res.status(404).json({ message: "Character not found" });
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: "Failed to update character", error });
  }
};

// Delete a character
exports.deleteCharacter = async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return res.status(404).json({ message: "Character not found" });
    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete character", error });
  }
};