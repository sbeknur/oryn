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
        type: String,
    },
    isPaid: {
        type: String,
        required: true,
        default: false,
    },
});

export default mongoose.model("Order", OrderSchema);
