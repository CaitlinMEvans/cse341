const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Harry Potter Characters and Spells",
    description: "This DB / API is for managing Harry Potter characters and spells",
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
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "character",
            description: "Character object to be added",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ],
        responses: {
          201: { description: "Character added successfully" },
          400: { description: "Invalid request" }
        }
      }
    },
    "/api/characters/{id}": {
      put: {
        tags: ["Characters"],
        summary: "Update a character",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "character",
            description: "Updated character object",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ],
        responses: {
          200: { description: "Character updated successfully" },
          400: { description: "Invalid request" },
          404: { description: "Character not found" }
        }
      },
      delete: {
        tags: ["Characters"],
        summary: "Delete a character",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
        responses: {
          200: { description: "Character deleted successfully" },
          404: { description: "Character not found" }
        }
      }
    },
    "/api/spells": {
      get: { tags: ["Spells"], summary: "Get all spells" },
      post: {
        tags: ["Spells"],
        summary: "Add a new spell",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "spell",
            description: "Spell object to be added",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ],
        responses: {
          201: { description: "Spell added successfully" },
          400: { description: "Invalid request" }
        }
      }
    },
    "/api/spells/{id}": {
      put: {
        tags: ["Spells"],
        summary: "Update a spell",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "spell",
            description: "Updated spell object",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ],
        responses: {
          200: { description: "Spell updated successfully" },
          400: { description: "Invalid request" },
          404: { description: "Spell not found" }
        }
      },
      delete: {
        tags: ["Spells"],
        summary: "Delete a spell",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
        responses: {
          200: { description: "Spell deleted successfully" },
          404: { description: "Spell not found" }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);