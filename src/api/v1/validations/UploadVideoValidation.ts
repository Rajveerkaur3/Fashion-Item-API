import Joi, { ObjectSchema } from "joi";

// Video upload validation schema
export const videoUploadSchema: ObjectSchema = Joi.object({
  username: Joi.string().min(3).max(100).required().messages({
    "any.required": "Username is required",
    "string.empty": "Username cannot be empty",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 100 characters",
  }),

  itemId: Joi.string().min(3).max(100).required().messages({
    "any.required": "Item ID is required",
    "string.empty": "Item ID cannot be empty",
    "string.min": "Item ID must be at least 3 characters long",
    "string.max": "Item ID cannot exceed 100 characters",
  }),

  uploadDate: Joi.string().isoDate().required().messages({
    "any.required": "Upload date is required",
    "string.empty": "Upload date cannot be empty",
    "string.isoDate": "Upload date must be a valid ISO date format",
  }),

  feedback: Joi.string().min(3).max(500).required().messages({
    "any.required": "Feedback is required",
    "string.empty": "Feedback cannot be empty",
    "string.min": "Feedback must be at least 3 characters long",
    "string.max": "Feedback cannot exceed 500 characters",
  }),

  file: Joi.object().required().messages({
    "any.required": "Video file is required",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Video deletion validation schema (expects ID)
export const deleteVideoSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Video ID is required for deletion",
    "string.empty": "Video ID cannot be empty",
  }),
});
