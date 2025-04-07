import express from 'express';
import { validateRequest } from "../middleware/ValidateFashionItem";
import { fashionItemSchema } from "../validations/FashionItemValidation";
import * as fashionItemController from '../controllers/FashionItemController';
import { updateFashionItemSchema } from "../validations/FashionItemValidation";

const router = express.Router();

/**
 * @openapi
 * /api/v1/fashion-items:
 *   post:
 *     summary: Create a new fashion item
 *     operationId: createFashionItem
 *     tags:
 *       - Fashion Items
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
 *               item_name:
 *                 type: string
 *                 example: "Floral Dress"
 *               brand:
 *                 type: string
 *                 example: "Zara"
 *               category:
 *                 type: string
 *                 example: "Dress"
 *               size:
 *                 type: string
 *                 example: "M"
 *               price:
 *                 type: string
 *                 example: "49.99"
 *               color:
 *                 type: string
 *                 example: "Pink"
 *     responses:
 *       '201':
 *         description: Fashion item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */



/**
 * @openapi
 * /api/v1/fashion-items:
 *   get:
 *     summary: Retrieve all fashion items
 *     operationId: getAllFashionItems
 *     tags:
 *       - Fashion Items
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

/**
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   get:
 *     summary: Get a fashion item by ID
 *     operationId: getFashionItemById
 *     tags:
 *       - Fashion Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Fashion item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */

/**
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   put:
 *     summary: Update a fashion item
 *     operationId: updateFashionItem
 *     tags:
 *       - Fashion Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name:
 *                 type: string
 *                 example: "Floral Dress"
 *               brand:
 *                 type: string
 *                 example: "Zara"
 *               category:
 *                 type: string
 *                 example: "Dress"
 *               size:
 *                 type: string
 *                 example: "L"
 *               price:
 *                 type: string
 *                 example: "59.99"
 *               color:
 *                 type: string
 *                 example: "Pink"
 *     responses:
 *       '200':
 *         description: Fashion item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FashionItem'
 */

/**
 * @openapi
 * /api/v1/fashion-items/{id}:
 *   delete:
 *     summary: Delete a fashion item by ID
 *     operationId: deleteFashionItem
 *     tags:
 *       - Fashion Items
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the fashion item to delete
 *         schema:
 *           type: string
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

// Define the routes with validation
router.post('/', validateRequest(fashionItemSchema), fashionItemController.createFashionItem);
router.get('/', fashionItemController.getAllFashionItems);
router.get('/:id', fashionItemController.getFashionItemById);
router.put('/:id', validateRequest(updateFashionItemSchema), fashionItemController.updateFashionItem);
router.delete('/:id', fashionItemController.deleteFashionItem);

export default router;
