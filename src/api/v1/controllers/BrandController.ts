import { Request, Response } from 'express';

// Sample in-memory store for brands
let brands = [
  {
    id: '1',
    name: 'Nike',
    country: 'USA',
    establishedYear: '1964',
    description: 'Global sportswear and accessories brand',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Adidas',
    country: 'Germany',
    establishedYear: '1949',
    description: 'Internationally recognized sports brand',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Create a new brand
export const createBrand = (req: Request, res: Response) => {
  const { name, country, establishedYear, description } = req.body;

  const newBrand = {
    id: (brands.length + 1).toString(),
    name,
    country,
    establishedYear,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  brands.push(newBrand);
  res.status(201).json({
    message: 'Brand created successfully',
    brand: newBrand,
  });
};

// Get all brands
export const getAllBrands = (req: Request, res: Response) => {
  res.status(200).json(brands);
};

// Get a brand by ID
export const getBrandById = (req: Request, res: Response) => {
  const brandId = req.params.id;
  const brand = brands.find((b) => b.id === brandId);

  if (!brand) {
    res.status(404).json({ message: `Brand with ID ${brandId} not found.` });
    return;
  }

  res.status(200).json(brand);
};

// Update a brand
export const updateBrand = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, country, establishedYear, description } = req.body;
  const brandIndex = brands.findIndex((b) => b.id === id);

  if (brandIndex === -1) {
    res.status(404).json({ message: `Brand with ID ${id} not found.` });
    return;
  }

  const updatedBrand = {
    ...brands[brandIndex],
    name,
    country,
    establishedYear,
    description,
    updatedAt: new Date(),
  };

  brands[brandIndex] = updatedBrand;
  res.status(200).json({
    message: 'Brand updated successfully',
    brand: updatedBrand,
  });
};

// Delete a brand
export const deleteBrand = (req: Request, res: Response) => {
  const { id } = req.params;
  const brandIndex = brands.findIndex((b) => b.id === id);

  if (brandIndex === -1) {
    res.status(404).json({ message: `Brand with ID ${id} not found.` });
    return;
  }

  brands.splice(brandIndex, 1);
  res.status(200).json({
    message: `Brand with ID ${id} deleted successfully.`,
  });
};
