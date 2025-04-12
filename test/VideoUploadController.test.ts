jest.mock('../config/firebaseConfig', () => ({
    db: {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      where: jest.fn(),
    }
  }));


import request from 'supertest';
import express, { Application } from 'express';
import router from '../src/api/v1/routes/VideoUploadRoutes';
import * as videoService from '../src/api/v1/services/VideoUploadService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../src/api/v1/services/VideoUploadService');

const app: Application = express();
app.use(express.json());
app.use('/api/v1/videos', router);

describe('Video Upload Controller', () => {
    const mockVideo = {
        username: 'john_doe',
        itemId: '123',
        uploadDate: '2023-01-01',
        feedback: 'This video shows how the item performs in real life.',
        fileName: 'video.mp4',
        filePath: '/uploads/video.mp4',
        size: 5242880
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('DELETE /api/v1/videos/:id - should delete a video successfully', async () => {
        (videoService.deleteVideo as jest.Mock).mockResolvedValue(true);

        const res = await request(app).delete('/api/v1/videos/video-123456789');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.message).toBe('Video deleted successfully');
    });

    test('DELETE /api/v1/videos/:id - should return 404 if video not found', async () => {
        (videoService.deleteVideo as jest.Mock).mockResolvedValue(false);

        const res = await request(app).delete('/api/v1/videos/video-99');

        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toBe('Video not found');
    });
});
