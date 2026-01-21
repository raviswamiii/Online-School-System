import React, { useState } from "react";
import axios from "axios";

export const PaymentGateway = () => {
  const [payerName, setPayerName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const checkoutHandle = async (amount) => {
    // if (!payerName || !amount) {
    //   alert("Please enter payer name and amount");
    //   return;
    // }

    const { data: keyData } = await axios.get(`${backendURL}/payments/getKey`);
    const { key } = keyData;

    const { data: feeData } = await axios.post(
      `${backendURL}/payments/processPayments`,
      {
        amount,
        payerName,
      },
    );

    const { fees } = feeData;
    console.log(fees);

    const options = {
      key,
      amount,
      currency: "INR",
      name: "Online School Sytem",
      description: "Test Transaction",
      order_id: fees.id,
      callback_url: "/payments/paymentVerification", 
      prefill: {
        name: "Ravi Swami",
        email: "ravi@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            School Fee Payment
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter details and pay securely
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Payer Name</label>
            <input
              type="text"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter payer name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => checkoutHandle(amount)}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-200 mt-6 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${amount || 0}`}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Powered by Razorpay • Secure Payments
        </p>
      </div>
    </div>
  );
};
