import User from "../models/User.js";
import Order from "../models/Order.js"

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        const ordersPromises = user.orders.map((orderId) => Order.findById(orderId));
        const orders = await Promise.all(ordersPromises);
        user.orders = orders;
        
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        const userPromises = users.map(async (user) => {
            const ordersPromises = user.orders.map((orderId) => Order.findById(orderId));
            const orders = await Promise.all(ordersPromises);
            user.orders = orders;
            return user;
        });

        const detailedUsers = await Promise.all(userPromises);
        res.status(200).json(detailedUsers);

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
