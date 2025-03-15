const express = require("express");
const router = express.Router();
const { getCharacters, addCharacter } = require("../controllers/characterController");

router.get("/", getCharacters);
router.post("/", addCharacter);

module.exports = router;
