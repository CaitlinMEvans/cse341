const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Harry Potter API",
    description: "API for managing Harry Potter characters and spells",
    version: "1.0.0"
  },
  host: "cse341-6wo0.onrender.com",
  basePath: "/",
  schemes: ["https"],
  securityDefinitions: {
    OAuth2: {
      type: "oauth2",
      flow: "authorizationCode",
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: {
        "read:students": "Access student list",
        "read:professors": "Access professor list"
      }
    }
  },
  security: [{ OAuth2: ["read:students", "read:professors"] }],
  definitions: {
    Character: {
      name: "Harry Potter",
      alternate_names: ["The Boy Who Lived", "The Chosen One"],
      species: "human",
      gender: "male",
      house: "Gryffindor",
      dateOfBirth: "31-07-1980",
      yearOfBirth: 1980,
      wizard: true,
      ancestry: "half-blood",
      eyeColour: "green",
      hairColour: "black",
      patronus: "stag",
      hogwartsStudent: true,
      hogwartsStaff: false,
      actor: "Daniel Radcliffe",
      alternate_actors: [],
      alive: true,
      image: "https://ik.imagekit.io/hpapi/harry.jpg",
      wand: {
        wood: "holly",
        core: "phoenix tail feather",
        length: 11
      }
    },
    Spell: {
      name: "Expelliarmus",
      effect: "Disarms opponent",
      type: "Charm",
      incantation: "Expelliarmus"
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
      get: {
        tags: ["Characters"],
        summary: "Get a character by ID",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
        responses: {
          200: { description: "Character found" },
          404: { description: "Character not found" }
        }
      },
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
          200: { description: "Character deleted" },
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
      get: {
        tags: ["Spells"],
        summary: "Get a spell by ID",
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
        responses: {
          200: { description: "Spell found" },
          404: { description: "Spell not found" }
        }
      },
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
          200: { description: "Spell deleted" },
          404: { description: "Spell not found" }
        }
      }
    }
  }
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);