// const express = require("express");
// const { ObjectId } = require("mongodb");
// const Spell = require("../models/spellModel");
// const router = express.Router();

// // GET all spells
// router.get("/", async (req, res) => {
//   try {
//     const spells = await Spell.find();
//     res.json(spells);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving spells" });
//   }
// });

// // GET a single spell by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const spell = await Spell.findById(req.params.id);

//     if (!spell) {
//       return res.status(404).json({ message: "Spell not found" });
//     }

//     res.json(spell);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving spell" });
//   }
// });

// // POST a new spell
// router.post("/", async (req, res) => {
//   try {
//     const newSpell = new Spell({
//       name: req.body.name || "Unknown",
//       effect: req.body.effect || "Unknown effect",
//       type: req.body.type || "Unknown type",
//       incantation: req.body.incantation || "Unknown incantation"
//     });

//     const savedSpell = await newSpell.save();
//     res.status(201).json(savedSpell);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding spell" });
//   }
// });

// // PUT (Update) a spell by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedSpell = await Spell.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name || "Unknown",
//         effect: req.body.effect || "Unknown effect",
//         type: req.body.type || "Unknown type",
//         incantation: req.body.incantation || "Unknown incantation"
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSpell) {
//       return res.status(404).json({ message: "Spell not found" });
//     }

//     res.json(updatedSpell);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating spell" });
//   }
// });

// // DELETE a spell by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedSpell = await Spell.findByIdAndDelete(req.params.id);

//     if (!deletedSpell) {
//       return res.status(404).json({ message: "Spell not found" });
//     }

//     res.json({ message: "Spell deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error deleting spell" });
//   }
// });

// module.exports = router;

const express = require("express");
const Spell = require("../models/spellModel");
const router = express.Router();

// GET all spells
router.get("/", async (req, res) => {
  try {
    const spells = await Spell.find();
    res.json(spells);
  } catch (error) {
    console.error("❌ Error retrieving spells:", error);
    res.status(500).json({ message: "Error retrieving spells" });
  }
});

// GET a single spell by ID
router.get("/:id", async (req, res) => {
  try {
    const spell = await Spell.findById(req.params.id);

    if (!spell) {
      return res.status(404).json({ message: "Spell not found" });
    }

    res.json(spell);
  } catch (error) {
    console.error("❌ Error retrieving spell:", error);
    res.status(500).json({ message: "Error retrieving spell" });
  }
});

// POST a new spell
router.post("/", async (req, res) => {
  try {
    const newSpell = new Spell(req.body);
    const savedSpell = await newSpell.save();
    res.status(201).json(savedSpell);
  } catch (error) {
    console.error("❌ Validation or creation error:", error);

    if (error.name === "ValidationError") {
      const validationMessages = Object.values(error.errors).map(
        err => err.message
      );
      return res.status(400).json({
        message: "Spell validation failed",
        errors: validationMessages
      });
    }

    res.status(500).json({ message: "Error adding spell" });
  }
});

// PUT (Update) a spell by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSpell = await Spell.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSpell) {
      return res.status(404).json({ message: "Spell not found" });
    }

    res.json(updatedSpell);
  } catch (error) {
    console.error("❌ Error updating spell:", error);

    if (error.name === "ValidationError") {
      const validationMessages = Object.values(error.errors).map(
        err => err.message
      );
      return res.status(400).json({
        message: "Spell update failed due to validation errors",
        errors: validationMessages
      });
    }

    res.status(500).json({ message: "Error updating spell" });
  }
});

// DELETE a spell by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSpell = await Spell.findByIdAndDelete(req.params.id);

    if (!deletedSpell) {
      return res.status(404).json({ message: "Spell not found" });
    }

    res.json({ message: "Spell deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting spell:", error);
    res.status(500).json({ message: "Error deleting spell" });
  }
});

module.exports = router;
