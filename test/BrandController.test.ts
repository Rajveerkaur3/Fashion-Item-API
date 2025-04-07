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
  import app from '../src/app';
  import { StatusCodes } from 'http-status-codes';
  
  // Mock data
  const mockBrand = {
    id: '1',
    name: 'Nike',
    country: 'USA',
    establishedYear: '1964',
    description: 'Global sportswear brand'
  };
  
  describe('Brand Controller', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('GET /api/v1/brands', () => {
      it('should get all brands', async () => {
        const response = await request(app).get('/api/v1/brands');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            country: expect.any(String)
          })
        ]));
      });
    });
  
    describe('POST /api/v1/brands', () => {
      it('should create a new brand', async () => {
        const newBrand = {
          name: 'Puma',
          country: 'Germany',
          establishedYear: '1948',
          description: 'Sporting goods manufacturer'
        };
  
        const response = await request(app)
          .post('/api/v1/brands')
          .send(newBrand);
  
        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body).toEqual({
          message: 'Brand created successfully',
          brand: expect.objectContaining(newBrand)
        });
      });
    });
  
    describe('GET /api/v1/brands/:id', () => {
      it('should get a brand by ID', async () => {
        const response = await request(app).get('/api/v1/brands/1');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toEqual(expect.objectContaining({
          id: '1',
          name: 'Nike'
        }));
      });
  
      it('should return 404 when brand not found', async () => {
        const response = await request(app).get('/api/v1/brands/9999');
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Brand with ID 9999 not found.');
      });
    });
  
    describe('PUT /api/v1/brands/:id', () => {
        it('should update a brand', async () => {
          const updatedData = {
            description: 'Updated description'
          };
      
          const response = await request(app)
            .put('/api/v1/brands/1')
            .send(updatedData);
      
          expect(response.status).toBe(StatusCodes.OK);
          expect(response.body).toEqual({
            message: 'Brand updated successfully',
            brand: expect.objectContaining({
              id: '1',
              description: 'Updated description',
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            })
          });
        });
      });
      
  
    describe('DELETE /api/v1/brands/:id', () => {
      it('should delete a brand', async () => {
        const response = await request(app).delete('/api/v1/brands/1');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Brand with ID 1 deleted successfully.');
      });
    });
  });