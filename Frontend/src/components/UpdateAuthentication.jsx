import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateAuthentication = () => {
  const [changeEmail, setChangeEmail] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!changeEmail && !changePassword) {
        setError("Please update at least one field.");
        return;
      }

      const response = await axios.put(
        `${backendURL}/schools/updateAuthentication`,
        { changeEmail, changePassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/principalDashboard/${response.data.school._id}`);
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4E8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#B0CE88]/50 p-6">
        <h2 className="text-xl font-semibold text-center text-[#043915] mb-6">
          Update Authentication
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4C763B] mb-1">
              Change Email
            </label>
            <input
              type="email"
              placeholder="Enter new email"
              value={changeEmail}
              onChange={(e) => {
                setChangeEmail(e.target.value);
                setError("");
              }}
              className="w-full border border-[#B0CE88]/60 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C763B] mb-1">
              Change Password
            </label>
            <input
              type="text"
              placeholder="Enter new password"
              value={changePassword}
              onChange={(e) => {
                setChangePassword(e.target.value);
                setError("");
              }}
              className="w-full border border-[#B0CE88]/60 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white bg-[#4C763B] hover:bg-[#043915] transition-all"
          >
            Update
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
