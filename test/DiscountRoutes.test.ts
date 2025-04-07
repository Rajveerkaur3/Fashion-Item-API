import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import discountRoutes from '../src/api/v1/routes/Discountroutes'; 


import { Request, Response, NextFunction } from 'express';

// Mock controllers
jest.mock('../src/api/v1/controllers/DiscountController', () => ({
  createDiscount: jest.fn((req, res) => res.status(201).json({ message: 'Discount created' })),
  getAllDiscounts: jest.fn((req, res) => res.status(200).json([])),
  getDiscountById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  updateDiscount: jest.fn((req, res) => res.status(200).json({ message: 'Discount updated' })),
  deleteDiscount: jest.fn((req, res) => res.status(200).json({ message: 'Discount deleted' })),
}));

// Mock middleware
jest.mock('../src/api/v1/middleware/ValidateDiscount', () => ({
  validateRequest: () => (req: Request, res: Response, next: NextFunction) => next(),
}));

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/discounts', discountRoutes);

describe('Discount Routes', () => {
  it('should create a discount', async () => {
    const response = await request(app)
      .post('/api/v1/discounts')
      .send({
        percentage: '20%',
        description: 'Winter Sale',
        startDate: '2025-12-01',
        endDate: '2025-12-31'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Discount created');
  });

  it('should get all discounts', async () => {
    const response = await request(app).get('/api/v1/discounts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a discount by ID', async () => {
    const response = await request(app).get('/api/v1/discounts/123');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('123');
  });

  it('should update a discount by ID', async () => {
    const response = await request(app)
      .put('/api/v1/discounts/123')
      .send({
        percentage: '25%',
        description: 'Spring Sale',
        startDate: '2026-03-01',
        endDate: '2026-03-31'
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Discount updated');
  });

  it('should delete a discount by ID', async () => {
    const response = await request(app).delete('/api/v1/discounts/123');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Discount deleted');
  });
});
