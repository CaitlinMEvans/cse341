const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (req.accepts("html")) {
    return res.status(401).send(`
      <h1>401 Unauthorized</h1>
      <p>You must be logged in to view this page.</p>
      <a href="/auth/google">Login with Google</a>
    `);
  }

  return res.status(401).json({ message: "Unauthorized access. Please log in." });
};

function isProfessor(req, res, next) {
  if (
    req.isAuthenticated() &&
    req.user &&
    (req.user.role === "professor" || req.user.role === "headmaster")
  ) {
    return next();
  }

  if (req.accepts("html")) {
    return res.status(403).send(`
      <h1>403 Forbidden</h1>
      <p>This page is restricted to Hogwarts faculty (Professors and Headmasters).</p>
      <a href="/auth/dashboard">Return to Dashboard</a>
    `);
  }

  return res.status(403).json({
    message: "Access restricted to Professors and Headmasters only."
  });
}

function isHeadmaster(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "headmaster") {
    return next();
  }

  if (req.accepts("html")) {
    return res.status(403).send(`
      <h1>403 Forbidden</h1>
      <p>This page is restricted to the Headmaster only.</p>
      <a href="/auth/dashboard">Return to Dashboard</a>
    `);
  }

  return res.status(403).json({
    message: "Access restricted to the Headmaster"
  });
}

module.exports = {
  isAuthenticated,
  isProfessor,
  isHeadmaster
};
