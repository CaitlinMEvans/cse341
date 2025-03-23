const express = require("express");
const Character = require("../models/characterModel");
const { isAuthenticated, isProfessor, isHeadmaster } = require("../middleware/authMiddleware");

const router = express.Router();

// // Route 1: Professors can view students
// router.get("/hogwarts-students", isProfessor, async (req, res) => {
//   try {
//     const students = await Character.find({ hogwartsStudent: true });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving student list" });
//   }
// });

// // Route 2: Only Dumbledore (Headmaster) can view professors
// router.get("/hogwarts-professors", isHeadmaster, async (req, res) => {
//   try {
//     const professors = await Character.find({ hogwartsStaff: true });
//     res.json(professors);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving professor list" });
//   }
// });

router.get("/hogwarts-professors", isAuthenticated, async (req, res) => {
  try {
    const professors = await Character.find({ hogwartsStaff: true });
    res.json(professors);
  } catch (error) {
    console.error("❌ Error fetching professors:", error);
    res.status(500).json({ message: "Error retrieving professor list", error: error.message });
  }
});

router.get("/hogwarts-students", isProfessor, async (req, res) => {
  try {
    const students = await Character.find({ hogwartsStudent: true });
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ message: "Error retrieving student list", error: error.message });
  }
});


module.exports = router;
