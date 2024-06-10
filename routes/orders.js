import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder, getOrdersByUser, getOrdersByRestaurant } from "../controllers/order.js";
import { verifyAdmin, verifyUser, verifyToken, verifyRestaurant } from "../utils/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Orders"
 *     description: "Operations related to orders"
 */

/**
 * @swagger
 * /api/orders/{userid}:
 *   post:
 *     summary: Create a new order
 *     description: Add a new order for a user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user placing the order.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foods:
 *                 type: array
 *                 items:
 *                   type: string
 *               bill:
 *                 type: number
 *                 required: true
 *               restaurant:
 *                 type: string
 *                 required: true
 *               place:
 *                 type: number
 *               placeId:
 *                 type: string
 *               isPaid:
 *                 type: boolean
 *               date:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   duration:
 *                     type: number
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/:userid", createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order
 *     description: Update order details by order ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foods:
 *                 type: array
 *                 items:
 *                   type: string
 *               bill:
 *                 type: number
 *               restaurant:
 *                 type: string
 *               place:
 *                 type: number
 *               placeId:
 *                 type: string
 *               isPaid:
 *                 type: boolean
 *               date:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: string
 *                     format: date-time
 *                   duration:
 *                     type: number
 *     responses:
 *       200:
 *         description: Order updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/orders/{id}/{userid}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete order by order ID and user ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete.
 *         schema:
 *           type: string
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user who placed the order.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */
router.delete("/:id/:userid", verifyAdmin, deleteOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order
 *     description: Retrieve order details by order ID.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Order not found.
 */
router.get("/:id", getOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *       400:
 *         description: Bad request.
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/byuser/{userid}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Retrieve orders placed by a specific user.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user whose orders are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *       400:
 *         description: Bad request.
 */
router.get("/byuser/:userid", getOrdersByUser);

export default router;
