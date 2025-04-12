import express, { Request, Response } from 'express';
import { upload } from "../../../../config/multer.config";  
import { validateRequest } from "../middleware/ValidateUploadVideo";
import { videoUploadSchema, deleteVideoSchema } from "../validations/UploadVideoValidation";
import * as videoController from '../controllers/VideoUploadController';

const router = express.Router();

/**
 * @openapi
 * /api/v1/videos/upload:
 *   post:
 *     summary: Upload a video
 *     operationId: uploadVideo
 *     tags:
 *       - Videos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - itemId
 *               - uploadDate
 *               - file
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               itemId:
 *                 type: string
 *                 example: "123"
 *               uploadDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               feedback:
 *                 type: string
 *                 example: "This video shows how the item performs in real life."
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Video uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     itemId:
 *                       type: string
 *                     feedback:
 *                       type: string
 *                     fileName:
 *                       type: string
 *                     filePath:
 *                       type: string
 *                     size:
 *                       type: number
 *                       example: 5242880
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "File processing failed"
 *                 details:
 *                   type: string
 *                   example: "File must be MP4/MOV and under 100MB"
 *       '413':
 *         description: File too large
 *       '500':
 *         description: Server error
 */

/**
 * @openapi
 * /api/v1/videos/{id}:
 *   delete:
 *     summary: Delete a video by ID
 *     operationId: deleteVideo
 *     tags:
 *       - Videos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the video to delete
 *         schema:
 *           type: string
 *           example: "video-123456789"
 *     responses:
 *       '200':
 *         description: Video deleted successfully
 *       '404':
 *         description: Video not found
 */

// Enhanced upload route with debugging
router.post(
  '/upload',
  upload.single('file'),  // File processing first
  (req, res, next) => {
    console.log('Multer processed file:', req.file);
    console.log('Request body fields:', {
      username: req.body.username,
      itemId: req.body.itemId,
      uploadDate: req.body.uploadDate,
      feedback: req.body.feedback  // New field
    });
    next();
  },
  validateRequest(videoUploadSchema),
  videoController.uploadVideo
);

router.delete(
  '/:id', 
  validateRequest(deleteVideoSchema), 
  videoController.deleteVideo
);

export default router;
