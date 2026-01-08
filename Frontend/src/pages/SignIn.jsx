import React from "react";
import { Link } from "react-router-dom";
import { MdSchool } from "react-icons/md";
import { FaUniversity, FaUser } from "react-icons/fa";

export const SignIn = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#ECF4E8] to-[#dfead7] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-[#B0CE88]/40 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#043915]">
            Sign In
          </h1>
          <p className="text-sm text-[#4C763B]/70 mt-2">
            Choose how you want to continue
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/schoolSignIn"
            className="group flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] hover:shadow-md transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-[#ECF4E8] flex items-center justify-center group-hover:bg-white transition">
              <MdSchool className="text-2xl text-[#4C763B]" />
            </div>
            <div>
              <p className="font-semibold text-[#043915]">School</p>
              <p className="text-sm text-[#4C763B]/70">
                Sign in as a school administrator
              </p>
            </div>
          </Link>

          <Link
            to="/collegeSignIn"
            className="group flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] hover:shadow-md transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-[#ECF4E8] flex items-center justify-center group-hover:bg-white transition">
              <FaUniversity className="text-2xl text-[#4C763B]" />
            </div>
            <div>
              <p className="font-semibold text-[#043915]">College</p>
              <p className="text-sm text-[#4C763B]/70">
                Access your college dashboard
              </p>
            </div>
          </Link>

          <Link
            to="/soloSignIn"
            className="group flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] hover:shadow-md transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-[#ECF4E8] flex items-center justify-center group-hover:bg-white transition">
              <FaUser className="text-2xl text-[#4C763B]" />
            </div>
            <div>
              <p className="font-semibold text-[#043915]">Individual</p>
              <p className="text-sm text-[#4C763B]/70">
                Sign in as an individual user
              </p>
            </div>
          </Link>
        </div>

        <div className="text-center text-sm text-[#4C763B]/70 mt-10">
          Don’t have an account?{" "}
          <Link
            to="/registerYourself"
            className="font-semibold text-[#4C763B] hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
