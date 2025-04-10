import Joi, { ObjectSchema } from "joi";

// UserReview creation validation schema
export const userReviewSchema: ObjectSchema = Joi.object({
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

// UserReview update validation schema (includes ID)
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
}).unknown(true);
