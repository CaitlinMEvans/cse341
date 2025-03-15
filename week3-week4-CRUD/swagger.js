const doc = {
    info: {
      title: "Harry Potter API",
      description: "API for managing Harry Potter characters and spells",
      version: "1.0.0"
    },
    host: "cse341-6wo0.onrender.com", // Update with your Render URL
    basePath: "/",
    schemes: ["https"], // Use HTTPS when deployed
    paths: {
      "/api/characters": {
        get: { tags: ["Characters"], summary: "Get all characters" },
        post: { tags: ["Characters"], summary: "Add a new character" }
      },
      "/api/characters/{id}": {
        put: {
          tags: ["Characters"],
          summary: "Update a character",
          parameters: [{ name: "id", in: "path", required: true, type: "string" }]
        },
        delete: {
          tags: ["Characters"],
          summary: "Delete a character",
          parameters: [{ name: "id", in: "path", required: true, type: "string" }]
        }
      },
      "/api/spells": {
        get: { tags: ["Spells"], summary: "Get all spells" },
        post: { tags: ["Spells"], summary: "Add a new spell" }
      },
      "/api/spells/{id}": {
        put: {
          tags: ["Spells"],
          summary: "Update a spell",
          parameters: [{ name: "id", in: "path", required: true, type: "string" }]
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