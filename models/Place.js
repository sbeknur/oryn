import mongoose from "mongoose";
const PlaceSchema = new mongoose.Schema(
    {
        title: {
            type: String,  
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        unavailableDates: {
            type: [Date],
        },
        position: {
            type: [],
        },
        panorama: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
