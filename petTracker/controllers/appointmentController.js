const Appointment = require('../models/appointmentModel');
const Pet = require('../models/petModel');

// @desc    Get all appointments for a pet
// @route   GET /api/appointments/:petId
exports.getAppointments = async (req, res) => {
  try {
    // Get pet ID from URL
    const petId = req.params.petId;
    
    // Optional query param to filter by status
    const filterStatus = req.query.status;
    
    // Build query
    const query = { petId };
    if (filterStatus) {
      query.status = filterStatus;
    }
    
    // Get all appointments for this pet
    const appointments = await Appointment.find(query)
      .sort({ date: 1 });
    
    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    console.error('Error retrieving appointments:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving appointments'
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/appointment/:id
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if user owns this appointment
    if (appointment.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this appointment'
      });
    }
    
    res.json({
      success: true,
      data: appointment
    });
  } catch (err) {
    console.error('Error retrieving appointment:', err);
    res.status(500).json({
      success: false,
      message: 'Error retrieving appointment'
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments/:petId
exports.createAppointment = async (req, res) => {
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
        message: 'Not authorized to add appointments for this pet'
      });
    }
    
    // Add petId and userId to the appointment data
    req.body.petId = petId;
    req.body.userId = req.user.id;
    
    // Create the new appointment
    const appointment = await Appointment.create(req.body);
    
    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    console.error('Error creating appointment:', err);
    
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
      message: 'Error creating appointment'
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/appointment/:id
exports.updateAppointment = async (req, res) => {
  try {
    // Find the appointment
    let appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if user owns this appointment
    if (appointment.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }
    
    // Make sure petId and userId cannot be changed
    if (req.body.petId) {
      delete req.body.petId;
    }
    
    if (req.body.userId) {
      delete req.body.userId;
    }
    
    // Update appointment
    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: appointment
    });
  } catch (err) {
    console.error('Error updating appointment:', err);
    
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
      message: 'Error updating appointment'
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/appointment/:id
exports.deleteAppointment = async (req, res) => {
  try {
    // Find the appointment
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if user owns this appointment
    if (appointment.userId.toString() !== req.user.id && req.user.role !== 'superuser') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this appointment'
      });
    }
    
    // Delete the appointment
    await appointment.deleteOne();
    
    res.json({
      success: true,
      message: 'Appointment removed',
      data: {}
    });
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment'
    });
  }
};