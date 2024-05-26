import mongoose from "mongoose";
const PlaceSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
