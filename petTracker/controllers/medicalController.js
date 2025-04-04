const MedicalRecord = require('../models/medicalModel');
const Pet = require('../models/petModel');

// @desc    Get all medical records for a pet
// @route   GET /api/medical/:petId
exports.getMedicalRecords = async (req, res) => {
  try {
    // Get pet ID from URL
    const petId = req.params.petId;
    
    // Get all medical records for this pet
    const records = await MedicalRecord.find({ petId })
      .sort({ date: -1 });
    
    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err) {
    console.error('Error retrieving medical records:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving medical records'
    });
  }
};

// @desc    Get single medical record
// @route   GET /api/medical/record/:id
exports.getMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }
    
    // Check if user owns this record
    if (record.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this medical record'
      });
    }
    
    res.json({
      success: true,
      data: record
    });
  } catch (err) {
    console.error('Error retrieving medical record:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving medical record'
    });
  }
};

// @desc    Create new medical record
// @route   POST /api/medical/:petId
exports.createMedicalRecord = async (req, res) => {
  try {
    // Get pet ID from URL
    const petId = req.params.petId;
    
    // Find the pet first to check ownership
    const pet = await Pet.findById(petId);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Pet not found'
      });
    }
    
    // Check if user owns this pet
    if (pet.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add medical records for this pet'
      });
    }
    
    // Add petId and userId to the record data
    req.body.petId = petId;
    req.body.userId = req.user.id;
    
    // Create the new medical record
    const record = await MedicalRecord.create(req.body);
    
    res.status(201).json({
      success: true,
      data: record
    });
  } catch (err) {
    console.error('Error creating medical record:', err);
    
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
      message: 'Error creating medical record'
    });
  }
};

// @desc    Update medical record
// @route   PUT /api/medical/record/:id
exports.updateMedicalRecord = async (req, res) => {
  try {
    // Find the record
    let record = await MedicalRecord.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }
    
    // Check if user owns this record
    if (record.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this medical record'
      });
    }
    
    // Make sure petId and userId cannot be changed
    if (req.body.petId) {
      delete req.body.petId;
    }
    
    if (req.body.userId) {
      delete req.body.userId;
    }
    
    // Update record
    record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: record
    });
  } catch (err) {
    console.error('Error updating medical record:', err);
    
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
      message: 'Error updating medical record'
    });
  }
};

// @desc    Delete medical record
// @route   DELETE /api/medical/record/:id
exports.deleteMedicalRecord = async (req, res) => {
  try {
    // Find the record
    const record = await MedicalRecord.findById(req.params.id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }
    
    // Check if user owns this record
    if (record.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this medical record'
      });
    }
    
    // Delete the record
    await record.deleteOne();
    
    res.json({
      success: true,
      message: 'Medical record removed',
      data: {}
    });
  } catch (err) {
    console.error('Error deleting medical record:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting medical record'
    });
  }
};