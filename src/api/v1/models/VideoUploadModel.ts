import { Request } from 'express';

// Define the VideoUpload interface
export interface VideoUpload {  
  username: string;
  itemId: string;
  uploadDate: string;
  file: Express.Multer.File;
  feedback?: string;   
}
