/** 
 * @openapi
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the brand
 *         name:
 *           type: string
 *           description: The name of the brand
 *         country:
 *           type: string
 *           description: The country of origin of the brand
 *         establishedYear:
 *           type: string
 *           description: The year the brand was established
 *         description:
 *           type: string
 *           description: A brief description of the brand
 */
export interface Brand {
  id: string;            // Brand ID
  name: string;          // Brand name
  country: string;       // Country of origin
  establishedYear: string;  // Year the brand was established
  description: string;   // A brief description of the brand
}
