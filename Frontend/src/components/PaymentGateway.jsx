
export const PaymentGateway = () => {
  const handlePayment = async () => {
    const payload = {
      studentId: "STUDENT_ID",
      schoolId: "SCHOOL_ID",
      feeType: "Tuition Fee",
      amount: 3000,
    };

    const { data } = await createFeeOrder(payload);

    const options = {
      key: "rzp_test_xxxxx",
      amount: data.order.amount,
      currency: "INR",
      order_id: data.order.id,
      name: "School Fees",
      description: payload.feeType,
      handler: async (response) => {
        await verifyFeePayment({
          ...response,
          feeId: data.feeId,
        });
        alert("Fees Paid Successfully ✅");
      },
      theme: { color: "#4C763B" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handlePayment}
        className="bg-[#4C763B] text-white px-6 py-3 rounded-lg"
      >
        Pay School Fees
      </button>
    </div>
  );
};
