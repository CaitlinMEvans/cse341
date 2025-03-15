const express = require('express');
const { ObjectId } = require('mongodb');
const Spell = require('../models/spellModel');
const router = express.Router();

// GET all spells
router.get('/', async (req, res) => {
    try {
        const spells = await Spell.find();
        res.json(spells);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving spells' });
    }
});

// GET a single spell by ID
router.get('/:id', async (req, res) => {
    try {
        const spell = await Spell.findById(req.params.id);

        if (!spell) {
            return res.status(404).json({ message: 'Spell not found' });
        }

        res.json(spell);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving spell' });
    }
});

// POST a new spell
router.post('/', async (req, res) => {
    try {
        const newSpell = new Spell({
            name: req.body.name,
            effect: req.body.effect,
            type: req.body.type,
            incantation: req.body.incantation
        });

        const result = await newSpell.save();
        res.status(201).json({ message: 'Spell added', id: result._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding spell' });
    }
});

// PUT (Update) a spell by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedSpell = {
            name: req.body.name,
            effect: req.body.effect,
            type: req.body.type,
            incantation: req.body.incantation
        };

        const result = await Spell.findByIdAndUpdate(req.params.id, updatedSpell, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Spell not found' });
        }

        res.json({ message: 'Spell updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating spell' });
    }
});

// DELETE a spell by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Spell.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Spell not found' });
        }

        res.json({ message: 'Spell deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting spell' });
    }
});

module.exports = router;