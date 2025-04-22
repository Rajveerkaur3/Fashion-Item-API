import express, { Router } from 'express';
import * as brandController from '../controllers/BrandController';
import { validateRequest } from "../middleware/ValidateBrand"; 
import { brandSchema, updateBrandSchema } from "../validations/BrandValidation"; 
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize"; 

const router: Router = express.Router();

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
router.post(
  '/',
  authenticate, 
  isAuthorized({ hasRole: ['admin'] }),
  validateRequest(brandSchema), 
  brandController.createBrand
);

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
router.get('/', authenticate, brandController.getAllBrands);

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
router.get('/:id', authenticate, brandController.getBrandById);

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
router.put(
  '/:id',
  authenticate, 
  isAuthorized({ hasRole: ['admin'] }),
  validateRequest(updateBrandSchema), 
  brandController.updateBrand
);

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
router.delete(
  '/:id',
  authenticate, 
  isAuthorized({ hasRole: ['admin'] }), 
  brandController.deleteBrand
);

export default router;
