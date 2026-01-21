import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);
  const reference = queryParams.get("reference");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">

        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✅</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully and a confirmation has been recorded.
        </p>

        <div className="border-t my-4" />

        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
        >
          Go to Dashboard
        </button>

        <p className="text-xs text-gray-400 mt-4">
          If you have any issues, please contact support.
        </p>

        {reference && (
          <p className="text-sm text-gray-500 mt-3">
            Reference ID:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {reference}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
