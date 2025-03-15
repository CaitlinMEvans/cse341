const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

const Character = require("./models/characterModel");
const Spell = require("./models/spellModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const importData = async () => {
  try {
    let characters = JSON.parse(fs.readFileSync("hp-characters.json", "utf-8"));
    let spells = JSON.parse(fs.readFileSync("hp-spells.json", "utf-8"));

    // Ensure all spell fields are correctly mapped
    spells = spells.map(spell => ({
      name: spell.name || "Unknown",
      effect: spell.description || "Unknown effect",  // Map 'description' to 'effect'
      type: spell.type || "General Magic",  // Defaulting to a general type if missing
      incantation: spell.name || "Unknown incantation"  // Map 'name' to 'incantation'
    }));

    // Insert data
    await Character.insertMany(characters);
    await Spell.insertMany(spells);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();