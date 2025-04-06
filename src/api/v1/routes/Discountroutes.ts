import express, { Request, Response } from 'express';
import { validateRequest } from "../middleware/ValidateDiscount";
import { discountSchema, updateDiscountSchema } from "../validations/DiscountValidation";
import * as discountController from '../controllers/DiscountController';  

  

const router = express.Router();

/**
 * @openapi
 * /api/v1/discounts:
 *   post:
 *     summary: Create a new discount
 *     operationId: createDiscount
 *     tags:
 *       - Discounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - percentage
 *               - description
 *               - startDate
 *               - endDate
 *             properties:
 *               percentage:
 *                 type: string
 *                 example: "20%"
 *               description:
 *                 type: string
 *                 example: "Winter Sale"
 *               startDate:
 *                 type: string
 *                 example: "2025-12-01"
 *               endDate:
 *                 type: string
 *                 example: "2025-12-31"
 *     responses:
 *       '201':
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 */

/**
 * @openapi
 * /api/v1/discounts:
 *   get:
 *     summary: Retrieve all discounts
 *     operationId: getAllDiscounts
 *     tags:
 *       - Discounts
 *     responses:
 *       '200':
 *         description: List of all discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discount'
 */

/**
 * @openapi
 * /api/v1/discounts/{id}:
 *   get:
 *     summary: Get a discount by ID
 *     operationId: getDiscountById
 *     tags:
 *       - Discounts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the discount
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 */

/**
 * @openapi
 * /api/v1/discounts/{id}:
 *   put:
 *     summary: Update a discount
 *     operationId: updateDiscount
 *     tags:
 *       - Discounts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the discount to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               percentage:
 *                 type: string
 *                 example: "25%"
 *               description:
 *                 type: string
 *                 example: "Spring Sale"
 *               startDate:
 *                 type: string
 *                 example: "2026-03-01"
 *               endDate:
 *                 type: string
 *                 example: "2026-03-31"
 *     responses:
 *       '200':
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 */

/**
 * @openapi
 * /api/v1/discounts/{id}:
 *   delete:
 *     summary: Delete a discount by ID
 *     operationId: deleteDiscount
 *     tags:
 *       - Discounts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the discount to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Discount deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Discount deleted successfully."
 */

// Define the routes with validation
router.post('/', validateRequest(discountSchema), discountController.createDiscount);
router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.put('/:id', validateRequest(updateDiscountSchema), discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);


export default router;
