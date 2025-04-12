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
  import app from '../src/app'; // assuming your app is initialized here
  import * as discountService from '../src/api/v1/services/DiscountService'; // If you have a discount service
  import { StatusCodes } from 'http-status-codes';
  import { Discount } from '../src/api/v1/models/DiscountModel'; 
  
  jest.mock('../src/api/v1/services/DiscountService'); // Mocking the discount service
  
  describe('Discount Controller', () => {
      // Test for getting all discounts
      it('should get all discounts', async () => {
          const mockDiscounts: Discount[] = [
              {
                  id: '1',
                  percentage: '20%',
                  description: 'Winter Sale',
                  startDate: '2025-12-01',
                  endDate: '2025-12-31',
              },
              {
                  id: '2',
                  percentage: '15%',
                  description: 'Summer Sale',
                  startDate: '2025-06-01',
                  endDate: '2025-06-30',
              },
          ];
  
          // Mock the service call
          (discountService.getAllDiscounts as jest.Mock).mockResolvedValue(mockDiscounts);
  
          // Mock the API response
          const response = await request(app).get('/api/v1/discounts');
      
          // Remove createdAt and updatedAt from the response and expected discounts
          const cleanResponse = response.body.data.map(({ createdAt, updatedAt, ...rest }: any) => rest);
          const cleanExpected = mockDiscounts;
      
          expect(response.status).toBe(StatusCodes.OK);
          expect(cleanResponse).toEqual(cleanExpected);  // Compare without 'createdAt' and 'updatedAt'
      });
  
      // Test for creating a discount
      it('should create a new discount', async () => {
          const newDiscount: Discount = {
              id: '3',
              percentage: '10%',
              description: 'Spring Sale',
              startDate: '2025-03-01',
              endDate: '2025-03-31',
          };
      
          // Mock the service call
          (discountService.createDiscount as jest.Mock).mockResolvedValue(newDiscount);
      
          // Mock the API response for creating a discount
          const response = await request(app).post('/api/v1/discounts').send(newDiscount);
      
          // Remove the 'createdAt' and 'updatedAt' from the actual response and expected discount
          const { createdAt, updatedAt, ...cleanResponse } = response.body.data;
          const cleanNewDiscount = { ...newDiscount };  // No need to modify the expected one if it has no createdAt/updatedAt
      
          expect(response.status).toBe(StatusCodes.CREATED);
          expect(response.body.message).toBe('Discount created successfully');
          expect(cleanResponse).toEqual(cleanNewDiscount);  // Compare without 'createdAt' and 'updatedAt'
      });
  
      // Test for getting a discount by ID
      it('should get a discount by ID', async () => {
          const discountId = '1';  // Replace with an actual discount ID from your database
      
          const expectedDiscount: Discount = {
              id: '1',
              percentage: '20%',
              description: 'Winter Sale',
              startDate: '2025-12-01',
              endDate: '2025-12-31',
          };
      
          // Mock the service call
          (discountService.getDiscountById as jest.Mock).mockResolvedValue(expectedDiscount);
      
          const response = await request(app).get(`/api/v1/discounts/${discountId}`);
      
          // Remove the 'createdAt' and 'updatedAt' fields from both the response and expected discount
          const { createdAt, updatedAt, ...cleanResponse } = response.body.data;
          const cleanExpectedDiscount = { ...expectedDiscount };  // No need to modify the expected one
      
          expect(response.status).toBe(StatusCodes.OK);
          expect(cleanResponse).toEqual(cleanExpectedDiscount);  // Compare without 'createdAt' and 'updatedAt'
      });
  
      // Test for deleting a discount by ID
      it('should delete a discount by ID', async () => {
        const discountId = '1';  // assuming this is the discount ID to be deleted
        (discountService.deleteDiscount as jest.Mock).mockResolvedValue(true);
    
        const response = await request(app).delete(`/api/v1/discounts/${discountId}`);
    
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body.message).toBe('Discount deleted successfully');  // Modify to match the actual error message
    });
    
  
      // Test for missing discount by ID (404 Not Found)
      it('should return 404 when discount not found', async () => {
        const discountId = '9999'; // the ID that doesn't exist in the database
        (discountService.getDiscountById as jest.Mock).mockResolvedValue(null);
    
        const response = await request(app).get(`/api/v1/discounts/${discountId}`);
    
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount not found');  // Modify to match the actual error message
    });
    
  
      // Test for updating a non-existing discount (404 Not Found)
      it('should return 404 when trying to update a discount that does not exist', async () => {
        const updatedDiscount = { percentage: '30%', description: 'Black Friday Sale', startDate: '2025-11-27', endDate: '2025-11-29' };
        (discountService.updateDiscount as jest.Mock).mockResolvedValue(null);
    
        const response = await request(app)
            .put('/api/v1/discounts/9999')
            .send(updatedDiscount);
    
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount not found');  // Update the expected message
    });
    
  
      // Test for deleting a non-existing discount (404 Not Found)
      it('should return 404 when trying to delete a discount that does not exist', async () => {
        (discountService.deleteDiscount as jest.Mock).mockResolvedValue(false);
    
        const response = await request(app).delete('/api/v1/discounts/9999');
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount not found');  // Update this line to match the controller's response
    });
    
  });
  