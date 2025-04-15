// routes/medicalRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
  getMedicalRecords,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../controllers/medicalController');
const { isAuthenticated, isPetOwner } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// @route   GET /api/medical/:petId
// @desc    Get all medical records for a pet
// @access  Private
router.get('/:petId', isPetOwner, getMedicalRecords);

// @route   GET /api/medical/record/:id
// @desc    Get single medical record
// @access  Private
router.get('/record/:id', getMedicalRecord);

// @route   POST /api/medical/:petId
// @desc    Create new medical record
// @access  Private
router.post('/:petId', [
  // Validation
  check('date', 'Date is required').not().isEmpty(),
  check('recordType', 'Record type is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
], isPetOwner, createMedicalRecord);

// @route   PUT /api/medical/record/:id
// @desc    Update medical record
// @access  Private
router.put('/record/:id', [
  // Validation for updates
  check('date').optional().isISO8601().withMessage('Date must be a valid date'),
  check('recordType').optional().isIn([
    'Checkup', 'Vaccination', 'Illness', 'Injury', 
    'Surgery', 'Medication', 'Dental', 'Other'
  ]).withMessage('Invalid record type'),
  check('description').optional()
], updateMedicalRecord);

// @route   DELETE /api/medical/record/:id
// @desc    Delete medical record
// @access  Private
router.delete('/record/:id', deleteMedicalRecord);

module.exports = router;