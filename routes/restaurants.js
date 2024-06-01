import express from "express";
import {
  countByCity,
  countByType,
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurantPlaces,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurant.js";
import Restaurant from "../models/Restaurant.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createRestaurant);

//UPDATE
router.put("/:id", verifyAdmin, updateRestaurant);
//DELETE
router.delete("/:id", verifyAdmin, deleteRestaurant);
//GET

router.get("/find/:id", getRestaurant);
//GET ALL

router.get("/", getRestaurants);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;