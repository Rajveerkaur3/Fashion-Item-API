import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import userReviewRoutes from '../src/api/v1/routes/UserReviewRoutes'; // Adjust the import path based on your project structure

import { Request, Response, NextFunction } from 'express';

// Mock controllers
jest.mock('../src/api/v1/controllers/UserReviewController', () => ({
  createUserReview: jest.fn((req, res) => res.status(201).json({ message: 'Review created' })),
  getAllUserReviews: jest.fn((req, res) => res.status(200).json([])),
  getUserReviewById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  updateUserReview: jest.fn((req, res) => res.status(200).json({ message: 'Review updated' })),
  deleteUserReview: jest.fn((req, res) => res.status(200).json({ message: 'Review deleted' })),
}));

// Mock middleware
jest.mock('../src/api/v1/middleware/ValidateUserReview', () => ({
  validateRequest: () => (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/reviews', userReviewRoutes);

describe('UserReview Routes', () => {
  it('should create a review', async () => {
    const response = await request(app)
      .post('/api/v1/reviews')
      .send({
        fashionItemId: 'item123',
        userName: 'JohnDoe',
        comment: 'Amazing quality and fit!',
        rating: '5',
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Review created');
  });

  it('should get all reviews', async () => {
    const response = await request(app).get('/api/v1/reviews');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a review by ID', async () => {
    const response = await request(app).get('/api/v1/reviews/123');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('123');
  });

  it('should update a review by ID', async () => {
    const response = await request(app)
      .put('/api/v1/reviews/123')
      .send({
        comment: 'Updated comment text.',
        rating: '4',
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review updated');
  });

  it('should delete a review by ID', async () => {
    const response = await request(app).delete('/api/v1/reviews/123');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review deleted');
  });
});
