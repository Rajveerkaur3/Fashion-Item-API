import { Request, Response, NextFunction } from "express";
import { Multer } from "multer"; // Import the correct Multer type

// Extend the Request type to include the file property
export type RequestWithFile = Request & {
  file: Express.Multer.File; // Correct type for file uploaded using multer
};

// Middleware function type
export type MiddlewareFunction = (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => void;

// RequestBody type for general request data
export type RequestBody = Record<string, unknown>;

// RequestData type for more specific request handling
export type RequestData<T extends RequestBody = RequestBody> = {
  body: T;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
};
