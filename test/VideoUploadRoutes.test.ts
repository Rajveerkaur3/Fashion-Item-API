import request from 'supertest';
import express from 'express';
import videoRoutes from '../src/api/v1/routes/VideoUploadRoutes';

// Mock the controller methods
jest.mock('../src/api/v1/controllers/VideoUploadController', () => ({
  __esModule: true,
  default: {
    uploadVideo: jest.fn((req, res) => res.status(201).json({})),
    deleteVideo: jest.fn((req, res) => res.status(200).json({})),
    getVideosByItemIdHandler: jest.fn((req, res) => res.status(200).json({}))
  }
}));

const app = express();
app.use(express.json());
app.use('/api/v1/videos', videoRoutes);

describe('Video Routes', () => {

  it('DELETE /:id should return 200', async () => {
    const response = await request(app).delete('/api/v1/videos/123');
    expect(response.status).toBe(200);
  });

  it('GET /filter/item/:itemId should return 200', async () => {
    const response = await request(app).get('/api/v1/videos/filter/item/123');
    expect(response.status).toBe(200);
  });
});