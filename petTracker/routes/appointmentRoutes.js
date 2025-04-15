// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { isAuthenticated, isPetOwner } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// @route   GET /api/appointments/:petId
// @desc    Get all appointments for a pet
// @access  Private
router.get('/:petId', isPetOwner, getAppointments);

// @route   GET /api/appointments/appointment/:id
// @desc    Get single appointment
// @access  Private
router.get('/appointment/:id', getAppointment);

// @route   POST /api/appointments/:petId
// @desc    Create new appointment
// @access  Private
router.post('/:petId', [
  // Validation
  check('date', 'Date is required').not().isEmpty().isISO8601().withMessage('Date must be valid'),
  check('appointmentType', 'Appointment type is required').not().isEmpty()
], isPetOwner, createAppointment);

// @route   PUT /api/appointments/appointment/:id
// @desc    Update appointment
// @access  Private
router.put('/appointment/:id', [
  // Validation for updates
  check('date').optional().isISO8601().withMessage('Date must be a valid date'),
  check('appointmentType').optional().isIn([
    'Checkup', 'Vaccination', 'Grooming', 'Surgery', 
    'Dental', 'Training', 'Boarding', 'Other'
  ]).withMessage('Invalid appointment type'),
  check('status').optional().isIn([
    'Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Missed'
  ]).withMessage('Invalid status')
], updateAppointment);

// @route   DELETE /api/appointments/appointment/:id
// @desc    Delete appointment
// @access  Private
router.delete('/appointment/:id', deleteAppointment);

module.exports = router;