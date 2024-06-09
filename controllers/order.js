import Order from "../models/Order.js";
import User from "../models/User.js";
import Place from "../models/Place.js";
import { createError } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
    const userId = req.params.userid;
    const placeId = req.body.placeId;

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        try {
            await User.findByIdAndUpdate(userId, {
                $push: { orders: savedOrder._id },
            });

            const start = savedOrder.date.start;
            const duration = savedOrder.date.duration;

            for (let i = 0; i < duration; i++) {
                const dateToPush = new Date(start);
                dateToPush.setHours(start.getHours() + i);
                await Place.findByIdAndUpdate(placeId, {
                    $push: { unavailableDates: dateToPush },
                });
            }
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

export const getOrdersByRestaurant = async (req, res, next) => {
    const userId = req.params.userid;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        if (user.role !== "restaurant") {
            return next(createError(403, "You are not authorized to access this resource"));
        }

        const restaurant = await Restaurant.findById(user.restaurantId);

        if (!restaurant) {
            return next(createError(404, "Restaurant not found"));
        }
        const orders = await Order.find({ restaurant: restaurant.name });

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};

export const getChartData = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        let orders = [];

        if (user.role === "restaurant") {
            const restaurant = await Restaurant.findById(user.restaurantId);
            if (!restaurant) {
                return next(createError(404, "Restaurant not found"));
            }
            orders = await Order.find({ restaurant: restaurant.name });
        } else if (user.role === "admin") {
            orders = await Order.find();
        } else {
            return next(createError(403, "You are not authorized to view this data"));
        }

        const monthlyTotals = orders.reduce((acc, order) => {
            const date = new Date(order.date.start);
            const month = date.toLocaleString('default', { month: 'long' });

            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += order.bill;

            return acc;
        }, {});

        const chartData = Object.keys(monthlyTotals).map(month => ({
            name: month,
            Total: monthlyTotals[month]
        }));

        res.status(200).json(chartData);
    } catch (err) {
        next(err);
    }
};