// External library imports
import Joi, { ObjectSchema, ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";

// UserReview validation schema using Joi
export const userReviewSchema: ObjectSchema = Joi.object({
  id: Joi.forbidden(),  // ID should be forbidden for the create operation

  fashionItemId: Joi.string().required().messages({
    "any.required": "Fashion Item ID is required",
    "string.empty": "Fashion Item ID cannot be empty",
  }),

  userName: Joi.string().min(3).max(100).required().messages({
    "any.required": "User name is required",
    "string.empty": "User name cannot be empty",
    "string.min": "User name must be at least 3 characters long",
    "string.max": "User name cannot exceed 100 characters",
  }),

  comment: Joi.string().max(500).required().messages({
    "any.required": "Comment is required",
    "string.empty": "Comment cannot be empty",
    "string.max": "Comment cannot exceed 500 characters",
  }),

  rating: Joi.string().valid("1", "2", "3", "4", "5").required().messages({
    "any.required": "Rating is required",
    "string.empty": "Rating cannot be empty",
    "any.only": "Rating must be one of the following values: 1, 2, 3, 4, 5",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Update validation schema (includes ID)
export const updateUserReviewSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Review ID is required for update",
    "string.empty": "Review ID cannot be empty",
  }),

  fashionItemId: Joi.string().optional(),
  userName: Joi.string().min(3).max(100).optional(),
  comment: Joi.string().max(500).optional(),
  rating: Joi.string().valid("1", "2", "3", "4", "5").optional(),

  createdAt: Joi.date().optional(),
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

// Middleware function for user review validation
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
