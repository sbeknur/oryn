import express from "express";
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace } from "../controllers/place.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:restaurantid", verifyAdmin, createPlace);

//UPDATE
router.put("/:id", verifyAdmin, updatePlace);
//DELETE
router.delete("/:id/:restaurantid", verifyAdmin, deletePlace);
//GET

router.get("/:id", getPlace);
//GET ALL

router.get("/", getPlaces);

export default router;
