import Joi, { ObjectSchema } from "joi";

// Brand creation validation schema
export const brandSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Brand name is required",
    "string.empty": "Brand name cannot be empty",
    "string.min": "Brand name must be at least 3 characters long",
    "string.max": "Brand name cannot exceed 100 characters",
  }),

  country: Joi.string().min(3).max(100).required().messages({
    "any.required": "Country of origin is required",
    "string.empty": "Country of origin cannot be empty",
    "string.min": "Country of origin must be at least 3 characters long",
    "string.max": "Country of origin cannot exceed 100 characters",
  }),

  establishedYear: Joi.string().length(4).pattern(/^\d{4}$/).required().messages({
    "any.required": "Year of establishment is required",
    "string.empty": "Year of establishment cannot be empty",
    "string.pattern.base": "Year of establishment must be a valid year (e.g., '2025')",
  }),

  description: Joi.string().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Brand update validation schema (includes ID)
export const updateBrandSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Brand ID is required for update",
    "string.empty": "Brand ID cannot be empty",
  }),

  name: Joi.string().min(3).max(100).optional().messages({
    "string.empty": "Brand name cannot be empty",
    "string.min": "Brand name must be at least 3 characters long",
    "string.max": "Brand name cannot exceed 100 characters",
  }),

  country: Joi.string().min(3).max(100).optional().messages({
    "string.empty": "Country of origin cannot be empty",
    "string.min": "Country of origin must be at least 3 characters long",
    "string.max": "Country of origin cannot exceed 100 characters",
  }),

  establishedYear: Joi.string().length(4).pattern(/^\d{4}$/).optional().messages({
    "string.empty": "Year of establishment cannot be empty",
    "string.pattern.base": "Year of establishment must be a valid year (e.g., '2025')",
  }),

  description: Joi.string().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  updatedAt: Joi.date().default(() => new Date()),
}).unknown(true);

