// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/professionalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the Professional schema
const ProfessionalSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String,
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String,
  },
  githubLink: {
    text: String,
    link: String,
  },
});

// Create the Mongoose model
const Professional = mongoose.model('Professional', ProfessionalSchema);

// Endpoint to GET all data
app.get('/api/data', async (req, res) => {
  try {
    // Retrieve the first document from MongoDB
    const data = await Professional.findOne();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'No data found in MongoDB' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
