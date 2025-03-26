require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

require("./config/auth");
const characterRoutes = require("./routes/characterRoutes");
const spellRoutes = require("./routes/spellRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
const PORT = process.env.PORT; 

const corsOptions = {
  origin: "https://cse341-6wo0.onrender.com",
  credentials: true
};

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors(corsOptions));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/characters", characterRoutes);
app.use("/api/spells", spellRoutes);
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

// Swagger Docs
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { isProfessor } = require("./middleware/authMiddleware");

app.use("/api-docs", isProfessor, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});