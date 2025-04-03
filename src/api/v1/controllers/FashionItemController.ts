import { Request, Response, NextFunction } from "express";
import * as fashionItemService from "../services/fashionItemService";
import { FashionItem } from '../models/FashionItemModel';
import { StatusCodes } from "http-status-codes"; 
import { successResponse } from "../models/responseModel"; 

// Get all fashion items
export const getAllFashionItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const fashionItems: FashionItem[] = await fashionItemService.getAllFashionItems();
        res.status(StatusCodes.OK).json(successResponse(fashionItems, "Fashion items retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Create a new fashion item
export const createFashionItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newFashionItem = await fashionItemService.createFashionItem(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(newFashionItem, "Fashion item created"));
    } catch (error) {
        next(error);
    }
};

// Get a fashion item by ID
export const getFashionItemById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const fashionItem = await fashionItemService.getFashionItemById(req.params.id);
        if (!fashionItem) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Fashion item not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(fashionItem, "Fashion item retrieved"));
    } catch (error) {
        next(error);
    }
};

// Update a fashion item by ID
export const updateFashionItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Validate request body
        const { item_name, brand, category, size, price, color } = req.body;
        if (!item_name || !brand || !category || !size || !price || !color) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields (item_name, brand, category, size, price, color) are required" });
            return;
        }

        // Validate fashion item ID
        const fashionItemId = req.params.id;
        if (!fashionItemId) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid fashion item ID" });
            return;
        }

        const updatedFashionItem: FashionItem | null = await fashionItemService.updateFashionItem(req.params.id, req.body);
        if (!updatedFashionItem) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Fashion item not found" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(updatedFashionItem, "Fashion item updated"));
    } catch (error) {
        next(error);
    }
};

// Delete a fashion item by ID
export const deleteFashionItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Validate fashion item ID
        const fashionItemId = req.params.id;
        if (!fashionItemId) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid fashion item ID" });
            return;
        }

        const deletedFashionItem = await fashionItemService.deleteFashionItem(fashionItemId);
        if (!deletedFashionItem) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Fashion item not found" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(null, "Fashion item deleted successfully"));
    } catch (error) {
        next(error);
    }
};
