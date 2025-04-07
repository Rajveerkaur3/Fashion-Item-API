// External library imports
import Joi, { ObjectSchema, ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

// Brand validation schema using Joi
export const brandSchema: ObjectSchema = Joi.object({
  id: Joi.forbidden(),  // ID should be forbidden for the create operation

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

// Update validation schema (includes ID)
export const updateBrandSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Brand ID is required for update",
    "string.empty": "Brand ID cannot be empty",
  }),

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

// Generic validate function (returns validation result)
export const validate = <T>(
  schema: ObjectSchema<T>,
  data: unknown,
  context?: object
): { error?: ValidationError } => {
  return schema.validate(data, {
    abortEarly: false,
    context,
    stripUnknown: true, // Optional: removes unexpected fields
  });
};

// Middleware function for brand validation
export const validateRequest = (schema: ObjectSchema, isUpdate = false) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = validate(schema, data, { isUpdate });

    if (error) {
      res.status(400).json({
        error: error.details.map((detail) => detail.message).join(", "),
      });
      return; // Add this return to avoid continuing execution
    }

    next();
  };
};
