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
  
      // Mock the response from the API
      const response = await request(app).get('/api/v1/discounts');
  
      // Since createdAt and updatedAt are dynamically generated, we'll filter them out for comparison
      const expectedDiscounts = mockDiscounts;
  
      // Remove createdAt and updatedAt from the response and expected discounts
      const cleanResponse = response.body.map(({ createdAt, updatedAt, ...rest }: any) => rest);
      const cleanExpected = expectedDiscounts;
  
      expect(response.status).toBe(StatusCodes.OK);
      expect(cleanResponse).toEqual(cleanExpected);  // Compare without 'createdAt' and 'updatedAt'
    });
  
    // Test for creating a discount
    describe('Discount Controller', () => {
        it('should create a new discount', async () => {
          const newDiscount: Discount = {
            id: '3',
            percentage: '10%',
            description: 'Spring Sale',
            startDate: '2025-03-01',
            endDate: '2025-03-31',
          };
      
          // Mock the API response for creating a discount
          const response = await request(app).post('/api/v1/discounts').send(newDiscount);
      
          // Remove the 'createdAt' and 'updatedAt' from the actual response and expected discount
          const { createdAt, updatedAt, ...cleanResponse } = response.body.discount;
          const cleanNewDiscount = { ...newDiscount };  // No need to modify the expected one if it has no createdAt/updatedAt
      
          expect(response.status).toBe(StatusCodes.CREATED);
          expect(response.body.message).toBe('Discount created successfully');
          expect(cleanResponse).toEqual(cleanNewDiscount);  // Compare without 'createdAt' and 'updatedAt'
        });
      });

    // Test for getting a discount by ID
    describe('Discount Controller', () => {
        it('should get a discount by ID', async () => {
          const discountId = '1';  // Replace with an actual discount ID from your database
      
          // Mock the expected discount (without 'createdAt' and 'updatedAt')
          const expectedDiscount: Discount = {
            id: '1',
            percentage: '20%',
            description: 'Winter Sale',
            startDate: '2025-12-01',
            endDate: '2025-12-31',
          };
      
          // Fetch the discount by ID
          const response = await request(app).get(`/api/v1/discounts/${discountId}`);
      
          // Remove the 'createdAt' and 'updatedAt' fields from both the response and expected discount
          const { createdAt, updatedAt, ...cleanResponse } = response.body;
          const cleanExpectedDiscount = { ...expectedDiscount };  // No need to modify the expected one
      
          expect(response.status).toBe(StatusCodes.OK);
          expect(cleanResponse).toEqual(cleanExpectedDiscount);  // Compare without 'createdAt' and 'updatedAt'
        });
      });


    // Test for deleting a discount by ID
    it('should delete a discount by ID', async () => {
        // Mock the deleteDiscount method to resolve to true (indicating successful deletion)
        (discountService.deleteDiscount as jest.Mock).mockResolvedValue(true);
    
        // Send the DELETE request to the appropriate endpoint
        const response = await request(app).delete('/api/v1/discounts/1');
        
        // Assert that the response status is 200 OK
        expect(response.status).toBe(StatusCodes.OK);
        
        // Assert that the response body contains the expected success message
        expect(response.body.message).toBe('Discount with ID 1 deleted successfully.');
    });
    

    // Test for missing discount by ID (404 Not Found)
    it('should return 404 when discount not found', async () => {
        (discountService.getDiscountById as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get('/api/v1/discounts/9999');
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount with ID 9999 not found.');
    });

    // Test for updating a non-existing discount (404 Not Found)
    it('should return 404 when trying to update a discount that does not exist', async () => {
        const updatedDiscount = { percentage: '30%', description: 'Black Friday Sale', startDate: '2025-11-27', endDate: '2025-11-29' };
        (discountService.updateDiscount as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .put('/api/v1/discounts/9999')
            .send(updatedDiscount);

        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount with ID 9999 not found.');
    });

    // Test for deleting a non-existing discount (404 Not Found)
    it('should return 404 when trying to delete a discount that does not exist', async () => {
        (discountService.deleteDiscount as jest.Mock).mockResolvedValue(false);

        const response = await request(app).delete('/api/v1/discounts/9999');
        
        expect(response.status).toBe(StatusCodes.NOT_FOUND);
        expect(response.body.message).toBe('Discount with ID 9999 not found.');
    });
});
