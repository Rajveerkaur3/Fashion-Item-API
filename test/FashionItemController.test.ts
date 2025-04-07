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
import  app  from '../src/app'; // assuming your app is initialized here
import * as fashionItemService from '../src/api/v1/services/FashionItemService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../src/api/v1/services/FashionItemService');

describe('FashionItem Controller', () => {

    // Test for getting all fashion items
    it('should get all fashion items', async () => {
        // Mock the service call
        (fashionItemService.getAllFashionItems as jest.Mock).mockResolvedValue([
            { id: '1', item_name: 'Shirt', brand: 'BrandA', category: 'Clothing', size: 'M', price: 19.99, color: 'Red' }
        ]);

        const response = await request(app).get('/api/v1/fashion-items');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Fashion items retrieved successfully');
        expect(response.body.data).toHaveLength(1);
    });

    // Test for creating a fashion item
    it('should create a new fashion item', async () => {
        // Mock the service call
        const newItem = { item_name: 'Shirt', brand: 'BrandA', category: 'Clothing', size: 'M', price: 19.99, color: 'Red' };
        (fashionItemService.createFashionItem as jest.Mock).mockResolvedValue(newItem);

        const response = await request(app)
            .post('/api/v1/fashion-items')
            .send(newItem);

        expect(response.status).toBe(StatusCodes.CREATED);
        expect(response.body.message).toBe('Fashion item created');
        expect(response.body.data).toEqual(newItem);
    });

    // Test for getting a fashion item by ID
    it('should get a fashion item by ID', async () => {
        // Mock the service call
        const fashionItem = { id: '1', item_name: 'Shirt', brand: 'BrandA', category: 'Clothing', size: 'M', price: 19.99, color: 'Red' };
        (fashionItemService.getFashionItemById as jest.Mock).mockResolvedValue(fashionItem);

        const response = await request(app).get('/api/v1/fashion-items/1');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Fashion item retrieved');
        expect(response.body.data).toEqual(fashionItem);
    });

    // Test for updating a fashion item by ID
    it('should update a fashion item by ID', async () => {
        const updatedItem = { item_name: 'Shirt', brand: 'BrandA', category: 'Clothing', size: 'M', price: 19.99, color: 'Blue' };
        (fashionItemService.updateFashionItem as jest.Mock).mockResolvedValue(updatedItem);

        const response = await request(app)
            .put('/api/v1/fashion-items/1')
            .send(updatedItem);

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Fashion item updated');
        expect(response.body.data).toEqual(updatedItem);
    });

    // Test for deleting a fashion item by ID
    it('should delete a fashion item by ID', async () => {
        // Mock the service call
        (fashionItemService.deleteFashionItem as jest.Mock).mockResolvedValue(true);

        const response = await request(app).delete('/api/v1/fashion-items/1');
        
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Fashion item deleted successfully');
    });

    // Test for missing fashion item by ID (404 Not Found)
    it('should return 404 when fashion item not found', async () => {
        (fashionItemService.getFashionItemById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/api/v1/fashion-items/9999');
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Fashion item not found');
    });


});
