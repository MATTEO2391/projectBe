const express = require("express");
const payment = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

payment.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
  
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "USD",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

module.exports = payment