import mongoose from "mongoose";
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
    },
    decs: {
        type: String,
    }
});

export default mongoose.model("Food", FoodSchema);
