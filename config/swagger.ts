import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion Item API Documentation",
      version: "1.0.0",
      description: "API to manage fashion items, discounts, and brands in the store"
    },
    paths: {
      // Existing paths for fashion items and discounts
      "/api/v1/fashion-items": {
        post: {
          summary: "Create a new fashion item",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["item_name", "brand", "category", "size", "price", "color"],
                  properties: {
                    item_name: { type: "string", example: "Floral Dress" },
                    brand: { type: "string", example: "Zara" },
                    category: { type: "string", example: "Dress" },
                    size: { type: "string", example: "M" },
                    price: { type: "string", example: "49.99" },
                    color: { type: "string", example: "Pink" }
                  }
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
      
      // Existing paths for discounts
      "/api/v1/discounts": {
        post: {
          summary: "Create a new discount",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["percentage", "description", "startDate", "endDate"],
                  properties: {
                    percentage: { type: "string", example: "20%" },
                    description: { type: "string", example: "Winter Sale" },
                    startDate: { type: "string", example: "2025-12-01" },
                    endDate: { type: "string", example: "2025-12-31" }
                  }
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
          summary: "Create a new brand",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "country", "establishedYear", "description"],
                  properties: {
                    name: { type: "string", example: "Zara" },
                    country: { type: "string", example: "Spain" },
                    establishedYear: { type: "string", example: "1975" },
                    description: { type: "string", example: "A global fashion retailer" }
                  }
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
      "/api/v1/brands/{id}": {
        get: {
          summary: "Retrieve a brand by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the brand"
            }
          ],
          responses: {
            "200": {
              description: "Brand found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Brand"
                  }
                }
              }
            },
            "404": {
              description: "Brand not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Brand not found"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          summary: "Update a brand by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the brand to update"
            }
          ],
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
            "200": {
              description: "Brand updated successfully",
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
        delete: {
          summary: "Delete a brand by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the brand to delete"
            }
          ],
          responses: {
            "200": {
              description: "Brand deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Brand deleted successfully."
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
    components: {
      schemas: {
        // Existing schemas for FashionItem and Discount
        FashionItem: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
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
        // New schema for Brand
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
        }
      }
    }
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/controllers/*.ts"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setSwagger;
