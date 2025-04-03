const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// @route   GET /auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login.html',
    failureMessage: 'Failed to authenticate with Google' 
  }),
  (req, res) => {
    // Update last login time
    if (req.user && req.user.updateLastLogin) {
      req.user.updateLastLogin();
    }
    res.redirect('/dashboard');
  }
);

// @route   GET /auth/logout
// @desc    Logout user
// @access  Public
router.get('/logout', (req, res, next) => {
  // Handle different versions of passport
  if (req.logout && typeof req.logout === 'function') {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  } else {
    // Fallback for older passport versions
    req.logout();
    res.redirect('/');
  }
});

// @route   GET /auth/user
// @desc    Get current user info
// @access  Private
router.get('/user', isAuthenticated, (req, res) => {
  // Return user data without sensitive info
  const { _id, name, email, role } = req.user;
  res.json({
    success: true,
    user: { id: _id, name, email, role }
  });
});

// @route   GET /auth/status
// @desc    Check authentication status
// @access  Public
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, name, email, role } = req.user;
    return res.json({
      success: true,
      isAuthenticated: true,
      user: { id: _id, name, email, role }
    });
  }
  
  res.json({
    success: true,
    isAuthenticated: false
  });
});

module.exports = router;