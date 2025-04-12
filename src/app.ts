import express from "express";
import morgan from "morgan";
import multer from 'multer';
import path from "path";
const upload = multer({ dest: 'uploads/' });

// Import fashion item routes
import fashionItemRoutes from './api/v1/routes/FashionItemRoutes'; 
import discountRoutes from './api/v1/routes/Discountroutes'; 
import brandRoutes from './api/v1/routes/BrandRoutes';
import userReviewRoutes from './api/v1/routes/UserReviewRoutes';
import videoUploadRoutes from './api/v1/routes/VideoUploadRoutes';


// Import Swagger setup
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler"; 

const app = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Setup Swagger for API documentation
setupSwagger(app);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fashion Item API!");
});

// Registering routes for resources
app.use('/api/v1/fashion-items', fashionItemRoutes);
app.use('/api/v1/discounts', discountRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/reviews', userReviewRoutes);
app.use('/api/v1/videos', videoUploadRoutes);



app.get('/api/v1/fashion-items/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Fashion Item Example' });
});

// Error handling middleware should be the last piece of middleware
app.use(errorHandler);

export default app;
