import express from "express";
import { createFood, deleteFood, getFood, getFoods, updateFood } from "../controllers/food.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:restaurantid", verifyAdmin, createFood);

//UPDATE
router.put("/:id", verifyAdmin, updateFood);
//DELETE
router.delete("/:id/:restaurantid", verifyAdmin, deleteFood);
//GET

router.get("/:id", getFood);
//GET ALL

router.get("/", getFoods);

export default router;
