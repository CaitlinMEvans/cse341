const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

// Ensure these files exist inside the "models" folder
const Character = require("./models/characterModel");
const Spell = require("./models/spellModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

const importData = async () => {
  try {
    const characters = JSON.parse(fs.readFileSync("hp-characters.json", "utf-8"));
    const spells = JSON.parse(fs.readFileSync("hp-spells.json", "utf-8"));

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
