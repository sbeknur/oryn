import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        img: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isRestaurant: {
            type: Boolean,
            default: false,
        },
        orders: {
            type: [String],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
