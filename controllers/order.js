import Order from "../models/Order.js";
import User from "../models/User.js";
import Place from "../models/Place.js";
import { createError } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
    const userId = req.params.userid;
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        try {
            await User.findByIdAndUpdate(userId, {
                $push: { orders: savedOrder._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

export const deleteOrder = async (req, res, next) => {
    const userId = req.params.userid;
    try {
        await Order.findByIdAndDelete(req.params.id);
        try {
            await User.findByIdAndUpdate(userId, {
                $pull: { orders: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Order has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

export const getOrdersByUser = async (req, res, next) => {
    const userId = req.params.userid;

    try {
        const user = await User.findById(userId);

        const ordersPromises = user.orders.map((orderId) => Order.findById(orderId));
        const detailedOrders = await Promise.all(ordersPromises);

        res.status(200).json(detailedOrders);
    } catch (err) {
        next(err);
    }
};
