const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
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
  
    return res.status(403).json({ message: "Access restricted to Professors and Headmasters only." });
  }
  
  function isHeadmaster(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "headmaster") {
      return next();
    }
      return res.status(403).json({ message: "Access restricted to the Headmaster" });
  }
  
  module.exports = {
    isAuthenticated,
    isProfessor,
    isHeadmaster
  };
  