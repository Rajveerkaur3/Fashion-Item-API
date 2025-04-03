// Import morgon
import morgan from "morgan"; 

// import the express application and type defintion
import express, { Express } from "express";  

// import setupSwagger endpoint
import setupSwagger from "../config/swagger";  // Swagger setup for API documentation

// Initialize Express app
const app: Express = express();

// Initialize morgan for logging HTTP requests
app.use(morgan("combined"));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Setup Swagger API documentation
setupSwagger(app);

// Respond to the GET request at "/" with a welcome message
app.get("/", (req, res) => {
    res.send("Welcome to the Fashion Item API!");
});

// Example of an endpoint to retrieve all fashion items (GET /fashion-items)
/** 
  * @openapi
  * /fashion-items:
  *  get:
  *      summary: Retrieve all fashion items
  *      tags: [Fashion Items]
  *      responses:
  *          200:
  *              description: A list of all fashion items  
*/
app.get("/fashion-items", (req, res) => {
  res.json({
    fashion_items: [
      {
        id: 1,
        item_name: "Floral Dress",
        brand: "Zara",
        category: "Dress",
        size: "M",
        price: 49.99,
        color: "Pink"
      },
      {
        id: 2,
        item_name: "Leather Jacket",
        brand: "H&M",
        category: "Jacket",
        size: "L",
        price: 79.99,
        color: "Black"
      }
    ]
  });
});

// Example of an endpoint to retrieve a fashion item by ID (GET /fashion-items/{id})
/** 
  * @openapi
  * /fashion-items/{id}:
  *  get:
  *      summary: Retrieve a specific fashion item by ID
  *      tags: [Fashion Items]
  *      responses:
  *          200:
  *              description: A single fashion item
*/
app.get("/fashion-items/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    item_name: "Floral Dress",
    brand: "Zara",
    category: "Dress",
    size: "M",
    price: 49.99,
    color: "Pink"
  });
});

// Endpoint to create a new fashion item (POST /fashion-items)
/** 
  * @openapi
  * /fashion-items:
  *  post:
  *      summary: Add a new fashion item
  *      tags: [Fashion Items]
  *      responses:
  *          201:
  *              description: The newly created fashion item
*/
app.post("/fashion-items", (req, res) => {
  const { item_name, brand, category, size, price, color } = req.body;
  res.status(201).json({
    id: 3,  // This would be generated dynamically in a real database
    item_name,
    brand,
    category,
    size,
    price,
    color
  });
});

// Endpoint to update a fashion item's details (PUT /fashion-items/{id})
/** 
  * @openapi
  * /fashion-items/{id}:
  *  put:
  *      summary: Update a fashion item's details
  *      tags: [Fashion Items]
  *      responses:
  *          200:
  *              description: The updated fashion item
*/
app.put("/fashion-items/:id", (req, res) => {
  const { id } = req.params;
  const { item_name, brand, category, size, price, color } = req.body;
  res.json({
    id,
    item_name,
    brand,
    category,
    size,
    price,
    color
  });
});

// Endpoint to delete a fashion item (DELETE /fashion-items/{id})
/** 
  * @openapi
  * /fashion-items/{id}:
  *  delete:
  *      summary: Delete a fashion item
  *      tags: [Fashion Items]
  *      responses:
  *          200:
  *              description: Confirmation that the fashion item was deleted
*/
app.delete("/fashion-items/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Fashion item with ID ${id} deleted successfully.`
  });
});

// Export the app for testing purposes
export default app;
