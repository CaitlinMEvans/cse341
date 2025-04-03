const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
  getPets, 
  getPet, 
  createPet, 
  updatePet, 
  deletePet 
} = require('../controllers/petController');
const { isAuthenticated, isPetOwner } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(isAuthenticated);

// @route   GET /api/pets
// @desc    Get all pets for logged in user
router.get('/', getPets);

// @route   GET /api/pets/:id
// @desc    Get single pet
router.get('/:id', isPetOwner, getPet);

// @route   POST /api/pets
// @desc    Create new pet
router.post('/', [
  // Validation
  check('name', 'Pet name is required').not().isEmpty(),
  check('species', 'Species is required').not().isEmpty()
], createPet);

// @route   PUT /api/pets/:id
// @desc    Update pet
router.put('/:id', [
  // Validation - not checking required fields for updates
  check('name').optional(),
  check('species').optional(),
  check('breed').optional(),
  check('birthDate').optional().isISO8601().withMessage('Birth date must be a valid date'),
  check('weight.amount').optional().isNumeric().withMessage('Weight must be a number'),
  check('weight.unit').optional().isIn(['lb', 'kg', 'g', 'oz']).withMessage('Invalid weight unit')
], isPetOwner, updatePet);

// @route   DELETE /api/pets/:id
// @desc    Delete pet
router.delete('/:id', isPetOwner, deletePet);

module.exports = router;