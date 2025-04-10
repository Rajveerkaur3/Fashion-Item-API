import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as discountService from '../services/DiscountService';
import { successResponse } from '../models/responseModel';

// Get all discounts
export const getAllDiscounts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const discounts = await discountService.getAllDiscounts();
        res.status(StatusCodes.OK).json(successResponse(discounts, "Discounts retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Create a new discount
export const createDiscount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { percentage, description, startDate, endDate } = req.body;
        if (!percentage || !description || !startDate || !endDate) {
            res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "All fields (percentage, description, startDate, endDate) are required" 
            });
            return;
        }

        const newDiscount = await discountService.createDiscount(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(newDiscount, "Discount created successfully"));
    } catch (error) {
        next(error);
    }
};

// Get a discount by ID
export const getDiscountById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const discount = await discountService.getDiscountById(req.params.id);
        if (!discount) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Discount not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(discount, "Discount retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Update a discount
export const updateDiscount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { percentage, description, startDate, endDate } = req.body;
        if (!percentage || !description || !startDate || !endDate) {
            res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "All fields (percentage, description, startDate, endDate) are required" 
            });
            return;
        }

        const updatedDiscount = await discountService.updateDiscount(req.params.id, req.body);
        if (!updatedDiscount) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Discount not found" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(updatedDiscount, "Discount updated successfully"));
    } catch (error) {
        next(error);
    }
};

// Delete a discount
export const deleteDiscount = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const success = await discountService.deleteDiscount(req.params.id);
        if (!success) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Discount not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(null, "Discount deleted successfully"));
    } catch (error) {
        next(error);
    }
};
