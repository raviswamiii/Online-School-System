import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SchoolSignIn = () => {
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolPassword, setSchoolPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!schoolEmail || !schoolPassword) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendURL}/schools/schoolSignIn`, {
        schoolEmail,
        schoolPassword,
      });

      if (response.data?.success) {
        localStorage.setItem("token", response.data.token);
        navigate(`/principalDashboard/${response.data.school._id}`);
      } else {
        setError(response.data?.message || "Login failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center space-y-4 shadow-md p-6 bg-white rounded-xl"
      >
        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Enter School Email..."
          value={schoolEmail}
          onChange={(e) => {
            setSchoolEmail(e.target.value);
            setError("");
          }}
        />

        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Enter School Password..."
          value={schoolPassword}
          onChange={(e) => {
            setSchoolPassword(e.target.value);
            setError("");
          }}
        />

        <button
          className="py-2 px-4 w-64 bg-blue-500 hover:bg-blue-600 rounded text-white disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};
