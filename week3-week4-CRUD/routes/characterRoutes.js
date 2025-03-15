const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

// Base routes
router.get("/", characterController.getCharacters);
router.post("/", characterController.addCharacter);

// PUT route
router.put("/:id", characterController.updateCharacter);

// DELETE route
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
