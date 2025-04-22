import express, { Router } from 'express';
import * as fashionItemController from '../controllers/FashionItemController';
import { validateRequest } from "../middleware/ValidateFashionItem";
import { fashionItemSchema, updateFashionItemSchema } from "../validations/FashionItemValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @route POST /
 * @description Create a new fashion item
 * @openapi
 * /api/v1/fashion-items:
 *   post:
 *     summary: Create a new fashion item
 *     operationId: createFashionItem
 *     tags: [Fashion Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_name
 *               - brand
 *               - category
 *               - size
 *               - price
 *               - color
 *             properties:
 *               item_name: { type: string, example: "Floral Dress" }
 *               brand: { type: string, example: "Zara" }
 *               category: { type: string, example: "Dress" }
 *               size: { type: string, example: "M" }
 *               price: { type: string, example: "49.99" }
 *               color: { type: string, example: "Pink" }
 *     responses:
 *       '201':
 *         description: Fashion item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */
router.post(
    '/',
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest(fashionItemSchema),
    fashionItemController.createFashionItem
);

/**
 * @route GET /
 * @description Retrieve all fashion items
 * @openapi
 * /api/v1/fashion-items:
 *   get:
 *     summary: Retrieve all fashion items
 *     operationId: getAllFashionItems
 *     tags: [Fashion Items]
 *     responses:
 *       '200':
 *         description: List of all fashion items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FashionItem'
 */
router.get('/', authenticate, fashionItemController.getAllFashionItems);

/**
 * @route GET /:id
 * @description Get a fashion item by ID
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   get:
 *     summary: Get a fashion item by ID
 *     operationId: getFashionItemById
 *     tags: [Fashion Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Fashion item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */
router.get('/:id', authenticate, fashionItemController.getFashionItemById);

/**
 * @route PUT /:id
 * @description Update a fashion item
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   put:
 *     summary: Update a fashion item
 *     operationId: updateFashionItem
 *     tags: [Fashion Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item to update
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name: { type: string, example: "Floral Dress" }
 *               brand: { type: string, example: "Zara" }
 *               category: { type: string, example: "Dress" }
 *               size: { type: string, example: "L" }
 *               price: { type: string, example: "59.99" }
 *               color: { type: string, example: "Pink" }
 *     responses:
 *       '200':
 *         description: Fashion item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */
router.put(
    '/:id',
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    validateRequest(updateFashionItemSchema),
    fashionItemController.updateFashionItem
);

/**
 * @route DELETE /:id
 * @description Delete a fashion item by ID
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   delete:
 *     summary: Delete a fashion item by ID
 *     operationId: deleteFashionItem
 *     tags: [Fashion Items]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item to delete
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Fashion item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fashion item deleted successfully."
 */
router.delete(
    '/:id',
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    fashionItemController.deleteFashionItem
);

export default router;
