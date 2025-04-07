import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import fashionItemRoutes from '../src/api/v1/routes/FashionItemRoutes';
import { Request, Response, NextFunction } from 'express';


// Mock controllers
jest.mock('../src/api/v1/controllers/FashionItemController', () => ({
  createFashionItem: jest.fn((req, res) => res.status(201).json({ message: 'Created' })),
  getAllFashionItems: jest.fn((req, res) => res.status(200).json([])),
  getFashionItemById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  updateFashionItem: jest.fn((req, res) => res.status(200).json({ message: 'Updated' })),
  deleteFashionItem: jest.fn((req, res) => res.status(200).json({ message: 'Deleted' })),
}));

// Mock middleware
jest.mock('../src/api/v1/middleware/ValidateFashionItem', () => ({
    validateRequest: () => (req: Request, res: Response, next: NextFunction) => next()
}));

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/fashion-items', fashionItemRoutes);

describe('Fashion Item Routes', () => {
  it('should create a fashion item', async () => {
    const response = await request(app)
      .post('/api/v1/fashion-items')
      .send({
        item_name: 'Floral Dress',
        brand: 'Zara',
        category: 'Dress',
        size: 'M',
        price: '49.99',
        color: 'Pink'
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Created');
  });

  it('should get all fashion items', async () => {
    const response = await request(app).get('/api/v1/fashion-items');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a fashion item by ID', async () => {
    const response = await request(app).get('/api/v1/fashion-items/123');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('123');
  });

  it('should update a fashion item by ID', async () => {
    const response = await request(app)
      .put('/api/v1/fashion-items/123')
      .send({
        item_name: 'Updated Dress',
        brand: 'H&M'
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Updated');
  });

  it('should delete a fashion item by ID', async () => {
    const response = await request(app).delete('/api/v1/fashion-items/123');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Deleted');
  });
});
