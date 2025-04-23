import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
// import dotenv from  "dotenv";
import { Express } from "express";

// make sure environment variables are loaded
// dotenv.config();

// get the server URL form environment variables or use a default
const serverURL = process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion Item API Documentation",
      version: "1.0.0",
      description: "API to manage fashion items, discounts, brands, and videos in the store"
    },
    tags: [ // Added tags for filtering
      { name: "Fashion Items", description: "Operations with fashion items" },
      { name: "Discounts", description: "Discount management" },
      { name: "Brands", description: "Brand operations" },
      { name: "Videos", description: "Video upload and management" }
    ],
    paths: {
      "/api/v1/fashion-items": {
        post: {
          tags: ["Fashion Items"], // Added tag
          summary: "Create a new fashion item",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/FashionItem"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Fashion item created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/FashionItem"
                  }
                }
              }
            }
          }
        },
        get: {
          tags: ["Fashion Items"], // Added tag
          summary: "Retrieve all fashion items",
          responses: {
            "200": {
              description: "A list of fashion items",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      fashion_items: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/FashionItem"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/v1/discounts": {
        post: {
          tags: ["Discounts"], // Added tag
          summary: "Create a new discount",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Discount"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Discount created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Discount"
                  }
                }
              }
            }
          }
        },
        get: {
          tags: ["Discounts"], // Added tag
          summary: "Retrieve all discounts",
          responses: {
            "200": {
              description: "A list of discounts",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      discounts: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Discount"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/v1/brands": {
        post: {
          tags: ["Brands"], // Added tag
          summary: "Create a new brand",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Brand"
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Brand created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Brand"
                  }
                }
              }
            }
          }
        },
        get: {
          tags: ["Brands"], // Added tag
          summary: "Retrieve all brands",
          responses: {
            "200": {
              description: "A list of brands",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      brands: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Brand"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/v1/videos/upload": {
        post: {
          tags: ["Videos"], // Added tag
          summary: "Upload a video",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  $ref: "#/components/schemas/UploadVideo"
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Video uploaded successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Video uploaded successfully 😊🔥"
                      },
                    }
                  }
                }
              }
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Invalid video file" }
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/api/v1/videos/{id}": {
        delete: {
          tags: ["Videos"], // Added tag
          summary: "Delete a video by ID",
          parameters: [
            {
              in: "path",
              name: "videoId",
              required: true,
              schema: { type: "string" },
              description: "ID of the video to delete"
            }
          ],
          responses: {
            "200": {
              description: "Video deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video deleted successfully" }
                    }
                  }
                }
              }
            },
            "404": {
              description: "Video not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Video not found" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        FashionItem: {
          type: "object",
          properties: {
            item_name: { type: "string", example: "Floral Dress" },
            brand: { type: "string", example: "Zara" },
            category: { type: "string", example: "Dress" },
            size: { type: "string", example: "M" },
            price: { type: "string", example: "49.99" },
            color: { type: "string", example: "Pink" }
          },
          required: ["item_name", "brand", "category", "size", "price", "color"]
        },
        Discount: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            percentage: { type: "string", example: "20%" },
            description: { type: "string", example: "Winter Sale" },
            startDate: { type: "string", example: "2025-12-01" },
            endDate: { type: "string", example: "2025-12-31" }
          },
          required: ["percentage", "description", "startDate", "endDate"]
        },
        Brand: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            name: { type: "string", example: "Zara" },
            country: { type: "string", example: "Spain" },
            establishedYear: { type: "string", example: "1975" },
            description: { type: "string", example: "A global fashion retailer" }
          },
          required: ["name", "country", "establishedYear", "description"]
        },
        UploadVideo: {
          type: "object",
          properties: {
            username: { type: "string", example: "john_doe" },
            itemId: { type: "string", example: "123" },
            uploadDate: { type: "string", example: "2025-04-10" },
            feedback: { type: "string", example: "Great material and color! 😊🔥" },
            file: {
              type: "string",
              format: "binary",
              description: "Video file to be uploaded"
            }
          },
          required: ["username", "itemId", "uploadDate", "file", "feedback"]
        },
        UserReview: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            username: { type: "string", example: "john_doe" },
            itemId: { type: "string", example: "12345" },
            rating: { type: "integer", example: 4 },
            comment: { type: "string", example: "Loved the fabric and fit!" },
            createdAt: { type: "string", example: "2025-04-10T12:00:00Z" }
          },
          required: ["username", "itemId", "rating", "comment"]
        }
      }
    }
  },
  "/api/v1/videos/filter/item/{itemId}": {
  get: {
    tags: ["Videos"], // Added tag
    summary: "Retrieve videos by item ID",
    parameters: [
      {
        in: "path",
        name: "itemId",
        required: true,
        schema: { type: "string" },
        description: "ID of the item to retrieve associated videos"
      }
    ],
    responses: {
      "200": {
        description: "A list of videos associated with the item ID",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                videos: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/UploadVideo"
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        description: "No videos found for the given item ID",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string", example: "No videos found for item ID" }
              }
            }
          }
        }
      }
    }
  }
},

servers: [
  {
      url: serverURL,
      description:
          process.env.NODE_ENV === "production"
          ? "Production Server" : "Local server"
  },
],
components: {
  securitySchemas: {
      bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
      },
  },
},
security: [
  {
      bearerAuth: [],
  }
],
// path to annotated files
apis: [
  "./src/api/v1/routes/*.ts",
  "./src/api/v1/controllers/*.ts",
  "./src/api/v1/models/*.ts"
] // PATH to the API docs and schemas
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      filter: true // This enables the filter/search box
    }
  }));
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
  return swaggerJsDoc(swaggerOptions);
}

