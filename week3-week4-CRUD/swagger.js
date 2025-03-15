const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Harry Potter API",
    description: "API for managing Harry Potter characters and spells",
    version: "1.0.0"
  },
  host: "cse341-6wo0.onrender.com", // Update with your Render URL
  basePath: "/",
  schemes: ["https"], // Use HTTPS when deployed
  definitions: {
    Character: {
      type: "object",
      properties: {
        name: { type: "string", example: "Harry Potter" },
        house: { type: "string", example: "Gryffindor" },
        wand: {
          type: "object",
          properties: {
            wood: { type: "string", example: "Holly" },
            core: { type: "string", example: "Phoenix feather" },
            length: { type: "number", example: 11 }
          }
        },
        patronus: { type: "string", example: "Stag" }
      }
    },
    Spell: {
      type: "object",
      properties: {
        name: { type: "string", example: "Expelliarmus" },
        effect: { type: "string", example: "Disarms opponent" },
        type: { type: "string", example: "Charm" },
        incantation: { type: "string", example: "Expelliarmus" }
      }
    }
  },
  paths: {
    "/api/characters": {
      get: { tags: ["Characters"], summary: "Get all characters" },
      post: {
        tags: ["Characters"],
        summary: "Add a new character",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Character data to be added",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ]
      }
    },
    "/api/characters/{id}": {
      put: {
        tags: ["Characters"],
        summary: "Update a character",
        consumes: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "body",
            description: "Updated character data",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ]
      },
      delete: {
        tags: ["Characters"],
        summary: "Delete a character",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }]
      }
    },
    "/api/spells": {
      get: { tags: ["Spells"], summary: "Get all spells" },
      post: {
        tags: ["Spells"],
        summary: "Add a new spell",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Spell data to be added",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ]
      }
    },
    "/api/spells/{id}": {
      put: {
        tags: ["Spells"],
        summary: "Update a spell",
        consumes: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "body",
            description: "Updated spell data",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ]
      },
      delete: {
        tags: ["Spells"],
        summary: "Delete a spell",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }]
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);