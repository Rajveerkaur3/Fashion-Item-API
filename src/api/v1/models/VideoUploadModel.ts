/** 
 * @openapi
 * components:
 *   schemas:
 *     VideoUpload:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the person uploading the video
 *         itemId:
 *           type: string
 *           description: The ID of the item associated with the video
 *         uploadDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the video was uploaded
 *         file:
 *           type: string
 *           format: binary
 *           description: The uploaded video file
 *         feedback:
 *           type: string
 *           description: Optional feedback about the video upload
 */
export interface VideoUpload {
  username: string;      // The username of the person uploading the video
  itemId: string;        // The ID of the item associated with the video
  uploadDate: string;    // ISO date-time string representing when the video was uploaded
  file: Express.Multer.File; // The uploaded video file
  feedback?: string;     // Optional feedback about the video upload
}
