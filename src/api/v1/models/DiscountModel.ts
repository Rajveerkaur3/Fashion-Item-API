/** 
 * @openapi
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the discount
 *         percentage:
 *           type: string
 *           description: The discount percentage (e.g., "20%")
 *         description:
 *           type: string
 *           description: A brief description of the discount (e.g., "Winter Sale")
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the discount
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the discount
 */
export interface Discount {
  id: string;           // Discount ID
  percentage: string;   // Discount percentage (e.g., "20%")
  description: string;  // Description of the discount (e.g., "Winter Sale")
  startDate: string;    // Start date of the discount
  endDate: string;      // End date of the discount
}
