// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
// const { isAuthenticated } = require('../middleware/authMiddleware');

// // @route   GET /auth/google
// // @desc    Authenticate with Google
// // router.get('/google', 
// //     passport.authenticate('google', { scope: ['profile', 'email'] })
// //   );
  
// //   router.get('/google/pettracker/callback', 
// //     passport.authenticate('google', { 
// //       failureRedirect: '/login.html',
// //       failureMessage: 'Failed to authenticate with Google' 
// //     }),
// //     (req, res) => {
// //       // Successful authentication, redirect to dashboard
// //       res.redirect('/dashboard');
// //     }
// //   );

// router.get('/google/pettracker/callback', 
//     passport.authenticate('google', { 
//       failureRedirect: '/login.html',
//       failureMessage: 'Failed to authenticate with Google' 
//     }),
//     (req, res) => {
//       // Add some debug logging
//       console.log('Auth successful, user:', req.user);
//       // Redirect to dashboard with a simpler path
//       res.redirect('/dashboard');
//     }
//   );
  
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// @route   GET /auth/google
// @desc    Authenticate with Google
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
  
router.get('/google/pettracker/callback', 
    passport.authenticate('google', { 
      failureRedirect: '/login.html',
      failureMessage: 'Failed to authenticate with Google' 
    }),
    (req, res) => {
      // Add some debug logging
      console.log('Auth successful, user:', req.user);
      
      // Force session save to ensure persistence
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.redirect('/login.html?error=session');
        }
        console.log('Session saved successfully, redirecting to dashboard');
        res.redirect('/dashboard');
      });
    }
);

// @route   GET /auth/logout
// @desc    Logout user
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