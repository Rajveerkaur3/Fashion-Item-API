// External library imports
import Joi, { ObjectSchema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';

// Interface for Multer file object
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// Validation schema for video upload
export const videoUploadSchema: ObjectSchema = Joi.object({
  username: Joi.string().min(3).max(100).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot exceed 100 characters',
  }),

  itemId: Joi.string().min(3).max(100).required().messages({
    'any.required': 'Item ID is required',
    'string.empty': 'Item ID cannot be empty',
    'string.min': 'Item ID must be at least 3 characters long',
    'string.max': 'Item ID cannot exceed 100 characters',
  }),

  uploadDate: Joi.string().isoDate().required().messages({
    'any.required': 'Upload date is required',
    'string.empty': 'Upload date cannot be empty',
    'string.isoDate': 'Upload date must be a valid ISO date (YYYY-MM-DD)',
  }),

  feedback: Joi.string().min(3).max(500).required().messages({
    'any.required': 'Feedback is required',
    'string.empty': 'Feedback cannot be empty',
    'string.min': 'Feedback must be at least 3 characters long',
    'string.max': 'Feedback cannot exceed 500 characters',
  }),

  file: Joi.object({
    fieldname: Joi.string().valid('file').required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().valid('video/mp4', 'video/quicktime').required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(100 * 1024 * 1024).required()
  }).required().messages({
    'any.required': 'Video file is required',
    'object.base': 'Invalid file format',
    'object.missing': 'Video file must be provided',
    'string.valid': 'Fieldname must be "file"',
    'number.max': 'File size must be less than 100MB'
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Validation schema for video deletion
export const deleteVideoSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Video ID is required for deletion',
    'string.empty': 'Video ID cannot be empty',
  }),
});

// Generic validate function
export const validate = <T>(
  schema: ObjectSchema<T>,
  data: unknown,
  context?: object
): { error?: ValidationError } => {
  return schema.validate(data, {
    abortEarly: false,
    context,
    stripUnknown: true,
    allowUnknown: true
  });
};

// Fixed middleware function
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = { 
      ...req.body, 
      ...req.params, 
      ...req.query,
      file: req.file
    };

    const { error } = validate(schema, data);

    if (error) {
      const errorMessages = error.details.map(detail => {
        if (detail.path.includes('file')) {
          if (detail.type === 'any.required') return 'Video file is required';
          if (detail.type === 'number.max') return 'File size must be less than 100MB';
          if (detail.type === 'string.valid') return 'Only MP4 or MOV video formats are allowed';
        }
        return detail.message;
      });

      res.status(400).json({
        error: errorMessages.join(", "),
        details: error.details
      });
      return; // Just return without returning the response object
    }

    next();
  };
};

// File validation utility
export const validateFile = (file?: Express.Multer.File): { valid: true } | { error: string } => {
  const validTypes = ['video/mp4', 'video/quicktime'];
  const maxSize = 100 * 1024 * 1024;

  if (!file) {
    return { error: 'No file uploaded' };
  }
  if (!validTypes.includes(file.mimetype)) {
    return { error: 'Only MP4 or MOV video formats are allowed' };
  }
  if (file.size > maxSize) {
    return { error: 'File size exceeds 100MB limit' };
  }
  return { valid: true };
};
