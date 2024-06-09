import express from "express";
import { getChartData,getFeaturedData  } from "../controllers/stats.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Stats"
 *     description: "Operations related to statistics"
 */

/**
 * @swagger
 * /api/stats/chart:
 *   get:
 *     summary: Get chart data
 *     description: Retrieve chart data based on user role.
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chart data retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get("/chart", verifyToken, getChartData);

/**
 * @swagger
 * /api/stats/featured:
 *   get:
 *     summary: Get featured data
 *     description: Retrieve featured data including total revenue, last week's revenue, and last month's revenue.
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Featured data retrieved successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get("/featured", verifyToken, getFeaturedData);

export default router;
