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

// Destructure user
const { name, email, role } = req.user;

// Conditional buttons
let buttons = "";

if (role === "professor") {
  buttons += `<a class="btn" href="/api/hogwarts-students">View Hogwarts Students</a>`;
} else if (role === "headmaster") {
  buttons += `
    <a class="btn" href="/api/hogwarts-professors">View Professors</a>
    <a class="btn" href="/api/hogwarts-students">View Students</a>
  `;
}

// Then inject it into the HTML like so:
res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hogwarts Dashboard</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background: #f8f9fa;
        color: #333;
        padding: 2rem;
        max-width: 600px;
        margin: 3rem auto;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
        background-image: linear-gradient(to right, #e0c3fc, #8ec5fc);
      }
      h1 {
        color: #2c3e50;
      }
      .info {
        margin-top: 1rem;
      }
      .label {
        font-weight: bold;
      }
      .btn {
        display: inline-block;
        margin: 1rem 0.5rem 0 0;
        padding: 0.6rem 1.2rem;
        background-color: #6c63ff;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: background 0.3s ease;
      }
      .btn:hover {
        background-color: #574b90;
      }
    </style>
  </head>
  <body>
    <h1>Welcome, ${name.split(" ")[0]}!</h1>
    <div class="info"><span class="label">Email:</span> ${email}</div>
    <div class="info"><span class="label">Role:</span> ${role}</div>
    ${buttons}
    <br />
    <a class="btn" href="/auth/logout">Logout</a>
  </body>
  </html>
`);
}
);

module.exports = router;