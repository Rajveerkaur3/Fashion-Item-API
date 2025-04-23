/** 
 * @openapi
 * components:
 *   schemas:
 *     UserReview:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user review
 *         fashionItemId:
 *           type: string
 *           description: The ID of the fashion item being reviewed
 *         userName:
 *           type: string
 *           description: The name of the user who left the review
 *         comment:
 *           type: string
 *           description: The review comment provided by the user
 *         rating:
 *           type: string
 *           description: The rating given by the user, represented as a string (e.g., "5")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 */
export interface UserReview {
  id: string;          // Review ID
  fashionItemId: string; // The ID of the fashion item being reviewed
  userName: string;     // The name of the user who left the review
  comment: string;      // The review comment provided by the user
  rating: string;       // Rating given by the user (1 to 5, stored as a string)
  createdAt: string;    // ISO date string representing when the review was created
}
