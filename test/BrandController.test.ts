import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// Mock the controller methods
jest.mock('../src/api/v1/controllers/FashionItemController', () => ({
  createFashionItem: jest.fn((req: Request, res: Response) => 
    res.status(StatusCodes.CREATED).json({ 
      message: 'Fashion item created',
      data: req.body 
    })),
  
  getAllFashionItems: jest.fn((req: Request, res: Response) => 
    res.status(StatusCodes.OK).json({ 
      message: 'Fashion items retrieved successfully',
      data: [] 
    })),
  
  getFashionItemById: jest.fn((req: Request, res: Response) => 
    res.status(StatusCodes.OK).json({ 
      message: 'Fashion item retrieved',
      data: { id: req.params.id } 
    })),
  
  updateFashionItem: jest.fn((req: Request, res: Response) => 
    res.status(StatusCodes.OK).json({ 
      message: 'Fashion item updated',
      data: req.body 
    })),
  
  deleteFashionItem: jest.fn((req: Request, res: Response) => 
    res.status(StatusCodes.OK).json({ 
      message: 'Fashion item deleted successfully' 
    })),
}));

// Mock validation middleware
jest.mock('../src/api/v1/middleware/ValidateFashionItem', () => ({
  validateRequest: jest.fn(() => 
    (req: Request, res: Response, next: NextFunction) => next())
}));

// Mock auth middleware
jest.mock('../src/api/v1/middleware/authenticate', () => 
  jest.fn((req: Request, res: Response, next: NextFunction) => next())
);

jest.mock('../src/api/v1/middleware/authorize', () => 
  jest.fn(() => (req: Request, res: Response, next: NextFunction) => next())
);

// Create test app
const createTestApp = () => {
  const app = express();
  app.use(bodyParser.json());
  
  const fashionItemRoutes = require('../src/api/v1/routes/FashionItemRoutes').default;
  app.use('/api/v1/fashion-items', fashionItemRoutes);
  
  // Fallback route for 404 testing
  app.use((req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).send();
  });

  return app;
};

describe('Fashion Item Routes', () => {
  let app: express.Express;

  beforeAll(() => {
    app = createTestApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/fashion-items', () => {
    it('should create a fashion item', async () => {
      const newItem = {
        item_name: 'Floral Dress',
        brand: 'Zara',
        category: 'Dress',
        size: 'M',
        price: 49.99,
        color: 'Pink'
      };

      const response = await request(app)
        .post('/api/v1/fashion-items')
        .send(newItem);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.message).toBe('Fashion item created');
      expect(response.body.data).toEqual(newItem);
    });
  });

  describe('GET /api/v1/fashion-items', () => {
    it('should get all fashion items', async () => {
      const response = await request(app).get('/api/v1/fashion-items');
      
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe('Fashion items retrieved successfully');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/fashion-items/:id', () => {
    it('should get a fashion item by ID', async () => {
      const itemId = '123';
      const response = await request(app).get(`/api/v1/fashion-items/${itemId}`);
      
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe('Fashion item retrieved');
      expect(response.body.data.id).toBe(itemId);
    });
  });

  describe('PUT /api/v1/fashion-items/:id', () => {
    it('should update a fashion item by ID', async () => {
      const itemId = '123';
      const updatedData = {
        item_name: 'Updated Dress',
        brand: 'H&M',
        price: 59.99
      };

      const response = await request(app)
        .put(`/api/v1/fashion-items/${itemId}`)
        .send(updatedData);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe('Fashion item updated');
      expect(response.body.data).toEqual(updatedData);
    });
  });

  describe('DELETE /api/v1/fashion-items/:id', () => {
    it('should delete a fashion item by ID', async () => {
      const itemId = '123';
      const response = await request(app).delete(`/api/v1/fashion-items/${itemId}`);
      
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe('Fashion item deleted successfully');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/v1/non-existent-route');
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
