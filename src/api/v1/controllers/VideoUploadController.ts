import { Request, Response, NextFunction } from 'express'; 
import * as videoService from '../services/VideoUploadService';  // Assuming you have a service for video handling
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../models/responseModel';

// Upload a video
export const uploadVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, itemId, uploadDate, feedback } = req.body; // Added feedback
        const file = req.file;

        if (!file) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Video file is required"
            });
            return;
        }

        const newVideo = await videoService.uploadVideo({ username, itemId, uploadDate, feedback, file }); // Pass feedback
        res.status(StatusCodes.CREATED).json(successResponse(newVideo, "Video uploaded successfully"));
    } catch (error) {
        next(error);
    }
};

// Delete a video
export const deleteVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const videoId = req.params.id;

        const success = await videoService.deleteVideo(videoId);
        if (!success) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Video not found" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(null, "Video deleted successfully"));
    } catch (error) {
        next(error);
    }
};
