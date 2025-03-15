const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
  },
  host: "localhost:8080", // Change to Render URL when deployed
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"]; // Entry point where routes are defined

swaggerAutogen(outputFile, endpointsFiles);