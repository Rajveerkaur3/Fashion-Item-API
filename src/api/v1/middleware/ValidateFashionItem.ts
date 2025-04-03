// External library imports
import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

// FashionItem validation schema using Joi
export const fashionItemSchema: ObjectSchema = Joi.object({
  // Conditionally validate 'id' based on isUpdate flag
  id: Joi.alternatives().conditional("$isUpdate", {
    is: true,
    then: Joi.string().required().messages({
      "any.required": "Fashion Item ID is required on update",
      "string.empty": "Fashion Item ID cannot be empty",
    }),
    otherwise: Joi.forbidden(),
  }),

  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),

  category: Joi.string().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
  }),

  price: Joi.number().required().positive().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive value",
  }),

  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty",
  }),

  stockQuantity: Joi.number().required().positive().messages({
    "any.required": "Stock quantity is required",
    "number.base": "Stock quantity must be a number",
    "number.positive": "Stock quantity must be a positive value",
  }),

  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Generic validate function
export const validate = <T>(
  schema: ObjectSchema<T>,
  data: T,
  context?: object
): void => {
  const { error } = schema.validate(data, { abortEarly: false, context });
  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((x) => x.message).join(", ")}`
    );
  }
};

// Middleware function for fashion item validation
export const validateRequest = (schema: ObjectSchema, isUpdate = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = { ...req.body, ...req.params, ...req.query };
      validate(schema, data, { isUpdate }); // Pass isUpdate flag to schema
      next();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
};
