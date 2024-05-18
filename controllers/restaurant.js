import Restaurant from "../models/Restaurant.js";
import Place from "../models/Place.js";

export const createRestaurant = async (req, res, next) => {
    const newRestaurant = new Restaurant(req.body);

    try {
        const savedRestaurant = await newRestaurant.save();
        res.status(200).json(savedRestaurant);
    } catch (err) {
        next(err);
    }
};

export const updateRestaurant = async (req, res, next) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRestaurant);
    } catch (err) {
        next(err);
    }
};

export const deleteRestaurant = async (req, res, next) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json("Restaurant has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.status(200).json(restaurant);
    } catch (err) {
        next(err);
    }
};

export const getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find(req.params.id);
        res.status(200).json(restaurants);
    } catch (err) {
        next(err);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Restaurant.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const restaurantCount = await Restaurant.countDocuments({ type: "restaurant" });
        const cafeCount = await Restaurant.countDocuments({ type: "cafe" });
        const fastfoodCount = await Restaurant.countDocuments({ type: "fastfood" });
        const cafeteriaCount = await Restaurant.countDocuments({ type: "cafeteria" });
        const pubCount = await Restaurant.countDocuments({ type: "pub" });

        res.status(200).json([
            { type: "restaurant", count: restaurantCount },
            { type: "cafe", count: cafeCount },
            { type: "fastfood", count: fastfoodCount },
            { type: "cafeteria", count: cafeteriaCount },
            { type: "pub", count: pubCount },
        ]);
    } catch (err) {
        next(err);
    }
};

export const getRestaurantPlaces = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        const list = await Promise.all(
            restaurant.places.map((place) => {
                return Place.findById(place);
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
