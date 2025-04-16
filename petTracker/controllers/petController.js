const Pet = require('../models/petModel');

// @desc    Get all pets for logged in user
// @route   GET /api/pets
exports.getPets = async (req, res) => {
  try {
    // Find pets that belong to this user
    const pets = await Pet.find({ userId: req.user._id.toString() }).sort({ name: 1 });
    
    res.json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (err) {
    console.error('Error retrieving pets:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving pets'
    });
  }
};

// @desc    Get single pet
// @route   GET /api/pets/:id
exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    res.json({
      success: true,
      data: pet
    });
  } catch (err) {
    console.error('Error retrieving pet:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving pet'
    });
  }
};

// @desc    Create new pet
// @route   POST /api/pets
exports.createPet = async (req, res) => {
  try {
    // Add the current user's ID to the pet data
    req.body.userId = req.user.id;
    
    // Create the new pet
    const pet = await Pet.create(req.body);
    
    res.status(201).json({
      success: true,
      data: pet
    });
  } catch (err) {
    console.error('Error creating pet:', err);
    
    // Check for validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating pet'
    });
  }
};

// @desc    Update pet
// @route   PUT /api/pets/:id
exports.updatePet = async (req, res) => {
  try {
    // Make sure userId cannot be changed
    if (req.body.userId) {
      delete req.body.userId;
    }
    
    // Update pet
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    res.json({
      success: true,
      data: pet
    });
  } catch (err) {
    console.error('Error updating pet:', err);
    
    // Check for validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating pet'
    });
  }
};

// @desc    Delete pet
// @route   DELETE /api/pets/:id
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    await pet.deleteOne();
    
    res.json({
      success: true,
      message: 'Pet removed',
      data: {}
    });
  } catch (err) {
    console.error('Error deleting pet:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting pet'
    });
  }
};