const swaggerAutogen = require("swagger-autogen")();

const host = process.env.NODE_ENV === "production"
  ? "cse341-6wo0.onrender.com"
  : "localhost:8080"; // Uses localhost in development

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
  },
  host: host, // Dynamically set based on environment
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"]; // Entry point where routes are defined

swaggerAutogen(outputFile, endpointsFiles);