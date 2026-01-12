import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import FeePayment from "../models/schoolFeeModel.js";

// CREATE ORDER
export const createFeeOrder = async (req, res) => {
  try {
    const { studentId, schoolId, feeType, amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `fee_${studentId}_${Date.now()}`,
    });

    const fee = await FeePayment.create({
      studentId,
      schoolId,
      feeType,
      amount,
      razorpayOrderId: order.id,
    });

    res.json({ order, feeId: fee._id });
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// VERIFY PAYMENT
export const verifyFeePayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      feeId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    await FeePayment.findByIdAndUpdate(feeId, {
      razorpayPaymentId: razorpay_payment_id,
      status: "PAID",
      paidAt: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};
