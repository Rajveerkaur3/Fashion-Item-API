import { Request, Response } from 'express';

// Sample in-memory store for discounts
let discounts = [
  {
    id: '1',
    percentage: '20%',
    description: 'Winter Sale',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    percentage: '15%',
    description: 'Summer Sale',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Create a new discount
export const createDiscount = (req: Request, res: Response) => {
  const { percentage, description, startDate, endDate } = req.body;

  const newDiscount = {
    id: (discounts.length + 1).toString(),
    percentage,
    description,
    startDate,
    endDate,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  discounts.push(newDiscount);
  res.status(201).json({
    message: 'Discount created successfully',
    discount: newDiscount,
  });
};

// Get all discounts
export const getAllDiscounts = (req: Request, res: Response) => {
  res.status(200).json(discounts);
};

// Get a discount by ID
export const getDiscountById = (req: Request, res: Response) => {
  const discountId = req.params.id;
  const discount = discounts.find((d) => d.id === discountId);

  if (!discount) {
    res.status(404).json({ message: `Discount with ID ${discountId} not found.` });
    return;
  }

  res.status(200).json(discount);
};

// Update a discount
export const updateDiscount = (req: Request, res: Response) => {
  const { id } = req.params;
  const { percentage, description, startDate, endDate } = req.body;
  const discountIndex = discounts.findIndex((d) => d.id === id);

  if (discountIndex === -1) {
    res.status(404).json({ message: `Discount with ID ${id} not found.` });
    return;
  }

  const updatedDiscount = {
    ...discounts[discountIndex],
    percentage,
    description,
    startDate,
    endDate,
    updatedAt: new Date(),
  };

  discounts[discountIndex] = updatedDiscount;
  res.status(200).json({
    message: 'Discount updated successfully',
    discount: updatedDiscount,
  });
};

// Delete a discount
export const deleteDiscount = (req: Request, res: Response) => {
  const { id } = req.params;
  const discountIndex = discounts.findIndex((d) => d.id === id);

  if (discountIndex === -1) {
    res.status(404).json({ message: `Discount with ID ${id} not found.` });
    return;
  }

  discounts.splice(discountIndex, 1);
  res.status(200).json({
    message: `Discount with ID ${id} deleted successfully.`,
  });
};