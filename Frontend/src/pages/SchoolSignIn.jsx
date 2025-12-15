import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdSchool } from "react-icons/md";

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
      const response = await axios.post(
        `${backendURL}/schools/schoolSignIn`,
        { schoolEmail, schoolPassword }
      );

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
    <div className="min-h-screen bg-[#ECF4E8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-[#B0CE88]/50 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#4C763B]/10 flex items-center justify-center mb-3">
            <MdSchool className="text-2xl text-[#4C763B]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#043915]">
            School Sign In
          </h1>
          <p className="text-sm text-[#4C763B]/70">
            Access your school dashboard
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="School Email"
              value={schoolEmail}
              onChange={(e) => {
                setSchoolEmail(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={schoolPassword}
              onChange={(e) => {
                setSchoolPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#4C763B] text-white font-semibold hover:bg-[#043915] transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-[#4C763B]/70 mt-6">
          Don’t have a school account?{" "}
          <Link
            to="/schoolRegistration"
            className="font-semibold text-[#4C763B] hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
