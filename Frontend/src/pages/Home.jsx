import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SchoolList } from "../components/SchoolList";
import { CollegeList } from "../components/CollegeList";
import { IndividualList } from "../components/IndividualList";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#ECF4E8] text-[#043915]">
      <header className="bg-white border-b border-[#B0CE88]/40 shadow-sm sticky top-0 z-20">
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
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-6 pb-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#043915]">
            Explore Schools
          </h2>
          <p className="text-sm text-[#4C763B]/70">
            Find and manage schools in one place
          </p>
        </div>

        <section className="mt-6 bg-white rounded-xl shadow-sm border border-[#B0CE88]/40 p-5 min-h-[65vh]">
          <SchoolList />
        </section>
      </main>
    </div>
  );
};
