import express from 'express';
import { validateRequest } from "../middleware/ValidateUserReview"; // Update with actual middleware file
import { userReviewSchema, updateUserReviewSchema } from "../validations/UserReviewValidation";
import * as userReviewController from '../controllers/UserReviewController';

const router = express.Router();

/**
 * @openapi
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new user review
 *     operationId: createUserReview
 *     tags:
 *       - UserReviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fashionItemId
 *               - userName
 *               - comment
 *               - rating
 *             properties:
 *               fashionItemId:
 *                 type: string
 *                 example: "item123"
 *               userName:
 *                 type: string
 *                 example: "JohnDoe"
 *               comment:
 *                 type: string
 *                 example: "Amazing quality and fit!"
 *               rating:
 *                 type: string
 *                 example: "5"
 *     responses:
 *       '201':
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReview'
 */

/**
 * @openapi
 * /api/v1/reviews:
 *   get:
 *     summary: Get all user reviews
 *     operationId: getAllUserReviews
 *     tags:
 *       - UserReviews
 *     responses:
 *       '200':
 *         description: List of user reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserReview'
 */

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     operationId: getUserReviewById
 *     tags:
 *       - UserReviews
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Review details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReview'
 */

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update a user review
 *     operationId: updateUserReview
 *     tags:
 *       - UserReviews
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Updated comment text."
 *               rating:
 *                 type: string
 *                 example: "4"
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReview'
 */

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a user review
 *     operationId: deleteUserReview
 *     tags:
 *       - UserReviews
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully."
 */

// Define routes
router.post('/', validateRequest(userReviewSchema), userReviewController.createUserReview);
router.get('/', userReviewController.getAllUserReviews);
router.get('/:id', userReviewController.getUserReviewById);
router.put('/:id', validateRequest(updateUserReviewSchema), userReviewController.updateUserReview);
router.delete('/:id', userReviewController.deleteUserReview);

export default router;
