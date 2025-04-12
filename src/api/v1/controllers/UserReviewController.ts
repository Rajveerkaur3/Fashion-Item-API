import { Request, Response, NextFunction } from 'express';
import * as userReviewService from '../services/UserReviewService';
import { StatusCodes } from 'http-status-codes';
import { successResponse, errorResponse } from '../models/responseModel';

// Get all user reviews
export const getAllUserReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const reviews = await userReviewService.getAllUserReviews();
        res.status(StatusCodes.OK).json(successResponse(reviews, "User reviews retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Create a new user review
export const createUserReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newReview = await userReviewService.createUserReview(req.body);
        res.status(StatusCodes.CREATED).json(successResponse(newReview, "Review created successfully"));
    } catch (error) {
        next(error);
    }
};

// Get user review by ID
export const getUserReviewById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const review = await userReviewService.getUserReviewById(req.params.id);
        if (!review) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Review not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(review, "Review retrieved successfully"));
    } catch (error) {
        next(error);
    }
};

// Update a user review
export const updateUserReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedReview = await userReviewService.updateUserReview(req.params.id, req.body);
        if (!updatedReview) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Review not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(updatedReview, "Review updated successfully"));
    } catch (error) {
        next(error);
    }
};

// Delete a user review
export const deleteUserReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const success = await userReviewService.deleteUserReview(req.params.id);
        if (!success) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Review not found" });
            return;
        }
        res.status(StatusCodes.OK).json(successResponse(null, "Review deleted successfully"));
    } catch (error) {
        next(error);
    }
};
