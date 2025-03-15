require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const characterRoutes = require("./routes/characterRoutes");
const spellRoutes = require("./routes/spellRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/characters", characterRoutes);
app.use("/api/spells", spellRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
