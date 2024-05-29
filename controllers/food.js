import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import { createError } from "../utils/error.js";

export const createFood = async (req, res, next) => {
    const restaurantId = req.params.restaurantid;
    const newFood = new Food(req.body);

    try {
        const savedFood = await newFood.save();
        try {
            await Restaurant.findByIdAndUpdate(restaurantId, {
                $push: { menu: savedFood },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedFood);
    } catch (err) {
        next(err);
    }
};

export const updateFood = async (req, res, next) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedFood);
    } catch (err) {
        next(err);
    }
};

export const deleteFood = async (req, res, next) => {
    const restaurantId = req.params.restaurantid;
    try {
        await Food.findByIdAndDelete(req.params.id);
        try {
            await Restaurant.findByIdAndUpdate(restaurantId, {
                $pull: { menu: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Food has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getFood = async (req, res, next) => {
    try {
        const food = await Food.findById(req.params.id);
        res.status(200).json(food);
    } catch (err) {
        next(err);
    }
};

export const getFoods = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (err) {
        next(err);
    }
};
