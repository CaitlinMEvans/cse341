const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API for managing contacts",
  },
  host: "cse341-6wo0.onrender.com", // Render URL
  schemes: ["https"], // Use HTTPS
  definitions: {
    Contact: {
      firstName: "Example",
      lastName: "User",
      email: "example.user@example.com",
      favoriteColor: "Blue",
      birthday: "1990-01-01"
    }
  },
  paths: {
    "/contacts/": {
      post: {
        tags: ["Contacts"],
        summary: "Create a new contact",
        consumes: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
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
            name: "body",
            required: true,
            schema: {
              $ref: "#/definitions/Contact"
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
