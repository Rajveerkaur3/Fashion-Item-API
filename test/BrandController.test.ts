import request from 'supertest';
import app from '../src/app'; // Assuming your app is initialized here
import { StatusCodes } from 'http-status-codes';

describe('Brand Controller', () => {
    // Test for getting all brands
    it('should get all brands', async () => {
      const mockBrands = [
        {
          id: '1',
          name: 'Nike',
          country: 'USA',
          establishedYear: '1964',
          description: 'Global sportswear and accessories brand',
        },
        {
          id: '2',
          name: 'Adidas',
          country: 'Germany',
          establishedYear: '1949',
          description: 'Internationally recognized sports brand',
        },
      ];
  
      // Send a GET request to fetch all brands
      const response = await request(app).get('/api/v1/brands');
  
      // Remove 'createdAt' and 'updatedAt' from both the actual response and the mock expected data
      const cleanResponse = response.body.map(({ createdAt, updatedAt, ...rest }: any) => rest);
      const cleanExpected = mockBrands;
  
      // Compare the cleaned response and expected data
      expect(response.status).toBe(StatusCodes.OK);
      expect(cleanResponse).toEqual(cleanExpected);  // Compare without 'createdAt' and 'updatedAt'
    });

  // Test for creating a brand
  it('should create a new brand', async () => {
    const newBrand = {
      name: 'Puma',
      country: 'Germany',
      establishedYear: '1948',
      description: 'Sporting goods manufacturer',
    };

    // Send a POST request to create a new brand
    const response = await request(app).post('/api/v1/brands').send(newBrand);

    // Clean the response by removing 'createdAt', 'updatedAt', and 'id' fields
    const { createdAt, updatedAt, id, ...cleanResponse } = response.body.brand;
    const cleanNewBrand = {
      name: 'Puma',
      country: 'Germany',
      establishedYear: '1948',
      description: 'Sporting goods manufacturer',
    };

    // Compare the cleaned response with the expected new brand data (without 'createdAt', 'updatedAt', and 'id')
    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('Brand created successfully');
    expect(cleanResponse).toEqual(cleanNewBrand);  // Compare without 'createdAt', 'updatedAt', and 'id'
  });

  // Test for getting a brand by ID
  it('should get a brand by ID', async () => {
    const brandId = '1';

    const expectedBrand = {
      id: '1',
      name: 'Nike',
      country: 'USA',
      establishedYear: '1964',
      description: 'Global sportswear and accessories brand',
    };

    const response = await request(app).get(`/api/v1/brands/${brandId}`);

    const { createdAt, updatedAt, ...cleanResponse } = response.body;
    const cleanExpectedBrand = { ...expectedBrand };

    expect(response.status).toBe(StatusCodes.OK);
    expect(cleanResponse).toEqual(cleanExpectedBrand);
  });

  // Test for updating a brand
  it('should update a brand by ID', async () => {
    const updatedBrand = {
      name: 'Nike',
      country: 'USA',
      establishedYear: '1964',
      description: 'Global sportswear and accessories brand - Updated',
    };

    // Assuming you're updating brand with ID '1'
    const brandId = 1;

    // Send a PUT request to update the brand
    const response = await request(app).put(`/api/v1/brands/${brandId}`).send(updatedBrand);

    // Clean the response by removing 'createdAt', 'updatedAt', and 'id' fields
    const { createdAt, updatedAt, id, ...cleanResponse } = response.body.brand;
    const cleanUpdatedBrand = {
      name: 'Nike',
      country: 'USA',
      establishedYear: '1964',
      description: 'Global sportswear and accessories brand - Updated',
    };

    // Compare the cleaned response with the expected updated brand data (without 'createdAt', 'updatedAt', and 'id')
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Brand updated successfully');
    expect(cleanResponse).toEqual(cleanUpdatedBrand);  // Compare without 'createdAt', 'updatedAt', and 'id'
  });
  
  // Test for deleting a brand by ID
  it('should delete a brand by ID', async () => {
    const brandId = '1';

    const response = await request(app).delete(`/api/v1/brands/${brandId}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Brand with ID 1 deleted successfully.');
  });

  // Test for missing brand by ID (404 Not Found)
  it('should return 404 when brand not found', async () => {
    const brandId = '9999'; // Non-existing brand ID
    const response = await request(app).get(`/api/v1/brands/${brandId}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(`Brand with ID ${brandId} not found.`);
  });

  // Test for updating a non-existing brand (404 Not Found)
  it('should return 404 when trying to update a brand that does not exist', async () => {
    const brandId = '9999'; // Non-existing brand ID
    const updatedBrand = {
      name: 'Non-Existing Brand',
      country: 'Unknown',
      establishedYear: '2025',
      description: 'This brand does not exist',
    };

    const response = await request(app)
      .put(`/api/v1/brands/${brandId}`)
      .send(updatedBrand);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(`Brand with ID ${brandId} not found.`);
  });

  // Test for deleting a non-existing brand (404 Not Found)
  it('should return 404 when trying to delete a brand that does not exist', async () => {
    const brandId = '9999'; // Non-existing brand ID
    const response = await request(app).delete(`/api/v1/brands/${brandId}`);

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body.message).toBe(`Brand with ID ${brandId} not found.`);
  });
});
