import Order from "../models/Order.js";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import { createError } from "../utils/error.js";

export const getChartData = async (req, res, next) => {
    const userId = req.user.id;
    const restaurantId = req.query.restaurantId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        let orders = [];

        if (user.role === "restaurant" || restaurantId) {
            const restaurant = await Restaurant.findById(user.restaurantId || restaurantId);
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
            if (order.date && order.date.start) {
                const date = new Date(order.date.start);
                const month = date.toLocaleString('en-US', { month: 'long' });

                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += order.bill;
            } else {
                console.warn("Missing date.start for order:", order);
            }
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
export const getFeaturedData = async (req, res, next) => {
    const calculateTotalRevenue = async (filter) => {
        const result = await Order.aggregate([
            { $match: filter },
            { $group: { _id: null, total: { $sum: "$bill" } } }
        ]);
        return result[0] ? result[0].total : 0;
    };

    const calculateMonthlyAverageRevenue = async (filter) => {
        const result = await Order.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { month: { $month: "$date.start" }, year: { $year: "$date.start" } },
                    total: { $sum: "$bill" }
                }
            },
            {
                $group: {
                    _id: null,
                    average: { $avg: "$total" }
                }
            }
        ]);
        return result[0] ? result[0].average : 0;
    };

    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        let filter = {};

        if (user.role === "restaurant") {
            const restaurant = await Restaurant.findById(user.restaurantId);
            if (!restaurant) {
                return next(createError(404, "Restaurant not found"));
            }
            filter.restaurant = restaurant.name;
        }

        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);

        const totalRevenue = await calculateTotalRevenue(filter);
        const lastWeekRevenue = await calculateTotalRevenue({ ...filter, date: { $gte: lastWeek } });
        const lastMonthRevenue = await calculateTotalRevenue({ ...filter, date: { $gte: lastMonth } });
        const monthlyAverageRevenue = await calculateMonthlyAverageRevenue(filter);

        res.status(200).json({
            total: totalRevenue,
            lastWeek: lastWeekRevenue,
            lastMonth: lastMonthRevenue,
            monthlyAverage: monthlyAverageRevenue,
        });
    } catch (err) {
        next(err);
    }
};