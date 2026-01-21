import { razorpayInstance } from "../server.js";
import crypto from "crypto";

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
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/paymentSuccess?reference=${razorpay_payment_id}`,
    );
  } else {
    res.status(404).json({
      success: false,
    });
  }
};
