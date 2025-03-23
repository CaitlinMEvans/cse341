require("dotenv").config();
const express = require("express");
const { isProfessor } = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// This ensures the Google strategy is registered before any routes use it
require("./config/auth");

const characterRoutes = require("./routes/characterRoutes");
const spellRoutes = require("./routes/spellRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

// Middleware - Session & Passport (should be before routes)
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/characters", characterRoutes);
app.use("/api/spells", spellRoutes);
app.use("/auth", authRoutes);  // Auth Routes
app.use("/api", protectedRoutes);  // Protected Routes

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Swagger Setup
const PORT = process.env.PORT || 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// protecting so students cannot access the API
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
    "/api-docs",
    isProfessor, // Protect this route!
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));