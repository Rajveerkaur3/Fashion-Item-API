// src/config/swagger.ts

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";

// Define swagger options
const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fashion Item API Documentation",
            version: "1.0.0",
            description: "API to manage fashion items in the store"
        },
    },
    apis: ["./src/app.ts"], // Path to your API endpoints
};

// Initialize Swagger JSDoc object
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Setup Swagger UI endpoint
const setSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Export Swagger setup for use in app.ts
export default setSwagger;
