/** 
 * @openapi
 * components:
 *   schemas:
 *     FashionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a fashion item
 *         item_name:
 *           type: string
 *           description: The name of the fashion item
 *         brand:
 *           type: string
 *           description: The brand of the item
 *         category:
 *           type: string
 *           description: The category the item belongs to (e.g., tops, bottoms)
 *         size:
 *           type: string
 *           description: The size of the item (e.g., S, M, L)
 *         price:
 *           type: string
 *           description: The price of the item
 *         color:
 *           type: string
 *           description: The color of the item
 */
export interface FashionItem {
    id: string;
    item_name: string;
    brand: string;
    category: string;
    size: string;
    price: string;
    color: string;
}
