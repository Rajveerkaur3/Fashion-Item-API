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
import router from '../src/api/v1/routes/BrandRoutes';
import * as brandService from '../src/api/v1/services/BrandService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../src/api/v1/services/BrandService');

const app: Application = express();
app.use(express.json());
app.use('/api/brands', router);

describe('Brand Controller', () => {
    const mockBrand = {
        id: '1',
        name: 'Nike',
        country: 'USA',
        establishedYear: 1964,
        description: 'Sportswear brand'
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/brands - should return all brands', async () => {
        (brandService.getAllBrands as jest.Mock).mockResolvedValue([mockBrand]);

        const res = await request(app).get('/api/brands');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.message).toBe('Brands retrieved successfully');
        expect(res.body.data).toHaveLength(1);
    });

    test('GET /api/brands/:id - should return brand by ID', async () => {
        (brandService.getBrandById as jest.Mock).mockResolvedValue(mockBrand);

        const res = await request(app).get('/api/brands/1');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.data.name).toBe('Nike');
    });

    test('GET /api/brands/:id - should return 404 if brand not found', async () => {
        (brandService.getBrandById as jest.Mock).mockResolvedValue(null);

        const res = await request(app).get('/api/brands/99');

        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toBe('Brand not found');
    });

    test('DELETE /api/brands/:id - should delete a brand', async () => {
        (brandService.deleteBrand as jest.Mock).mockResolvedValue(true);

        const res = await request(app).delete('/api/brands/1');

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.message).toBe('Brand deleted successfully');
    });

    test('DELETE /api/brands/:id - should return 404 if brand not found', async () => {
        (brandService.deleteBrand as jest.Mock).mockResolvedValue(false);

        const res = await request(app).delete('/api/brands/99');

        expect(res.status).toBe(StatusCodes.NOT_FOUND);
        expect(res.body.message).toBe('Brand not found');
    });
});
