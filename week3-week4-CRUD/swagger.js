const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Harry Potter API",
    description: "API for managing Harry Potter characters and spells",
    version: "1.0.0"
  },
  host: "cse341-6wo0.onrender.com", // UPDATE THIS AFTER DEPLOYMENT
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
      get: {
        tags: ["Characters"],
        summary: "Get all characters",
        responses: {
          200: {
            description: "List of all characters"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      },
      post: {
        tags: ["Characters"],
        summary: "Add a new character",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "character",
            description: "Character object that needs to be added",
            required: true,
            schema: {
              $ref: "#/definitions/Character"
            }
          }
        ],
        responses: {
          201: {
            description: "Character created successfully"
          },
          400: {
            description: "Invalid input"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    },
    "/api/spells": {
      get: {
        tags: ["Spells"],
        summary: "Get all spells",
        responses: {
          200: {
            description: "List of all spells"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      },
      post: {
        tags: ["Spells"],
        summary: "Add a new spell",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "spell",
            description: "Spell object that needs to be added",
            required: true,
            schema: {
              $ref: "#/definitions/Spell"
            }
          }
        ],
        responses: {
          201: {
            description: "Spell created successfully"
          },
          400: {
            description: "Invalid input"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
