import { Request, Response, NextFunction } from 'express'; 
import * as videoService from '../services/VideoUploadService';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../models/responseModel';

// Upload a video
const uploadVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, itemId, uploadDate, feedback } = req.body;
        const file = req.file;

        if (!file) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "Video file is required"
            });
            return;
        }

        const newVideo = await videoService.uploadVideo({ username, itemId, uploadDate, feedback, file });
        res.status(StatusCodes.CREATED).json(successResponse(newVideo, "Video uploaded successfully"));
    } catch (error) {
        next(error);
    }
};

// Delete a video
const deleteVideo = async (
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

// Get videos by itemId
const getVideosByItemIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const itemId = req.params.itemId;

        const videos = await videoService.getVideosByItemId(itemId);
        if (!videos || videos.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "No videos found for this itemId" });
            return;
        }

        res.status(StatusCodes.OK).json(successResponse(videos, "Videos fetched successfully"));
    } catch (error) {
        next(error);
    }
};

// Export as both named and default exports
export {
    uploadVideo,
    deleteVideo,
    getVideosByItemIdHandler
};

export default {
    uploadVideo,
    deleteVideo,
    getVideosByItemIdHandler
};