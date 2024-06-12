import express from "express";
import { createFood, deleteFood, getFood, getFoods, updateFood, getFoodsByRestaurant } from "../controllers/food.js";
import { verifyAdmin, verifyRestaurant } from "../utils/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Foods"
 *     description: "Operations related to foods"
 */

/**
 * @swagger
 * /api/foods/{restaurantid}:
 *   post:
 *     summary: Create a new food item
 *     description: Add a new food item to a restaurant's menu.
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant to add the food item to.
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
 *                 required: true
 *               type:
 *                 type: string
 *                 required: true
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *                 required: true
 *               desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: Food item created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/:restaurantid", verifyAdmin, createFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food item
 *     description: Update food item details by food item ID.
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to update.
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
 *               type:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *               desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Food item updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Food item not found.
 */
router.put("/:id", verifyAdmin, updateFood);

/**
 * @swagger
 * /api/foods/{id}/{restaurantid}:
 *   delete:
 *     summary: Delete a food item
 *     description: Delete food item by food item ID and restaurant ID.
 *     tags: [Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to delete.
 *         schema:
 *           type: string
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant the food item belongs to.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Food item not found.
 */
router.delete("/:id/:restaurantid", verifyAdmin, verifyRestaurant, deleteFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get a food item
 *     description: Retrieve food item details by food item ID.
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Food item not found.
 */
router.get("/:id", getFood);

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Get all food items
 *     description: Retrieve a list of all food items.
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Food items retrieved successfully.
 *       400:
 *         description: Bad request.
 */
router.get("/", getFoods);

/**
 * @swagger
 * /api/foods/byrestaurant/{restaurantid}:
 *   get:
 *     summary: Get foods by restaurant
 *     description: Retrieve a list of foods for a specific restaurant by restaurant ID.
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant to retrieve foods for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Foods retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Restaurant not found.
 */
router.get("/:byrestaurant/:restaurantid", getFoodsByRestaurant);

export default router;
