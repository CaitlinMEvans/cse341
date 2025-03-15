const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

// Ensure these files exist inside the "models" folder
const Character = require("./models/characterModel");
const Spell = require("./models/spellModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  });

const importData = async () => {
  try {
    console.log(" Importing Data...");

    // Load JSON files
    const charactersRaw = fs.readFileSync("hp-characters.json", "utf-8");
    const spellsRaw = fs.readFileSync("hp-spells.json", "utf-8");

    let characters = JSON.parse(charactersRaw);
    let spells = JSON.parse(spellsRaw);

    // Clear existing data
    await Character.deleteMany();
    await Spell.deleteMany();
    console.log("  Existing collections cleared.");

    // Ensure all spell fields are present
    spells = spells.map(spell => ({
      name: spell.name || "Unknown",
      effect: spell.description || "Unknown effect",
      type: spell.type || "Unknown type",
      incantation: spell.name || "Unknown incantation"
    }));

    // Insert data
    await Character.insertMany(characters);
    await Spell.insertMany(spells);

    console.log(` Successfully Imported ${characters.length} Characters`);
    console.log(` Successfully Imported ${spells.length} Spells`);
    
    process.exit();
  } catch (error) {
    console.error(" Error importing data:", error);
    process.exit(1);
  }
};

importData();
