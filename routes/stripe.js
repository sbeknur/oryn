import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
    try {
        const payment = await stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
