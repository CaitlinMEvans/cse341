const Pet = require('../models/petModel');
const { validationResult } = require('express-validator');

// @desc    Get all pets for logged in user
// @route   GET /api/pets
// @access  Private
exports.getPets = async (req, res) => {
 try {
   let query = {};
   
   // Regular users can only see their own pets
   // Superusers can see all pets
   if (req.user.role !== 'superuser') {
     query = { userId: req.user.id };
   }
   
   // Find pets based on the query
   const pets = await Pet.find(query).sort({ name: 1 });
   
   res.json({
     success: true,
     count: pets.length,
     data: pets
   });
 } catch (err) {
   console.error('❌ Error retrieving pets:', err);
   res.status(500).json({
     success: false,
     message: 'Error retrieving pets'
   });
 }
};

// @desc    Get single pet
// @route   GET /api/pets/:id
// @access  Private
exports.getPet = async (req, res) => {
 try {
   const pet = await Pet.findById(req.params.id);
   
   if (!pet) {
     return res.status(404).json({
       success: false,
       message: 'Pet not found'
     });
   }
   
   // Check if user owns this pet or is superuser
   // This check might be redundant if using middleware, but adds an extra layer of security
   if (pet.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
     return res.status(403).json({
       success: false,
       message: 'Not authorized to access this pet'
     });
   }
   
   res.json({
     success: true,
     data: pet
   });
 } catch (err) {
   console.error('❌ Error retrieving pet:', err);
   res.status(500).json({
     success: false,
     message: 'Error retrieving pet'
   });
 }
};

// @desc    Create new pet
// @route   POST /api/pets
// @access  Private
exports.createPet = async (req, res) => {
 try {
   // Input validation - check for errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({
       success: false,
       errors: errors.array()
     });
   }
   
   // Add the current user's ID to the pet data
   req.body.userId = req.user.id;
   
   // Create the new pet
   const pet = await Pet.create(req.body);
   
   res.status(201).json({
     success: true,
     data: pet
   });
 } catch (err) {
   console.error('❌ Error creating pet:', err);
   
   // Check for validation error from Mongoose
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
// @access  Private
exports.updatePet = async (req, res) => {
 try {
   // Input validation
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({
       success: false,
       errors: errors.array()
     });
   }
   
   // First find the pet to check ownership
   let pet = await Pet.findById(req.params.id);
   
   if (!pet) {
     return res.status(404).json({
       success: false,
       message: 'Pet not found'
     });
   }
   
   // Check if user owns this pet or is superuser
   if (pet.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
     return res.status(403).json({
       success: false,
       message: 'Not authorized to update this pet'
     });
   }
   
   // Make sure userId cannot be changed
   if (req.body.userId) {
     delete req.body.userId;
   }
   
   // Update pet
   pet = await Pet.findByIdAndUpdate(
     req.params.id,
     req.body,
     { new: true, runValidators: true }
   );
   
   res.json({
     success: true,
     data: pet
   });
 } catch (err) {
   console.error('❌ Error updating pet:', err);
   
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
// @access  Private
exports.deletePet = async (req, res) => {
 try {
   const pet = await Pet.findById(req.params.id);
   
   if (!pet) {
     return res.status(404).json({
       success: false,
       message: 'Pet not found'
     });
   }
   
   // Check if user owns this pet or is superuser
   if (pet.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
     return res.status(403).json({
       success: false,
       message: 'Not authorized to delete this pet'
     });
   }
   
   await pet.deleteOne();
   
   res.json({
     success: true,
     message: 'Pet removed',
     data: {}
   });
 } catch (err) {
   console.error('❌ Error deleting pet:', err);
   res.status(500).json({
     success: false,
     message: 'Error deleting pet'
   });
 }
};