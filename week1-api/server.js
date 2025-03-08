require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use('/contacts', contactsRoutes); // Use the contacts routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});