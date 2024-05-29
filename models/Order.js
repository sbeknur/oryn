import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    foods: {
        type: [],
    },
    bill: {
        type: Number,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    place: {
        type: Number,
    },
    isPaid: {
        type: String,
        required: true,
        default: false,
    },
    date: {
        start: {
            type: Date,
        },
        duration: {
            type: Number,
        },
    },
});

export default mongoose.model("Order", OrderSchema);