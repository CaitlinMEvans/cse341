const express = require("express");
const router = express.Router();
const { getSpells, addSpell } = require("../controllers/spellController");

router.get("/", getSpells);
router.post("/", addSpell);

module.exports = router;
