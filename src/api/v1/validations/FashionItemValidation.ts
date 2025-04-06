import Joi, { ObjectSchema } from "joi";

export const fashionItemSchema: ObjectSchema = Joi.object({
  item_name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Fashion item name is required",
    "string.empty": "Fashion item name cannot be empty",
    "string.min": "Fashion item name must be at least 3 characters long",
    "string.max": "Fashion item name cannot exceed 100 characters",
  }),

  category: Joi.string().min(3).max(100).required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
    "string.min": "Category must be at least 3 characters long",
    "string.max": "Category cannot exceed 100 characters",
  }),

  price: Joi.number().positive().required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a valid number",
    "number.positive": "Price must be a positive number",
  }),

  description: Joi.string().min(10).max(500).optional().messages({
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
  }),

  brand: Joi.string().min(3).max(100).optional().messages({
    "string.empty": "Brand cannot be empty",
    "string.min": "Brand must be at least 3 characters long",
    "string.max": "Brand cannot exceed 100 characters",
  }),

  size: Joi.string().valid("S", "M", "L", "XL", "XXL").optional().messages({
    "string.empty": "Size cannot be empty",
    "any.only": "Size must be one of the following: S, M, L, XL, XXL",
  }),

  color: Joi.string().min(3).max(50).optional().messages({
    "string.empty": "Color cannot be empty",
    "string.min": "Color must be at least 3 characters long",
    "string.max": "Color cannot exceed 50 characters",
  }),

  stockQuantity: Joi.number().integer().min(0).optional().messages({
    "number.base": "Stock quantity must be a valid number",
    "number.integer": "Stock quantity must be an integer",
    "number.min": "Stock quantity cannot be negative",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});


export const updateFashionItemSchema: ObjectSchema = Joi.object({
  item_name: Joi.string().min(3).max(100).optional(),

  category: Joi.string().min(3).max(100).optional(),

  price: Joi.number().positive().optional(),

  description: Joi.string().min(10).max(500).optional(),

  brand: Joi.string().min(3).max(100).optional(),

  size: Joi.string().valid("S", "M", "L", "XL", "XXL").optional(),

  color: Joi.string().min(3).max(50).optional(),

  stockQuantity: Joi.number().integer().min(0).optional(),

  updatedAt: Joi.date().default(() => new Date()),

}).unknown(true); 

