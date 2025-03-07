require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('contactsDB').collection('contacts'); // Ensure this matches your database name
}

app.get('/contacts', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const contacts = await contactsCollection.find().toArray();

        // Manually reorder fields in each document
        const orderedContacts = contacts.map(contact => ({
            _id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            favoriteColor: contact.favoriteColor,
            birthday: contact.birthday
        }));

        console.log('Retrieved contacts:', orderedContacts); // Debugging log
        res.json(orderedContacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Error retrieving contacts' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});