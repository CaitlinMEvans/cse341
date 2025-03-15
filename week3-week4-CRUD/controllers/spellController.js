const Spell = require("../models/spellModel.js");

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
