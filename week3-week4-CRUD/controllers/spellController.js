const Spell = require("../models/spellModel");

// Get all spells
exports.getSpells = async (req, res) => {
  try {
    const spells = await Spell.find();
    res.json(spells);
  } catch (error) {
    res.status(500).json({ message: "Error fetching spells", error });
  }
};

// Add a spell
exports.addSpell = async (req, res) => {
  try {
    const spell = new Spell(req.body);
    await spell.save();
    res.status(201).json(spell);
  } catch (error) {
    res.status(400).json({ message: "Failed to add spell", error });
  }
};

// Update a spell
exports.updateSpell = async (req, res) => {
  try {
    const updatedSpell = await Spell.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpell) return res.status(404).json({ message: "Spell not found" });
    res.json(updatedSpell);
  } catch (error) {
    res.status(400).json({ message: "Failed to update spell", error });
  }
};

// Delete a spell
exports.deleteSpell = async (req, res) => {
  try {
    const deletedSpell = await Spell.findByIdAndDelete(req.params.id);
    if (!deletedSpell) return res.status(404).json({ message: "Spell not found" });
    res.json({ message: "Spell deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete spell", error });
  }
};
