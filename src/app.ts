import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import multer from 'multer';
import path from "path";
const upload = multer({ dest: 'uploads/' });

// load the enviroment variables BEFORE your internal imports
dotenv.config();

// Import fashion item routes
import fashionItemRoutes from './api/v1/routes/FashionItemRoutes'; 
import discountRoutes from './api/v1/routes/Discountroutes'; 
import brandRoutes from './api/v1/routes/BrandRoutes';
import userReviewRoutes from './api/v1/routes/UserReviewRoutes';
import videoUploadRoutes from './api/v1/routes/VideoUploadRoutes';
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";


// Import Swagger setup
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler"; 

const app = express();

// helmet
app.use(helmet());

// cors
app.use(cors());

// For more specific CORS configuration:

app.use(cors({
  origin: ['https://yourappdomain.com', 'https://admin.yourappdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Setup Swagger for API documentation
setupSwagger(app);

// initialize morgan
app.use(morgan("combined"));

// ability to work with json request via body
app.use(express.json());
app.use(errorHandler)

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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);



app.get('/api/v1/fashion-items/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Fashion Item Example' });
});

// Error handling middleware should be the last piece of middleware
app.use(errorHandler);

export default app;
