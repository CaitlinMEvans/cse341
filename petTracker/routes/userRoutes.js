const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  createUser,
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { 
  isAuthenticated, 
  isSuperUser,
  isOwnUserOrSuperUser
} = require('../middleware/authMiddleware');

// Apply authentication to all routes
router.use(isAuthenticated);

// Routes restricted to superusers only
router.get('/', isSuperUser, getUsers);
router.post('/', isSuperUser, createUser);

// Routes that allow either superusers or own user access
router.get('/:id', isOwnUserOrSuperUser, getUser);
router.put('/:id', isOwnUserOrSuperUser, updateUser);
router.delete('/:id', isOwnUserOrSuperUser, deleteUser);

module.exports = router;