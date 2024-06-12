import express from "express";
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace, getPlacesByRestaurant } from "../controllers/place.js";
import { verifyAdmin, verifyRestaurant } from "../utils/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Places"
 *     description: "Operations related to places"
 */

/**
 * @swagger
 * /api/places/{restaurantid}:
 *   post:
 *     summary: Create a new place
 *     description: Add a new place to a restaurant.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant to add the place to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *                 required: true
 *               maxPeople:
 *                 type: number
 *                 required: true
 *               desc:
 *                 type: string
 *                 required: true
 *               unavailableDates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *               position:
 *                 type: array
 *     responses:
 *       201:
 *         description: Place created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/:restaurantid", verifyAdmin, createPlace);

/**
 * @swagger
 * /api/places/{id}:
 *   put:
 *     summary: Update a place
 *     description: Update place details by place ID.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the place to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: number
 *               maxPeople:
 *                 type: number
 *               desc:
 *                 type: string
 *               unavailableDates:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date
 *               position:
 *                 type: array
 *     responses:
 *       200:
 *         description: Place updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Place not found.
 */
router.put("/:id", verifyAdmin, updatePlace);

/**
 * @swagger
 * /api/places/{id}/{restaurantid}:
 *   delete:
 *     summary: Delete a place
 *     description: Delete place by place ID and restaurant ID.
 *     tags: [Places]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the place to delete.
 *         schema:
 *           type: string
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant the place belongs to.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Place deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Place not found.
 */
router.delete("/:id/:restaurantid", verifyAdmin, verifyRestaurant, deletePlace);

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     summary: Get a place
 *     description: Retrieve place details by place ID.
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the place to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Place retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Place not found.
 */
router.get("/:id", getPlace);

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Get all places
 *     description: Retrieve a list of all places.
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: Places retrieved successfully.
 *       400:
 *         description: Bad request.
 */
router.get("/", getPlaces);

/**
 * @swagger
 * /api/places/byrestaurant/{restaurantid}:
 *   get:
 *     summary: Get places by restaurant
 *     description: Retrieve a list of places for a specific restaurant by restaurant ID.
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: restaurantid
 *         required: true
 *         description: ID of the restaurant to retrieve places for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Places retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Restaurant not found.
 */
router.get("/:byrestaurant/:restaurantid", getPlacesByRestaurant);

export default router;
