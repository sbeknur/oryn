import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import restaurantsRoute from "./routes/restaurants.js";
import placesRoute from "./routes/places.js";
import foodsRoute from "./routes/foods.js";
import ordersRoute from "./routes/orders.js";
import stripeRoute from "./routes/stripe.js"
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/places", placesRoute);
app.use("/api/foods", foodsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/payment", stripeRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});
