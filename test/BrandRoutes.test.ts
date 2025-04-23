import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import brandRoutes from '../src/api/v1/routes/BrandRoutes'; // Adjust the import path if needed
import { Request, Response, NextFunction } from 'express';

// Mock controllers
jest.mock('../src/api/v1/controllers/BrandController', () => ({
  createBrand: jest.fn((req, res) => res.status(201).json({ message: 'Brand created' })),
  getAllBrands: jest.fn((req, res) => res.status(200).json([])),
  getBrandById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  updateBrand: jest.fn((req, res) => res.status(200).json({ message: 'Brand updated' })),
  deleteBrand: jest.fn((req, res) => res.status(200).json({ message: 'Brand deleted' })),
}));

// Mock validation middleware
jest.mock('../src/api/v1/middleware/ValidateBrand', () => ({
  validateRequest: () => (req: Request, res: Response, next: NextFunction) => next(),
}));

// Mock authentication middleware
jest.mock('../src/api/v1/middleware/authenticate', () => ({
  __esModule: true,
  default: (req: Request, res: Response, next: NextFunction) => next(),
}));

// Mock authorization middleware
jest.mock('../src/api/v1/middleware/authorize', () => ({
  __esModule: true,
  default: () => (req: Request, res: Response, next: NextFunction) => next(),
}));

// Setup app
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/brands', brandRoutes);

describe('Brand Routes', () => {
  it('should create a brand', async () => {
    const response = await request(app)
      .post('/api/v1/brands')
      .send({
        name: 'Nike',
        country: 'USA',
        establishedYear: '1964',
        description: 'Global sportswear and accessories brand',
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Brand created');
  });

  it('should get all brands', async () => {
    const response = await request(app).get('/api/v1/brands');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a brand by ID', async () => {
    const response = await request(app).get('/api/v1/brands/123');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('123');
  });

  it('should update a brand by ID', async () => {
    const response = await request(app)
      .put('/api/v1/brands/123')
      .send({
        name: 'Adidas',
        country: 'Germany',
        establishedYear: '1949',
        description: 'Internationally recognized sports brand',
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Brand updated');
  });

  it('should delete a brand by ID', async () => {
    const response = await request(app).delete('/api/v1/brands/123');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Brand deleted');
  });
});
