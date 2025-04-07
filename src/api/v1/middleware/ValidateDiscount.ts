// External library imports
import Joi, { ObjectSchema, ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

// Discount validation schema using Joi
export const discountSchema: ObjectSchema = Joi.object({
  id: Joi.forbidden(),  // ID should be forbidden for the create operation

  percentage: Joi.string().pattern(/^\d+(\.\d{1,2})?%$/).required().messages({
    "any.required": "Discount percentage is required",
    "string.empty": "Discount percentage cannot be empty",
    "string.pattern.base": "Discount percentage must be a valid percentage (e.g., '20%')",
  }),

  description: Joi.string().min(5).max(200).required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description cannot exceed 200 characters",
  }),

  startDate: Joi.date().iso().required().messages({
    "any.required": "Start date is required",
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format (YYYY-MM-DD)",
  }),

  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
    "any.required": "End date is required",
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format (YYYY-MM-DD)",
    "date.greater": "End date must be greater than the start date",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Update validation schema (includes ID)
export const updateDiscountSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Discount ID is required for update",
    "string.empty": "Discount ID cannot be empty",
  }),

  percentage: Joi.string().pattern(/^\d+(\.\d{1,2})?%$/).required().messages({
    "any.required": "Discount percentage is required",
    "string.empty": "Discount percentage cannot be empty",
    "string.pattern.base": "Discount percentage must be a valid percentage (e.g., '20%')",
  }),

  description: Joi.string().min(5).max(200).required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description cannot exceed 200 characters",
  }),

  startDate: Joi.date().iso().required().messages({
    "any.required": "Start date is required",
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format (YYYY-MM-DD)",
  }),

  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required().messages({
    "any.required": "End date is required",
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format (YYYY-MM-DD)",
    "date.greater": "End date must be greater than the start date",
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

// Middleware function for discount validation
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
  
