import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, async () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, async () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyRestaurant = (req, res, next) => {
    verifyToken(req, res, next, async () => {
        const user = await User.findById(req.user.id);
        if (user.role === "restaurant" && user.restaurantId.toString() === req.params.id) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
