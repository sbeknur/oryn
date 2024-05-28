import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder, getOrdersByUser } from "../controllers/order.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:userid", createOrder);

//UPDATE
router.put("/:id", updateOrder);
//DELETE
router.delete("/:id/:userid", verifyAdmin, deleteOrder);
//GET

router.get("/:id", getOrder);
//GET ALL
router.get("/", getOrders);

router.get("/byuser/:userid", getOrdersByUser);

export default router;
