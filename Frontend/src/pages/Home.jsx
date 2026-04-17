import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SchoolList } from "../components/SchoolList";
import { CollegeList } from "../components/CollegeList";
import { IndividualList } from "../components/IndividualList";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col bg-white text-[#043915]">
      {/* Header */}
      <div className="border-b border-[#B0CE88]/40 shadow-sm sticky top-0 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold tracking-wide text-[#4C763B]">
            EduConnect
          </h1>

          <div className="flex gap-3">
            <Link
              to="/schoolSignIn"
              className="px-4 py-1.5 text-sm font-semibold rounded-full border border-[#B0CE88] bg-white hover:bg-[#B0CE88]/40 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/schoolRegistration"
              className="px-4 py-1.5 text-sm font-semibold rounded-full bg-[#4C763B] text-white hover:bg-[#043915] transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="flex-1 overflow-hidden max-w-7xl mx-auto w-full px-4 py-4 ">
        <div className="bg-white shadow-sm border border-[#B0CE88]/40 p-5 h-full flex flex-col rounded-xl">
          <SchoolList />
        </div>
      </section>
    </div>
  );
};
