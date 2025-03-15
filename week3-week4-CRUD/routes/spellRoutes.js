const express = require("express");
const router = express.Router();
const spellController = require("../controllers/spellController");

// Existing routes
router.get("/", spellController.getSpells);
router.post("/", spellController.addSpell);

// PUT route
router.put("/:id", spellController.updateSpell);

// DELETE route
router.delete("/:id", spellController.deleteSpell);

module.exports = router;
