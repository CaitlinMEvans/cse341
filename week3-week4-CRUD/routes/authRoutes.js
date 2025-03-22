const express = require("express");
const passport = require("passport");

const router = express.Router();

// @desc   Auth with Google
// @route  GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc   Google Auth Callback
// @route  GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/auth/dashboard");
 // Redirect to dashboard after successful login
  }
);

// @desc   Logout User
// @route  GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/auth/google"); // redirects to login page after logout
    });
  });
});

// @desc   Dashboard page
// @route  GET /auth/dashboard
router.get("/dashboard", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/google");
  }

  res.send(`
    <h1>Welcome, ${req.user.name}!</h1>
    <p>Email: ${req.user.email}</p>
    <p>Role: ${req.user.role || "student"}</p>
    <a href="/auth/logout">Logout</a>
  `);
});

module.exports = router;
