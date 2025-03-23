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
  // definitions: {
  //   Character: {
  //     name: "Harry Potter",
  //     alternate_names: ["The Boy Who Lived", "The Chosen One"],
  //     species: "human",
  //     gender: "male",
  //     house: "Gryffindor",
  //     dateOfBirth: "31-07-1980",
  //     yearOfBirth: 1980,
  //     wizard: true,
  //     ancestry: "half-blood",
  //     eyeColour: "green",
  //     hairColour: "black",
  //     patronus: "stag",
  //     hogwartsStudent: true,
  //     hogwartsStaff: false,
  //     actor: "Daniel Radcliffe",
  //     alternate_actors: [],
  //     alive: true,
  //     image: "https://ik.imagekit.io/hpapi/harry.jpg",
  //     wand: {
  //       wood: "holly",
  //       core: "phoenix tail feather",
  //       length: 11
  //     }
  //   },
  //   Spell: {
  //     name: "Expelliarmus",
  //     effect: "Disarms opponent",
  //     type: "Charm",
  //     incantation: "Expelliarmus"
  //   }
  // },
  definitions: {
    Character: {
      type: "object",
      properties: {
        name: { type: "string", example: "Harry Potter" },
        alternate_names: {
          type: "array",
          items: { type: "string" },
          example: ["The Boy Who Lived", "The Chosen One"]
        },
        species: { type: "string", example: "human" },
        gender: { type: "string", example: "male" },
        house: { type: "string", example: "Gryffindor" },
        dateOfBirth: { type: "string", example: "31-07-1980" },
        yearOfBirth: { type: "number", example: 1980 },
        wizard: { type: "boolean", example: true },
        ancestry: { type: "string", example: "half-blood" },
        eyeColour: { type: "string", example: "green" },
        hairColour: { type: "string", example: "black" },
        patronus: { type: "string", example: "stag" },
        hogwartsStudent: { type: "boolean", example: true },
        hogwartsStaff: { type: "boolean", example: false },
        actor: { type: "string", example: "Daniel Radcliffe" },
        alternate_actors: {
          type: "array",
          items: { type: "string" },
          example: []
        },
        alive: { type: "boolean", example: true },
        image: { type: "string", example: "https://ik.imagekit.io/hpapi/harry.jpg" },
        wand: {
          type: "object",
          properties: {
            wood: { type: "string", example: "holly" },
            core: { type: "string", example: "phoenix tail feather" },
            length: { type: "number", example: 11 }
          }
        }
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
            name: "character",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ],
        responses: {
          201: { description: "Character created" },
          400: { description: "Invalid character data" }
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
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "character",
            required: true,
            schema: { $ref: "#/definitions/Character" }
          }
        ],
        responses: {
          200: { description: "Character updated" },
          400: { description: "Invalid data" },
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
        parameters: [
          {
            in: "body",
            name: "spell",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ],
        responses: {
          201: { description: "Spell added" },
          400: { description: "Invalid spell data" }
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
        parameters: [
          { name: "id", in: "path", required: true, type: "string" },
          {
            in: "body",
            name: "spell",
            required: true,
            schema: { $ref: "#/definitions/Spell" }
          }
        ],
        responses: {
          200: { description: "Spell updated" },
          400: { description: "Invalid data" },
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
