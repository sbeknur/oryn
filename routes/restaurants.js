import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Restaurants"
 *     description: "Operations related to restaurants"
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     description: Add a new restaurant to the database.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
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
 *               city:
 *                 type: string
 *                 required: true
 *               address:
 *                 type: string
 *                 required: true
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               desc:
 *                 type: string
 *                 required: true
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *               places:
 *                 type: array
 *               map:
 *                 type: array
 *                 items:
 *                   type: string
 *               menu:
 *                 type: array
 *     responses:
 *       201:
 *         description: Restaurant created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/", verifyAdmin, createRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Update a restaurant
 *     description: Update restaurant details by restaurant ID.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to update.
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
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               desc:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *               places:
 *                 type: array
 *               map:
 *                 type: array
 *                 items:
 *                   type: string
 *               menu:
 *                 type: array
 *     responses:
 *       200:
 *         description: Restaurant updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Restaurant not found.
 */
router.put("/:id", verifyAdmin, updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     description: Delete restaurant by restaurant ID.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Restaurant not found.
 */
router.delete("/:id", verifyAdmin, deleteRestaurant);

/**
 * @swagger
 * /api/restaurants/find/{id}:
 *   get:
 *     summary: Get a restaurant
 *     description: Retrieve restaurant details by restaurant ID.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Restaurant not found.
 */
router.get("/find/:id", getRestaurant);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieve a list of all restaurants.
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Restaurants retrieved successfully.
 *       400:
 *         description: Bad request.
 */
router.get("/", getRestaurants);

export default router;
