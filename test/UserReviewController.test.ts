jest.mock('../src/api/v1/services/UserReviewService', () => ({
    getAllUserReviews: jest.fn(),
    createUserReview: jest.fn(),
    getUserReviewById: jest.fn(),
    updateUserReview: jest.fn(),
    deleteUserReview: jest.fn(),
}));

import request from 'supertest';
import express, { Application } from 'express';
import userReviewRouter from '../src/api/v1/routes/UserReviewRoutes'; // Ensure the correct path for your routes
import * as userReviewService from '../src/api/v1/services/UserReviewService'; // Ensure the correct path for your service
import { StatusCodes } from 'http-status-codes';

jest.mock('../src/api/v1/services/UserReviewService');

const app: Application = express();
app.use(express.json());
app.use('/api/reviews', userReviewRouter);

describe('User Review Controller', () => {
    const mockReview = {
        id: '1',
        userId: 'user123',
        productId: 'product123',
        rating: 5,
        comment: 'Great product!',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/reviews - should return all reviews', async () => {
        (userReviewService.getAllUserReviews as jest.Mock).mockResolvedValue([mockReview]);

        const res = await request(app).get('/api/reviews');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.message).toBe('User reviews retrieved successfully');
        expect(res.body.data).toHaveLength(1);
    });

    test('GET /api/reviews/:id - should return review by ID', async () => {
        (userReviewService.getUserReviewById as jest.Mock).mockResolvedValue(mockReview);

        const res = await request(app).get('/api/reviews/1');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.data.id).toBe('1');
        expect(res.body.data.comment).toBe('Great product!');
    });

    test('GET /api/reviews/:id - should return 404 if review not found', async () => {
        (userReviewService.getUserReviewById as jest.Mock).mockResolvedValue(null);

        const res = await request(app).get('/api/reviews/99');

        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toBe('Review not found');
    });

    test('DELETE /api/reviews/:id - should delete a review', async () => {
        (userReviewService.deleteUserReview as jest.Mock).mockResolvedValue(true);

        const res = await request(app).delete('/api/reviews/1');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.message).toBe('Review deleted successfully');
    });

    test('DELETE /api/reviews/:id - should return 404 if review not found for deletion', async () => {
        (userReviewService.deleteUserReview as jest.Mock).mockResolvedValue(false); // Simulate review not found

        const res = await request(app).delete('/api/reviews/99');

        expect(res.status).toBe(StatusCodes.NOT_FOUND); // Expecting 404
        expect(res.body.message).toBe('Review not found');
    });
});
