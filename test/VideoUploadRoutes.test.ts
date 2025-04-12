import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import videoRoutes from '../src/api/v1/routes/VideoUploadRoutes'; // Adjust the import path if needed
import fs from 'fs';
import path from 'path';


// Mock controllers
jest.mock('../src/api/v1/controllers/VideoUploadController', () => ({
  uploadVideo: jest.fn((req: Request, res: Response) => {
    const { username, itemId, uploadDate, feedback } = req.body;
    const file = req.file;

    res.status(201).json({
      message: 'Video uploaded successfully',
      data: {
        username,
        itemId,
        feedback,
        fileName: file?.originalname,
        filePath: file?.path,
        size: file?.size,
      },
    });
  }),
  deleteVideo: jest.fn((req: Request, res: Response) => {
    const videoId = req.params.id;
    if (videoId) {
      res.status(200).json({ message: `Video with ID ${videoId} deleted successfully` });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  }),
}));

// Mock middleware
jest.mock('../src/api/v1/middleware/ValidateUploadVideo', () => ({
  validateRequest: () => (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/videos', videoRoutes);
  

  it('should delete a video by ID', async () => {
    const response = await request(app).delete('/api/v1/videos/video-123456789');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Video with ID video-123456789 deleted successfully');
  });

  it('should return 404 if video ID is missing during deletion', async () => {
    const response = await request(app).delete('/api/v1/videos/');
    expect(response.status).toBe(404);
  });

  



  
  
  
  

