import express, { Request, Response } from 'express';
import { validateRequest } from "../middleware/ValidateBrand"; // Assuming you have a middleware for validation
import { brandSchema, updateBrandSchema } from "../validations/BrandValidation"; // Assuming you have a schema validation
import * as brandController from '../controllers/BrandController';  

const router = express.Router();

/**
 * @openapi
 * /api/v1/brands:
 *   post:
 *     summary: Create a new brand
 *     operationId: createBrand
 *     tags:
 *       - Brands
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - country
 *               - establishedYear
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nike"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               establishedYear:
 *                 type: string
 *                 example: "1964"
 *               description:
 *                 type: string
 *                 example: "Global sportswear and accessories brand"
 *     responses:
 *       '201':
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */

/**
 * @openapi
 * /api/v1/brands:
 *   get:
 *     summary: Retrieve all brands
 *     operationId: getAllBrands
 *     tags:
 *       - Brands
 *     responses:
 *       '200':
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */

/**
 * @openapi
 * /api/v1/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     operationId: getBrandById
 *     tags:
 *       - Brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */

/**
 * @openapi
 * /api/v1/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     operationId: updateBrand
 *     tags:
 *       - Brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Adidas"
 *               country:
 *                 type: string
 *                 example: "Germany"
 *               establishedYear:
 *                 type: string
 *                 example: "1949"
 *               description:
 *                 type: string
 *                 example: "Internationally recognized sports brand"
 *     responses:
 *       '200':
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */

/**
 * @openapi
 * /api/v1/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     operationId: deleteBrand
 *     tags:
 *       - Brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Brand deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Brand deleted successfully."
 */

// Define the routes with validation
router.post('/', validateRequest(brandSchema), brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.put('/:id', validateRequest(updateBrandSchema), brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

export default router;
