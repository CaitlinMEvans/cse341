const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  };
  
  const isProfessor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "professor") {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: Professors only!" });
  };
  
  // function isHeadmaster(req, res, next) {
  //   if (
  //     req.isAuthenticated() &&
  //     req.user &&
  //     // req.user.email === "albus.dumbledore@hogwarts.edu"
  //     req.user.email === "eva16017@gmail.com"

  //   ) {
  //     return next();
  //   }
  
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
  