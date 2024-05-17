import express from "express";
import {
  createPlace,
  deletePlace,
  getPlace,
  getPlaces,
  updatePlace,
  updatePlaceAvailability,
} from "../controllers/place.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createPlace);

//UPDATE
router.put("/availability/:id", updatePlaceAvailability);
router.put("/:id", verifyAdmin, updatePlace);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deletePlace);
//GET

router.get("/:id", getPlace);
//GET ALL

router.get("/", getPlaces);

export default router;