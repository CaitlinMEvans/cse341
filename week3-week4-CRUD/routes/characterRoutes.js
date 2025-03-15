const express = require('express');
const { ObjectId } = require('mongodb');
const Character = require('../models/characterModel');
const router = express.Router();

// GET all characters
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving characters' });
    }
});

// GET a single character by ID
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);

        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving character' });
    }
});

// POST a new character
router.post('/', async (req, res) => {
    try {
        const newCharacter = new Character({
            name: req.body.name,
            house: req.body.house,
            wand: req.body.wand,
            patronus: req.body.patronus
        });

        const result = await newCharacter.save();
        res.status(201).json({ message: 'Character added', id: result._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding character' });
    }
});

// PUT (Update) a character by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCharacter = {
            name: req.body.name,
            house: req.body.house,
            wand: req.body.wand,
            patronus: req.body.patronus
        };

        const result = await Character.findByIdAndUpdate(req.params.id, updatedCharacter, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json({ message: 'Character updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating character' });
    }
});

// DELETE a character by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Character.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Character not found' });
        }

        res.json({ message: 'Character deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting character' });
    }
});

module.exports = router;