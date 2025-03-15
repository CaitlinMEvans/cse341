const express = require("express");
const { ObjectId } = require("mongodb");
const Character = require("../models/characterModel");
const router = express.Router();

// GET all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving characters" });
  }
});

// GET a single character by ID
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving character" });
  }
});

// POST a new character
router.post("/", async (req, res) => {
  try {
    const newCharacter = new Character({
      name: req.body.name,
      alternate_names: req.body.alternate_names || [],
      species: req.body.species || "unknown",
      gender: req.body.gender || "unknown",
      house: req.body.house || "unknown",
      dateOfBirth: req.body.dateOfBirth || "unknown",
      yearOfBirth: req.body.yearOfBirth || null,
      wizard: req.body.wizard || false,
      ancestry: req.body.ancestry || "unknown",
      eyeColour: req.body.eyeColour || "unknown",
      hairColour: req.body.hairColour || "unknown",
      patronus: req.body.patronus || "none",
      hogwartsStudent: req.body.hogwartsStudent || false,
      hogwartsStaff: req.body.hogwartsStaff || false,
      actor: req.body.actor || "unknown",
      alternate_actors: req.body.alternate_actors || [],
      alive: req.body.alive || true,
      image: req.body.image || "https://placeholder.com/harrypotter",
      wand: {
        wood: req.body.wand?.wood || "unknown",
        core: req.body.wand?.core || "unknown",
        length: req.body.wand?.length || null
      }
    });

    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding character" });
  }
});

// PUT (Update) a character by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        alternate_names: req.body.alternate_names || [],
        species: req.body.species || "unknown",
        gender: req.body.gender || "unknown",
        house: req.body.house || "unknown",
        dateOfBirth: req.body.dateOfBirth || "unknown",
        yearOfBirth: req.body.yearOfBirth || null,
        wizard: req.body.wizard || false,
        ancestry: req.body.ancestry || "unknown",
        eyeColour: req.body.eyeColour || "unknown",
        hairColour: req.body.hairColour || "unknown",
        patronus: req.body.patronus || "none",
        hogwartsStudent: req.body.hogwartsStudent || false,
        hogwartsStaff: req.body.hogwartsStaff || false,
        actor: req.body.actor || "unknown",
        alternate_actors: req.body.alternate_actors || [],
        alive: req.body.alive || true,
        image: req.body.image || "https://placeholder.com/harrypotter",
        wand: {
          wood: req.body.wand?.wood || "unknown",
          core: req.body.wand?.core || "unknown",
          length: req.body.wand?.length || null
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json(updatedCharacter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating character" });
  }
});

// DELETE a character by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);

    if (!deletedCharacter) {
      return res.status(404).json({ message: "Character not found" });
    }

    res.json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting character" });
  }
});

module.exports = router;