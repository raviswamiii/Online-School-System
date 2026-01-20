import { razorpayInstance } from "../server.js";

export const processPayments = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    const fees = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      fees,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message, 
      error: error,
    });
  }
};

export const getKey = async (req, res) => { 
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  })
}