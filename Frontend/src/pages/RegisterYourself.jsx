import React from "react";
import { Link } from "react-router-dom";
import { MdSchool } from "react-icons/md";
import { FaUniversity, FaUser } from "react-icons/fa";

export const RegisterYourself = () => {
  return (
    <div className="min-h-screen bg-[#ECF4E8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-[#B0CE88]/50 p-8">
        <h1 className="text-2xl font-semibold text-center text-[#043915] mb-2">
          Create an Account
        </h1>
        <p className="text-center text-sm text-[#4C763B]/70 mb-8">
          Choose how you want to register
        </p>

        <div className="space-y-4">
          <Link
            to="/schoolRegistration"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] transition-all"
          >
            <MdSchool className="text-2xl text-[#4C763B]" />
            <div>
              <p className="font-semibold text-[#043915]">School</p>
              <p className="text-sm text-[#4C763B]/70">
                Register your school profile
              </p>
            </div>
          </Link>

          <Link
            to="/collegeRegistration"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] transition-all"
          >
            <FaUniversity className="text-2xl text-[#4C763B]" />
            <div>
              <p className="font-semibold text-[#043915]">College</p>
              <p className="text-sm text-[#4C763B]/70">
                Create a college account
              </p>
            </div>
          </Link>

          <Link
            to="/soloRegistration"
            className="flex items-center gap-4 p-4 rounded-xl border border-[#B0CE88]/50 hover:bg-[#ECF4E8] transition-all"
          >
            <FaUser className="text-2xl text-[#4C763B]" />
            <div>
              <p className="font-semibold text-[#043915]">Individual</p>
              <p className="text-sm text-[#4C763B]/70">
                Register as an individual user
              </p>
            </div>
          </Link>
        </div>

        <div className="text-center text-sm text-[#4C763B]/70 mt-8">
          Already have an account?{" "}
          <Link
            to="/signIn"
            className="font-semibold text-[#4C763B] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
