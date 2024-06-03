import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        photos: {
            type: [String],
        },
        desc: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        places: {
            type: [],
        },
        map: {
            type: [String],
        },
        menu: {
            type: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Restaurant", RestaurantSchema);
