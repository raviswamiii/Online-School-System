import React from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterYourself } from "./pages/RegisterYourself";
import { SchoolRegistration } from "./pages/SchoolRegistration";
import { CollegeRegistration } from "./pages/CollegeRegistration";
import { SoloRegistration } from "./pages/SoloRegistration";
import { SchoolDashboard } from "./pages/SchoolDashboard";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registerYourself" element={<RegisterYourself />} />
        <Route path="/schoolRegistration" element={<SchoolRegistration />} />
        <Route path="/collegeRegistration" element={<CollegeRegistration />} />
        <Route path="/SoloRegistration" element={<SoloRegistration />} />
        <Route path="/schoolDashboard" element={<SchoolDashboard />} />
      </Routes>
    </div>
  );
};
