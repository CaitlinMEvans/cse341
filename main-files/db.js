const { MongoClient } = require('mongodb');

// Get MongoDB URI from environment variables
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('contactsDB').collection('contacts');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = connectToDatabase;