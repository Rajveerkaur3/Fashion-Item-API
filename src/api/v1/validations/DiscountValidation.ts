import Joi, { ObjectSchema } from "joi";

export const discountSchema: ObjectSchema = Joi.object({
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

export const updateDiscountSchema: ObjectSchema = Joi.object({
  percentage: Joi.string().pattern(/^\d+(\.\d{1,2})?%$/).optional().messages({
    "string.pattern.base": "Discount percentage must be a valid percentage (e.g., '20%')",
  }),

  description: Joi.string().min(5).max(200).optional().messages({
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description cannot exceed 200 characters",
  }),

  startDate: Joi.date().iso().optional().messages({
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format (YYYY-MM-DD)",
  }),

  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional().messages({
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format (YYYY-MM-DD)",
    "date.greater": "End date must be greater than the start date",
  }),

  updatedAt: Joi.date().default(() => new Date()),
}).unknown(true);
