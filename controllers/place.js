import Place from "../models/Place.js";
import Restaurant from "../models/Restaurant.js";
import { createError } from "../utils/error.js";

export const createPlace = async (req, res, next) => {
    const restaurantId = req.params.restaurantid;
    const newPlace = new Place(req.body);

    try {
        const savedPlace = await newPlace.save();
        try {
            await Restaurant.findByIdAndUpdate(restaurantId, {
                $push: { places: savedPlace._id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedPlace);
    } catch (err) {
        next(err);
    }
};

export const updatePlace = async (req, res, next) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPlace);
    } catch (err) {
        next(err);
    }
};
export const updatePlaceAvailability = async (req, res, next) => {
    try {
        await Place.updateOne(
            { "placeNumbers._id": req.params.id },
            {
                $push: {
                    "placeNumbers.$.unavailableDates": req.body.dates,
                },
            }
        );
        res.status(200).json("Place status has been updated.");
    } catch (err) {
        next(err);
    }
};
export const deletePlace = async (req, res, next) => {
    const restaurantId = req.params.restaurantid;
    try {
        await Place.findByIdAndDelete(req.params.id);
        try {
            await Restaurant.findByIdAndUpdate(restaurantId, {
                $pull: { places: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Place has been deleted.");
    } catch (err) {
        next(err);
    }
};
export const getPlace = async (req, res, next) => {
    try {
        const place = await Place.findById(req.params.id);
        res.status(200).json(place);
    } catch (err) {
        next(err);
    }
};
export const getPlaces = async (req, res, next) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (err) {
        next(err);
    }
};
