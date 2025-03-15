const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
    version: "1.0.0"
  },
  host: "cse341-6wo0.onrender.com", // Your deployed host
  basePath: "/",
  schemes: ["https"], // Ensure HTTPS for deployment
  definitions: {
    Contact: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "John" },
        lastName: { type: "string", example: "Doe" },
        email: { type: "string", example: "johndoe@example.com" },
        favoriteColor: { type: "string", example: "Blue" },
        birthday: { type: "string", example: "1990-01-01" }
      }
    },
    UpdateContact: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "Updated First Name" },
        lastName: { type: "string", example: "Updated Last Name" },
        email: { type: "string", example: "updated.email@example.com" },
        favoriteColor: { type: "string", example: "Green" },
        birthday: { type: "string", example: "1995-05-05" }
      }
    }
  },
  paths: {
    "/contacts/": {
      post: {
        tags: ["Contacts"],
        summary: "Create a new contact",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "contact",
            description: "Contact object that needs to be added",
            required: true,
            schema: {
              $ref: "#/definitions/Contact"
            }
          }
        ],
        responses: {
          201: {
            description: "Contact created successfully"
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
    "/contacts/{id}": {
      put: {
        tags: ["Contacts"],
        summary: "Update an existing contact",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "Contact ID to update"
          },
          {
            in: "body",
            name: "contact",
            description: "Updated contact object",
            required: true,
            schema: {
              $ref: "#/definitions/UpdateContact"
            }
          }
        ],
        responses: {
          200: {
            description: "Contact updated successfully"
          },
          404: {
            description: "Contact not found"
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