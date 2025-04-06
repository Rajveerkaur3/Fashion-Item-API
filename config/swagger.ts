import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fashion Item API Documentation",
      version: "1.0.0",
      description: "API to manage fashion items and discounts in the store"
    },
    paths: {
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
      "/api/v1/fashion-items/{id}": {
        get: {
          summary: "Retrieve a fashion item by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the fashion item"
            }
          ],
          responses: {
            "200": {
              description: "Fashion item found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/FashionItem"
                  }
                }
              }
            },
            "404": {
              description: "Fashion item not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Fashion item not found"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          summary: "Update a fashion item by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the fashion item to update"
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/FashionItemUpdate"
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Fashion item updated successfully",
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
        delete: {
          summary: "Delete a fashion item by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the fashion item to delete"
            }
          ],
          responses: {
            "200": {
              description: "Fashion item deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Fashion item deleted successfully."
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
      "/api/v1/discounts/{id}": {
        get: {
          summary: "Retrieve a discount by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the discount"
            }
          ],
          responses: {
            "200": {
              description: "Discount found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Discount"
                  }
                }
              }
            },
            "404": {
              description: "Discount not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Discount not found"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          summary: "Update a discount by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the discount to update"
            }
          ],
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
            "200": {
              description: "Discount updated successfully",
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
        delete: {
          summary: "Delete a discount by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
              description: "ID of the discount to delete"
            }
          ],
          responses: {
            "200": {
              description: "Discount deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Discount deleted successfully."
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
        FashionItemUpdate: {
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
