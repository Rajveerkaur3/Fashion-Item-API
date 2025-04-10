import { Request, Response, NextFunction } from 'express';
import * as brandService from '../services/BrandService';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../models/responseModel';

// Get all brands
export const getAllBrands = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const brands = await brandService.getAllBrands();
        res.status(StatusCodes.OK).json(successResponse(brands, "Brands retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Create new brand
export const createBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newBrand = await brandService.createBrand(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(newBrand, "Brand created successfully"));
    } catch (error) {
        next(error);
    }
};

// Get brand by ID
export const getBrandById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const brand = await brandService.getBrandById(req.params.id);
        if (!brand) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Brand not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(brand, "Brand retrieved"));
    } catch (error) {
        next(error);
    }
};

// Update brand
export const updateBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, country, establishedYear, description } = req.body;
        if (!name || !country || !establishedYear || !description) {
            res.status(StatusCodes.BAD_REQUEST).json({ 
                message: "All fields (name, country, establishedYear, description) are required" 
            });
            return;
        }

        const updatedBrand = await brandService.updateBrand(req.params.id, req.body);
        if (!updatedBrand) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Brand not found" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(updatedBrand, "Brand updated"));
    } catch (error) {
        next(error);
    }
};

// Delete brand
export const deleteBrand = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const success = await brandService.deleteBrand(req.params.id);
        if (!success) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Brand not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(null, "Brand deleted successfully"));
    } catch (error) {
        next(error);
    }
};