const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Import MongoDB connection function
const connectToDatabase = require('../db.js'); 

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const contacts = await contactsCollection.find().toArray();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving contacts' });
    }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const contact = await contactsCollection.findOne({ _id: new ObjectId(req.params.id) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving contact' });
    }
});

// POST a new contact
router.post('/', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const newContact = req.body;

        const result = await contactsCollection.insertOne(newContact);
        res.status(201).json({ message: 'Contact added', id: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding contact' });
    }
});

// PUT (Update) a contact by ID
router.put('/:id', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const updatedContact = req.body;

        const result = await contactsCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating contact' });
    }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();

        const result = await contactsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting contact' });
    }
});

module.exports = router;
