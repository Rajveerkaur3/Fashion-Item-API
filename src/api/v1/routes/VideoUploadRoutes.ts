import express from 'express';
import { upload } from "../../../../config/multer.config";  
import { validateRequest } from "../middleware/ValidateUploadVideo";
import { videoUploadSchema, deleteVideoSchema } from "../validations/UploadVideoValidation";
import videoController from '../controllers/VideoUploadController'; // Default import

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

/**
 * @openapi
 * /api/v1/videos/filter/item/{itemId}:
 *   get:
 *     summary: Get videos by Item ID
 *     operationId: getVideosByItemId
 *     tags:
 *       - Videos
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         description: The item ID to filter videos by
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       '200':
 *         description: A list of videos filtered by item ID
 *       '404':
 *         description: No videos found for the provided item ID
 *       '500':
 *         description: Server error
 */

router.post(
  '/upload',
  upload.single('file'), 
  (req, res, next) => {
    console.log('Multer processed file:', req.file);
    console.log('Request body fields:', {
      username: req.body.username,
      itemId: req.body.itemId,
      uploadDate: req.body.uploadDate,
      feedback: req.body.feedback
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

router.get(
  '/filter/item/:itemId',
  videoController.getVideosByItemIdHandler
);

export default router;